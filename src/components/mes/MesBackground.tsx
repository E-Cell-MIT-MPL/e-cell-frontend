"use client";

import { useEffect, useRef, useState } from "react";
import { MES_MUSIC_EVENT, type MesMusicDetail } from "./mesSignals";
import styles from "./mes.module.css";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
}
interface Pulse {
  a: Star;
  b: Star;
  t: number;
}
interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  apex: number;
  trail: { x: number; y: number }[];
}
interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const LINK_DIST = 130;
const CURVE_DRAW_MS = 7000;
const CURVE_HOLD_MS = 2500;
const CURVE_FADE_MS = 1500;

/** A "hockey stick" growth curve: flat-ish, then up and to the right. */
function makeCurve(points = 60): number[] {
  const out: number[] = [];
  let wobble = 0;
  for (let i = 0; i < points; i++) {
    const x = i / (points - 1);
    wobble += (Math.random() - 0.5) * 0.04;
    wobble *= 0.85;
    out.push(Math.min(1, x ** 3.2 + wobble + 0.04));
  }
  return out;
}

/**
 * Page background for /mes, with a startup feel:
 * - a constellation of drifting points (people, ideas) that link up when close,
 *   with data pulses running along the links (network effects);
 * - "launches": streaks that rise from the bottom and burst like a product launch;
 * - a hockey-stick growth curve that draws itself across the lower screen;
 * - soft drifting light, a slow sweep, a cursor-lit dot grid and film grain.
 * When the easter-egg party track plays, everything speeds up and pulses on the beat.
 */
