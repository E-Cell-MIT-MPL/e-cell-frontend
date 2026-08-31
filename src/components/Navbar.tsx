"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Initiatives", href: "/initiatives" },
  { label: "Blogs", href: "/blog" },
  { label: "The Team", href: "/team" },
  { label: "MES", href: "/mes" },
] as const;

export default function Navbar({
  className: _className,
}: React.ComponentProps<"nav">) {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      <style>{`
        .glass-pill {
          background: rgba(10, 10, 10, 0.75);
          backdrop-filter: blur(24px) saturate(190%);
          -webkit-backdrop-filter: blur(24px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.85),
                      0 0 0 1px rgba(255, 255, 255, 0.05),
                      inset 0 1px 1px 0 rgba(255, 255, 255, 0.22);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass-pill-scrolled {
          background: rgba(8, 8, 8, 0.92);
          border-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.95),
                      0 0 0 1px rgba(255, 255, 255, 0.08),
                      inset 0 1px 1px 0 rgba(255, 255, 255, 0.3);
        }
        .nav-glow-btn {
          background: #ffffff;
          color: #000000;
          box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.28);
          transition: all 0.25s ease;
        }
        .nav-glow-btn:hover {
          background: #f3f3f3;
          box-shadow: 0 0 32px 8px rgba(255, 255, 255, 0.45);
          transform: translateY(-1px);
        }
        .nav-glow-btn:active {
          transform: translateY(0);
        }
      `}</style>

      {/* Spacer to push page content down nicely */}
      <div className="h-20 sm:h-24" />

      {/* ── Fixed Floating Glass Island ── */}
      <div className="fixed top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <header
          className={`pointer-events-auto w-full max-w-5xl rounded-full px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between glass-pill ${scrolled ? "glass-pill-scrolled" : ""
            }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group flex-shrink-0 pl-1 sm:pl-2"
            aria-label="E-Cell MIT Manipal"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center shadow-inner group-hover:bg-white/[0.16] group-hover:border-white/40 group-hover:scale-105 transition-all duration-300">
              <Image
                src="/transparent-logo.webp"
                alt="E-Cell"
                width={20}
                height={20}
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain brightness-0 invert opacity-95 group-hover:opacity-100 transition-opacity"
                priority
              />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-white text-[12px] font-bold tracking-[0.14em] uppercase">
                E-Cell
              </span>
              <span className="text-white/40 text-[9px] font-medium tracking-[0.1em] uppercase">
                MIT Manipal
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 ${isActive
                      ? "text-white bg-white/[0.14] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)]"
                      : "text-white/60 hover:text-white hover:bg-white/[0.08]"
                    }`}
                >
                  {isActive && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] mr-1.5 align-middle" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0 pr-1">
            <Link
              href="/about"
              className="px-3.5 py-1.5 rounded-full text-[12px] font-medium text-white/55 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
            >
              About Us
            </Link>
            <Link
              href="/initiatives"
              className="nav-glow-btn px-4 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1 group"
            >
              <span>Initiatives</span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                →
              </span>
            </Link>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-full hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors duration-200 flex flex-col items-center justify-center gap-1.5 mr-1"
            aria-label="Open menu"
          >
            <span className="block w-4 h-[1.5px] bg-current rounded-full" />
            <span className="block w-4 h-[1.5px] bg-current rounded-full" />
          </button>
        </header>
      </div>

      {/* ── Mobile Glass Drawer ── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/80 backdrop-blur-md lg:hidden transition-opacity duration-300 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[80vw] max-w-[320px] bg-[#0c0c0c] border-l border-white/[0.12] lg:hidden flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center">
              <Image
                src="/transparent-logo.webp"
                alt="E-Cell"
                width={18}
                height={18}
                className="w-4 h-4 object-contain brightness-0 invert"
              />
            </div>
            <span className="text-white font-bold text-sm tracking-wider uppercase">
              E-Cell MIT
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
            aria-label="Close menu"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 1l10 10M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${isActive
                        ? "bg-white/[0.12] text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                        : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                      }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-white/25 text-lg leading-none">›</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer Bottom CTA */}
        <div className="p-6 border-t border-white/[0.08]">
          <Link
            href="/initiatives"
            onClick={() => setSidebarOpen(false)}
            className="nav-glow-btn flex items-center justify-center py-3.5 rounded-full text-sm font-semibold w-full"
          >
            Explore Initiatives →
          </Link>
        </div>
      </div>
    </>
  );
}

