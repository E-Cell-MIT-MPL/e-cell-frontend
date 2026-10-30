"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./idea-network.module.css";

// Deterministic coordinates keep server and client markup identical.
const nodes = Array.from({ length: 42 }, (_, i) => {
  const angle = i * 2.399963;
  const radius = Math.sqrt((i + 0.5) / 42);
  return {
    x: 280 + Math.cos(angle) * radius * 168,
    y: 225 + Math.sin(angle) * radius * 148,
    depth: (i % 5) / 4,
    r: i % 9 === 0 ? 4.2 : 0.9 + (i % 4) * 0.45,
  };
});
const edges = nodes.flatMap((n, i) =>
  nodes
    .map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) }))
    .filter(({ j }) => j !== i)
    .sort((a, b) => a.d - b.d)
    .slice(0, 5)
    .filter(({ j }) => j > i)
    .map(({ j }) => [i, j] as const),
);
const faces = Array.from({ length: 10 }, (_, i) => {
  const a = i * 4;
  const near = edges
    .filter(([x, y]) => x === a || y === a)
    .map(([x, y]) => (x === a ? y : x));
  return [a, near[0] ?? a + 1, near[1] ?? a + 2];
});
const labels = [
  { text: "IDEAS", x: 148, y: 62, node: 13, end: 188, anchor: "end" },
  { text: "PEOPLE", x: 435, y: 85, node: 9, end: 415, anchor: "start" },
  { text: "PERSPECTIVES", x: 116, y: 228, node: 18, end: 138, anchor: "end" },
  { text: "GUIDANCE", x: 440, y: 332, node: 27, end: 420, anchor: "start" },
  { text: "OPPORTUNITIES", x: 195, y: 421, node: 36, end: 218, anchor: "end" },
] as const;

