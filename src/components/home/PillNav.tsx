"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export interface NavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: NavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const isExternal = (href: string) =>
  href.startsWith("http") ||
  href.startsWith("//") ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:") ||
  href.startsWith("#");

export default function PillNav({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.out",
  baseColor = "#0a0a0a",
  pillColor = "#ffffff",
  hoveredPillTextColor = "#ffffff",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}: PillNavProps) {
  const resolvedPillTextColor = pillTextColor ?? (baseColor === "#ffffff" ? "#000000" : "#000000");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = (w * w / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - w * w / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector(".pill-label");
        const white = pill.querySelector(".pill-label-hover");
        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }
        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready.then(layout).catch(() => {});

    const menu = mobileMenuRef.current;
    if (menu) gsap.set(menu, { visibility: "hidden", opacity: 0 });

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;
      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, { scale: 1, duration: 0.6, ease });
      }
      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, { width: "auto", duration: 0.6, ease });
      }
    }

    return () => window.removeEventListener("resize", layout);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  const handleLogoEnter = () => {
    if (!logoImgRef.current) return;
    logoTweenRef.current?.kill();
    gsap.set(logoImgRef.current, { rotate: 0 });
    logoTweenRef.current = gsap.to(logoImgRef.current, { rotate: 360, duration: 0.3, ease });
  };

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (next) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (next) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease });
      } else {
        gsap.to(menu, {
          opacity: 0, y: 10, duration: 0.2, ease,
          onComplete: () => { gsap.set(menu, { visibility: "hidden" }); },
        });
      }
    }

    onMobileMenuClick?.();
  };

  const cssVars = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": resolvedPillTextColor,
    "--nav-h": "42px",
    "--pill-pad-x": "16px",
    "--pill-gap": "3px",
  } as React.CSSProperties;

  const pillStyle: React.CSSProperties = {
    background: "var(--pill-bg)",
    color: "var(--pill-text)",
    paddingLeft: "var(--pill-pad-x)",
    paddingRight: "var(--pill-pad-x)",
  };

  const pillClasses =
    "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full font-semibold text-[13px] leading-[0] uppercase tracking-[0.08em] whitespace-nowrap cursor-pointer";

  return (
    <div className={`relative w-full flex items-center justify-between md:justify-start ${className}`} style={cssVars}>
      {/* Logo button */}
      <a
        href="/"
        aria-label="Home"
        onMouseEnter={handleLogoEnter}
        ref={logoRef}
        className="rounded-full p-1.5 inline-flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ width: "var(--nav-h)", height: "var(--nav-h)", background: "var(--base)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt={logoAlt}
          ref={logoImgRef}
          className="w-full h-full object-contain block"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </a>

      {/* Desktop nav pills */}
      <div
        ref={navItemsRef}
        className="relative items-center rounded-full hidden md:flex ml-2"
        style={{ height: "var(--nav-h)", background: "var(--base)" }}
      >
        <ul role="menubar" className="list-none flex items-stretch m-0 p-[3px] h-full" style={{ gap: "var(--pill-gap)" }}>
          {items.map((item, i) => {
            const isActive = activeHref === item.href;

            const PillContent = (
              <>
                <span
                  className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                  style={{ background: "var(--base)", willChange: "transform" }}
                  aria-hidden="true"
                  ref={(el) => { circleRefs.current[i] = el; }}
                />
                <span className="label-stack relative inline-block leading-[1] z-[2]">
                  <span className="pill-label relative z-[2] inline-block leading-[1]" style={{ willChange: "transform" }}>
                    {item.label}
                  </span>
                  <span
                    className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                    style={{ color: "var(--hover-text)", willChange: "transform, opacity" }}
                    aria-hidden="true"
                  >
                    {item.label}
                  </span>
                </span>
                {isActive && (
                  <span
                    className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-2.5 h-2.5 rounded-full z-[4]"
                    style={{ background: "var(--base)" }}
                    aria-hidden="true"
                  />
                )}
              </>
            );

            return (
              <li key={item.href} role="none" className="flex h-full">
                {isExternal(item.href) ? (
                  <a
                    role="menuitem"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pillClasses}
                    style={pillStyle}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    {PillContent}
                  </a>
                ) : (
                  <Link
                    role="menuitem"
                    href={item.href}
                    className={pillClasses}
                    style={pillStyle}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    {PillContent}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile hamburger */}
      <button
        ref={hamburgerRef}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
        className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0"
        style={{ width: "var(--nav-h)", height: "var(--nav-h)", background: "var(--base)" }}
      >
        <span className="hamburger-line w-4 h-[1.5px] rounded origin-center block" style={{ background: "var(--pill-bg)" }} />
        <span className="hamburger-line w-4 h-[1.5px] rounded origin-center block" style={{ background: "var(--pill-bg)" }} />
      </button>

      {/* Mobile dropdown */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[calc(var(--nav-h)+10px)] left-0 right-0 rounded-[22px] shadow-2xl z-[998] origin-top"
        style={{ background: "var(--base)", ...cssVars }}
      >
        <ul className="list-none m-0 p-[4px] flex flex-col gap-[3px]">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-3 px-5 text-[15px] font-medium rounded-[18px] transition-colors duration-200"
                style={{ color: "var(--pill-bg)", background: "transparent" }}
                onClick={() => setIsMobileMenuOpen(false)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = pillColor;
                  (e.currentTarget as HTMLElement).style.color = resolvedPillTextColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = pillColor;
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
