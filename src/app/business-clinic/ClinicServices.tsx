"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MousePointerClick, ArrowUpRight } from "lucide-react";
import { services } from "./clinicData";
import styles from "./services.module.css";

// Coordinates share the SVG's 840 × 700 space. Labels stay still while the
// orbit traces move, so both pointer and keyboard targets remain predictable.
const nodes = [
  { x: 183, y: 342, label: ["IDEA", "VALIDATION"], direction: "left" },
  { x: 628, y: 152, label: ["BUSINESS", "STRATEGY"], direction: "above" },
  { x: 701, y: 288, label: ["MENTORSHIP"], direction: "right" },
  { x: 541, y: 459, label: ["FUNDRAISING", "GUIDANCE"], direction: "below" },
  { x: 212, y: 548, label: ["NETWORK", "& GROWTH"], direction: "below" },
];

export default function ClinicServices() {
  const [active, setActive] = useState(0);
  const [emphasis, setEmphasis] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const illustration = useRef<HTMLDivElement>(null);
  const selected = services[active];
  const litNode = nodes[emphasis ?? active];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    if (illustration.current) observer.observe(illustration.current);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

  const sphereStyle = {
    "--sphere-x": (litNode.x - 420) * 0.018 + "px",
    "--sphere-y": (litNode.y - 350) * 0.018 + "px",
    "--light-x": 25 + (litNode.x / 840) * 40 + "%",
    "--light-y": 8 + (litNode.y / 700) * 25 + "%",
  } as CSSProperties;

  return (
    <section
      className={styles.services}
      id="services"
      aria-labelledby="services-title"
    >
      <header className={styles.intro} data-reveal>
        <p className={styles.eyebrow}>
          <span /> 02 / HOW WE HELP
        </p>
        <h2 id="services-title" className={styles.heading}>
          Clarity for
          <br />
          <span>what&apos;s next.</span>
        </h2>
        <p className={styles.description}>
          From your first idea to your next big decision, the right perspective
          changes what&apos;s possible.
        </p>
      </header>

      <div className={styles.orbitalArea}>
        <p className={styles.instruction}>
          <MousePointerClick size={24} strokeWidth={1.5} aria-hidden="true" />
          <span>
            SELECT A POINT.
            <br />
            EXPLORE A POSSIBILITY.
          </span>
        </p>
        <div
          ref={illustration}
          id="clinic-orbital-illustration"
          className={styles.illustration}
          style={sphereStyle}
          data-paused={reduced || !inView || !pageVisible}
          role="group"
          aria-label="Explore five ways Business Clinic can support your idea"
        >
          <svg
            className={styles.orbits}
            viewBox="0 0 840 700"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="clinic-orbit-stroke"
                x1="100"
                y1="550"
                x2="700"
                y2="120"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#e2daca" stopOpacity=".1" />
                <stop offset=".5" stopColor="#e2daca" stopOpacity=".7" />
                <stop offset="1" stopColor="#e2daca" stopOpacity=".25" />
              </linearGradient>
            </defs>
            <g className={styles.orbitDrift}>
              <ellipse
                cx="420"
                cy="350"
                rx="320"
                ry="155"
                transform="rotate(-28 420 350)"
              />
              <ellipse
                cx="420"
                cy="350"
                rx="365"
                ry="188"
                transform="rotate(-28 420 350)"
                className={styles.outerOrbit}
              />
            </g>
            <g className={styles.crossOrbit}>
              <ellipse
                cx="420"
                cy="350"
                rx="278"
                ry="155"
                transform="rotate(27 420 350)"
              />
            </g>
            <ellipse
              cx="420"
              cy="350"
              rx="320"
              ry="155"
              transform="rotate(-28 420 350)"
              className={styles.orbitCurrent}
              pathLength="1"
            />
          </svg>

          <svg
            className={styles.connection}
            viewBox="0 0 840 700"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={
                "M 420 350 Q " +
                (litNode.x + 420) / 2 +
                " " +
                (litNode.y - 50) +
                " " +
                litNode.x +
                " " +
                litNode.y
              }
            />
          </svg>

          <div className={styles.sphereShadow} aria-hidden="true" />
          <div className={styles.sphere} aria-hidden="true">
            <span />
          </div>
          <span className={styles.sphereLabel} aria-hidden="true">
            YOUR IDEA
          </span>

          {services.map((service, index) => (
            <button
              type="button"
              key={service.title}
              className={
                styles.node +
                (active === index ? " " + styles.nodeSelected : "")
              }
              style={{
                left: (nodes[index].x / 840) * 100 + "%",
                top: (nodes[index].y / 700) * 100 + "%",
              }}
              data-direction={nodes[index].direction}
              data-service-node={index}
              aria-label={service.title}
              aria-pressed={active === index}
              aria-controls="clinic-service-description"
              onClick={() => setActive(index)}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setEmphasis(index);
              }}
              onPointerLeave={() => setEmphasis(null)}
              onFocus={() => setEmphasis(index)}
              onBlur={() => setEmphasis(null)}
            >
              <span className={styles.nodeMarker} aria-hidden="true" />
              <span className={styles.nodeLabel} aria-hidden="true">
                {nodes[index].label.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </button>
          ))}
        </div>
        <div className={styles.orbitFooter}>
          <span>FIVE PERSPECTIVES. ONE WAY FORWARD.</span>
        </div>
      </div>

      <div
        className={styles.detail}
        id="clinic-service-description"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div key={active} className={styles.detailContent}>
          <div className={styles.serviceHeading}>
            <span className={styles.index}>0{active + 1}</span>
            <h3>{selected.title}</h3>
            <ArrowUpRight size={23} strokeWidth={1.1} aria-hidden="true" />
          </div>
          <p className={styles.serviceDescription}>{selected.description}</p>
          <p className={styles.serviceDetail}>{selected.detail}</p>
        </div>
      </div>
    </section>
  );
}