export default function ClinicIdeaNetwork() {
  const root = useRef<HTMLDivElement>(null);
  const title = useId();
  const gradient = useId();
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const dots = element.querySelectorAll<SVGGElement>("[data-network-node]");
    const lines = element.querySelectorAll<SVGLineElement>(
      "[data-network-edge]",
    );
    const triangles = element.querySelectorAll<SVGPolygonElement>(
      "[data-network-face]",
    );
    const connectors = element.querySelectorAll<SVGPolylineElement>(
      "[data-network-label]",
    );
    const sparks = element.querySelectorAll<SVGCircleElement>(
      "[data-network-spark]",
    );
    const labelGroup = element.querySelector<SVGGElement>(
      "[data-network-labels]",
    );
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0,
      visible = false,
      elapsed = 0,
      previous = 0;
    const target = { x: 0, y: 0 },
      cursor = { x: 0, y: 0 };
    const draw = (time: number, still = false) => {
      const reveal = still ? 1 : Math.min(1, time / 1.9);
      cursor.x += (target.x - cursor.x) * 0.065;
      cursor.y += (target.y - cursor.y) * 0.065;
      const positions = nodes.map((node, i) => {
        const distance = Math.hypot(
          node.x - (280 + cursor.x * 190),
          node.y - (225 + cursor.y * 160),
        );
        const influence = Math.max(0, 1 - distance / 240);
        const x =
          node.x +
          (still
            ? 0
            : Math.sin(time * 0.23 + i * 1.3) * (2 + node.depth * 3) +
              cursor.x * influence * 12);
        const y =
          node.y +
          (still
            ? 0
            : Math.cos(time * 0.19 + i) * (2 + node.depth * 3) +
              cursor.y * influence * 10);
        dots[i].setAttribute("transform", `translate(${x} ${y})`);
        const entrance = still
          ? 1
          : Math.max(0, Math.min(1, (reveal - i * 0.009) * 3));
        dots[i].style.opacity = String(
          entrance *
            (0.48 +
              node.depth * 0.4 +
              (still ? 0 : Math.sin(time * 0.8 + i) * 0.08)),
        );
        return { x, y };
      });
      edges.forEach(([a, b], i) => {
        const start = positions[a],
          end = positions[b];
        const line = lines[i];
        line.setAttribute("x1", String(start.x));
        line.setAttribute("y1", String(start.y));
        line.setAttribute("x2", String(end.x));
        line.setAttribute("y2", String(end.y));
        line.style.strokeDashoffset = String(
          1 - Math.max(0, Math.min(1, (reveal - 0.15 - i * 0.003) * 2)),
        );
      });
      faces.forEach((face, i) => {
        triangles[i].setAttribute(
          "points",
          face.map((j) => `${positions[j].x},${positions[j].y}`).join(" "),
        );
        triangles[i].style.opacity = String(reveal * 0.035);
      });
      labels.forEach((label, i) =>
        connectors[i].setAttribute(
          "points",
          `${label.x + (label.anchor === "end" ? 8 : -8)},${label.y - 3} ${label.end},${label.y - 3} ${positions[label.node].x},${positions[label.node].y}`,
        ),
      );
      if (labelGroup)
        labelGroup.style.opacity = String(
          still ? 1 : Math.max(0, (reveal - 0.75) * 4),
        );
      sparks.forEach((spark, i) => {
        const phase = (time * 0.1 + i * 0.34) % 1;
        const [a, b] = edges[i * 13];
        spark.setAttribute(
          "cx",
          String(positions[a].x + (positions[b].x - positions[a].x) * phase),
        );
        spark.setAttribute(
          "cy",
          String(positions[a].y + (positions[b].y - positions[a].y) * phase),
        );
        spark.style.opacity = still
          ? "0"
          : String(Math.sin(phase * Math.PI) * 0.55 * reveal);
      });
    };
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (previous && now - previous < 32) return;
      elapsed += previous ? (now - previous) / 1000 : 0;
      previous = now;
      draw(elapsed);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (reduced.matches) draw(0, true);
      else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reduced.matches) return;
      const rect = element.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const leave = () => {
      target.x = 0;
      target.y = 0;
    };
    draw(0, reduced.matches);
    observer.observe(element);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <div ref={root} className={styles.network}>
      <svg viewBox="0 0 560 470" role="img" aria-labelledby={title}>
        <title id={title}>
          An interconnected idea network linking ideas, people, perspectives,
          guidance, and opportunities.
        </title>
        <defs>
          <radialGradient id={gradient}>
            <stop stopColor="#fff" stopOpacity=".24" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g aria-hidden="true">
          {faces.map((face, i) => (
            <polygon
              key={i}
              data-network-face
              points={face.map((j) => `${nodes[j].x},${nodes[j].y}`).join(" ")}
              fill="#fff"
              opacity=".035"
            />
          ))}
          {edges.map(([a, b], i) => (
            <line
              key={i}
              data-network-edge
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="#ddd"
              strokeOpacity={i % 5 === 0 ? 0.4 : 0.16}
              strokeWidth=".65"
              pathLength="1"
              strokeDasharray="1"
            />
          ))}
          {nodes.map((node, i) => (
            <g
              key={i}
              data-network-node
              transform={`translate(${node.x} ${node.y})`}
            >
              {node.r > 4 && <circle r="24" fill={`url(#${gradient})`} />}
              <circle r={node.r} fill="#f6f6f6" />
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              data-network-spark
              r="1.6"
              fill="white"
              opacity="0"
            />
          ))}
        </g>
        <g data-network-labels className={styles.labels}>
          {labels.map((label) => (
            <g key={label.text}>
              <polyline
                data-network-label
                points={`${label.end},${label.y - 3} ${nodes[label.node].x},${nodes[label.node].y}`}
                fill="none"
                stroke="#aaa"
                strokeWidth=".55"
                strokeOpacity=".5"
              />
              <text x={label.x} y={label.y} textAnchor={label.anchor}>
                {label.text}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