export default function MesBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const partyRef = useRef(false);
  const [party, setParty] = useState(false);

  useEffect(() => {
    const onMusic = (e: Event) => {
      const { playing, track } = (e as CustomEvent<MesMusicDetail>).detail;
      const on = playing && track === "party";
      partyRef.current = on;
      setParty(on);
    };
    window.addEventListener(MES_MUSIC_EVENT, onMusic);
    return () => window.removeEventListener(MES_MUSIC_EVENT, onMusic);
  }, []);

  useEffect(() => {
    const root = ref.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const mouse = { x: -9999, y: -9999 };
    let stars: Star[] = [];
    let pulses: Pulse[] = [];
    let rockets: Rocket[] = [];
    let sparks: Spark[] = [];
    let curve = makeCurve();
    let curveStart = performance.now() + 1500;
    let nextLaunch = performance.now() + 1800;
    let nextPulse = 0;
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, (w * h) / 11000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.05 - Math.random() * 0.2,
        r: 0.6 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      }));
      pulses = [];
    };

    const launch = () => {
      const x = w * (0.1 + Math.random() * 0.8);
      rockets.push({
        x,
        y: h + 10,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(6 + Math.random() * 3),
        apex: h * (0.12 + Math.random() * 0.35),
        trail: [],
      });
    };

    const burst = (x: number, y: number) => {
      const n = 22 + Math.floor(Math.random() * 10);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.2;
        const v = 1 + Math.random() * 2.2;
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          life: 1,
        });
      }
    };

    const drawCurve = (now: number) => {
      const elapsed = now - curveStart;
      if (elapsed < 0) return;
      const total = CURVE_DRAW_MS + CURVE_HOLD_MS + CURVE_FADE_MS;
      if (elapsed > total) {
        curve = makeCurve();
        curveStart = now + 2500;
        return;
      }
      const progress = Math.min(1, elapsed / CURVE_DRAW_MS);
      const fade =
        elapsed > CURVE_DRAW_MS + CURVE_HOLD_MS
          ? 1 - (elapsed - CURVE_DRAW_MS - CURVE_HOLD_MS) / CURVE_FADE_MS
          : 1;
      const left = w * 0.06;
      const right = w * 0.94;
      const base = h * 0.92;
      const top = h * 0.5;
      const pts = Math.max(2, Math.floor(progress * curve.length));

      // Baseline axis.
      ctx.strokeStyle = `rgba(255,255,255,${0.05 * fade})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(left, base);
      ctx.lineTo(right, base);
      ctx.stroke();

      const px = (i: number) =>
        left + ((right - left) * i) / (curve.length - 1);
      const py = (i: number) => base - (base - top) * curve[i];

      // Soft fill under the curve.
      const grad = ctx.createLinearGradient(0, top, 0, base);
      grad.addColorStop(0, `rgba(255,255,255,${0.06 * fade})`);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(px(0), base);
      for (let i = 0; i < pts; i++) ctx.lineTo(px(i), py(i));
      ctx.lineTo(px(pts - 1), base);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = `rgba(255,255,255,${0.22 * fade})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 0; i < pts; i++) {
        if (i === 0) ctx.moveTo(px(i), py(i));
        else ctx.lineTo(px(i), py(i));
      }
      ctx.stroke();

      // Leading dot and a growth readout.
      const tx = px(pts - 1);
      const ty = py(pts - 1);
      ctx.fillStyle = `rgba(255,255,255,${0.8 * fade})`;
      ctx.beginPath();
      ctx.arc(tx, ty, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.25 * fade})`;
      ctx.beginPath();
      ctx.arc(tx, ty, 6 + 3 * Math.sin(now / 200), 0, Math.PI * 2);
      ctx.stroke();
      const pct = Math.round(curve[pts - 1] * 1000);
      ctx.font = "500 11px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = `rgba(255,255,255,${0.4 * fade})`;
      ctx.fillText(`+${pct}%`, Math.min(tx + 10, right - 40), ty - 10);
    };

    const draw = (now: number) => {
      const speed = partyRef.current ? 3 : 1;
      ctx.clearRect(0, 0, w, h);

      drawCurve(now);

      // Move the constellation.
      for (const s of stars) {
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 140 * 140) {
          const d = Math.sqrt(d2 + 1);
          const f = (1 - d / 140) * 0.6;
          s.x += (dx / d) * f;
          s.y += (dy / d) * f;
        }
        s.x += s.vx * speed;
        s.y += s.vy * speed;
        if (s.y < -10) s.y = h + 10;
        if (s.x < -10) s.x = w + 10;
        if (s.x > w + 10) s.x = -10;
      }

      // Links, and occasionally a data pulse along one of them.
      const linked: [Star, Star][] = [];
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DIST) {
            linked.push([a, b]);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK_DIST) * 0.09})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      if (now > nextPulse && linked.length && pulses.length < 12) {
        const [a, b] = linked[Math.floor(Math.random() * linked.length)];
        pulses.push({ a, b, t: 0 });
        nextPulse = now + (partyRef.current ? 90 : 280);
      }
      pulses = pulses.filter((p) => {
        p.t += 0.018 * speed;
        if (p.t >= 1) return false;
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.fillStyle = `rgba(255,255,255,${0.9 * Math.sin(p.t * Math.PI)})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      for (const s of stars) {
        const twinkle = 0.45 + 0.35 * Math.sin(now / 900 + s.phase);
        ctx.fillStyle = `rgba(255,255,255,${twinkle})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Launches.
      if (now > nextLaunch) {
        launch();
        nextLaunch =
          now + (partyRef.current ? 500 : 2800 + Math.random() * 3200);
      }
      rockets = rockets.filter((r) => {
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 18) r.trail.shift();
        r.x += r.vx;
        r.y += r.vy;
        r.vy *= 0.985;
        for (let i = 1; i < r.trail.length; i++) {
          const p0 = r.trail[i - 1];
          const p1 = r.trail[i];
          ctx.strokeStyle = `rgba(255,255,255,${(i / r.trail.length) * 0.5})`;
          ctx.lineWidth = (i / r.trail.length) * 2;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.beginPath();
        ctx.arc(r.x, r.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        if (r.y <= r.apex || r.vy > -1.2) {
          burst(r.x, r.y);
          return false;
        }
        return true;
      });
      sparks = sparks.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.97;
        s.vy = s.vy * 0.97 + 0.03;
        s.life -= 0.012;
        if (s.life <= 0) return false;
        ctx.fillStyle = `rgba(255,255,255,${s.life * 0.7})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.1, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduced) {
      // Static constellation only.
      for (const s of stars) {
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.bg} ${party ? styles.party : ""}`}
      aria-hidden="true"
    >
      <div className={styles.sweep} />
      <div className={styles.orbs}>
        <div className={`${styles.orb} ${styles.orbA}`} />
        <div className={`${styles.orb} ${styles.orbB}`} />
        <div className={`${styles.orb} ${styles.orbC}`} />
      </div>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.gridLit} />
      <div className={styles.grain} />
    </div>
  );
}
