"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  colors?: string[];
  autoAnimate?: boolean; // mobile auto-sweep
}

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 70, 50, 35, 20];
  const keys = ["", "-70", "-50", "-35", "-20"];
  const vars: Record<string, string> = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}
function easeInCubic(x: number) {
  return x * x * x;
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (x: number) => number;
  onUpdate: (v: number) => void;
  onEnd?: () => void;
}) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

function runSweep(card: HTMLDivElement, onDone?: () => void) {
  const angleStart = 90;
  const angleEnd = 450;
  card.classList.add("bg-sweep-active");
  card.style.setProperty("--cursor-angle", `${angleStart}deg`);

  animateValue({ duration: 500, onUpdate: (v) => card.style.setProperty("--edge-proximity", String(v)) });
  animateValue({
    ease: easeInCubic,
    duration: 1500,
    end: 50,
    onUpdate: (v) => {
      card.style.setProperty(
        "--cursor-angle",
        `${((angleEnd - angleStart) * (v / 100) + angleStart).toFixed(2)}deg`
      );
    },
  });
  animateValue({
    ease: easeOutCubic,
    delay: 1500,
    duration: 2000,
    start: 50,
    end: 100,
    onUpdate: (v) => {
      card.style.setProperty(
        "--cursor-angle",
        `${((angleEnd - angleStart) * (v / 100) + angleStart).toFixed(2)}deg`
      );
    },
  });
  animateValue({
    ease: easeInCubic,
    delay: 2500,
    duration: 1200,
    start: 100,
    end: 0,
    onUpdate: (v) => card.style.setProperty("--edge-proximity", String(v)),
    onEnd: () => {
      card.classList.remove("bg-sweep-active");
      if (onDone) onDone();
    },
  });
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "38 92 255",
  borderRadius = 8,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 28,
  colors = ["#ffffff", "#d4d4d4", "#a3a3a3"],
  autoAnimate = false,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const animIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getCenterOfElement = useCallback((el: HTMLDivElement) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback(
    (el: HTMLDivElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      let kx = Infinity;
      let ky = Infinity;
      if (dx !== 0) kx = cx / Math.abs(dx);
      if (dy !== 0) ky = cy / Math.abs(dy);
      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenterOfElement]
  );

  const getCursorAngle = useCallback(
    (el: HTMLDivElement, x: number, y: number) => {
      const [cx, cy] = getCenterOfElement(el);
      const dx = x - cx;
      const dy = y - cy;
      if (dx === 0 && dy === 0) return 0;
      const radians = Math.atan2(dy, dx);
      let degrees = radians * (180 / Math.PI) + 90;
      if (degrees < 0) degrees += 360;
      return degrees;
    },
    [getCenterOfElement]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);
      card.style.setProperty("--edge-proximity", (edge * 100).toFixed(3));
      card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
    },
    [getEdgeProximity, getCursorAngle]
  );

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--edge-proximity", "0");
  }, []);

  // Auto-animate on mobile / when autoAnimate=true
  useEffect(() => {
    if (!autoAnimate || !cardRef.current) return;
    const card = cardRef.current;

    const startLoop = () => {
      runSweep(card, () => {
        // Run again after 4s pause
        animIntervalRef.current = setTimeout(startLoop, 4000) as unknown as ReturnType<typeof setInterval>;
      });
    };

    // Delay initial start so stagger looks nice
    const initDelay = setTimeout(startLoop, 800);
    return () => {
      clearTimeout(initDelay);
      if (animIntervalRef.current) clearTimeout(animIntervalRef.current as unknown as ReturnType<typeof setTimeout>);
    };
  }, [autoAnimate]);

  const glowVars = buildGlowVars(glowColor, glowIntensity);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`bg-glow-card ${className}`}
      style={
        {
          "--edge-sensitivity": edgeSensitivity,
          "--border-radius": `${borderRadius}px`,
          "--glow-padding": `${glowRadius}px`,
          "--cone-spread": coneSpread,
          ...glowVars,
        } as React.CSSProperties
      }
    >
      <span className="bg-edge-light" aria-hidden="true" />
      <div className="bg-glow-inner">{children}</div>
    </div>
  );
}
