"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "The Team", href: "/team" },
  { label: "Blogs", href: "/blog" },
  { label: "MES", href: "/mes" },
] as const;

export default function HomeNavbar() {
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
        .rb-nav-pill {
          background: rgba(14, 14, 14, 0.75);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.8),
                      inset 0 1px 1px 0 rgba(255, 255, 255, 0.15);
          transition: all 0.35s ease;
        }
        .rb-nav-pill-scrolled {
          background: rgba(10, 10, 10, 0.92);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 16px 40px -8px rgba(0, 0, 0, 0.95),
                      inset 0 1px 1px 0 rgba(255, 255, 255, 0.25);
        }
        .rb-btn {
          background: #ffffff;
          color: #0a0a0a;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .rb-btn:hover {
          background: #e8e8e8;
          transform: translateY(-1px);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.35);
        }
        .rb-btn:active {
          transform: translateY(0);
        }
      `}</style>

      {/* ── Fixed Floating Pill Header ── */}
      <div className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <header
          className={`pointer-events-auto w-full max-w-4xl rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between rb-nav-pill ${
            scrolled ? "rb-nav-pill-scrolled" : ""
          }`}
        >
          {/* Logo & Brand Name */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
            aria-label="E-Cell MIT Manipal"
          >
            <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center group-hover:bg-white/[0.16] transition-colors">
              <Image
                src="/transparent-logo.webp"
                alt="E-Cell"
                width={18}
                height={18}
                className="w-4 h-4 object-contain brightness-0 invert"
                priority
              />
            </div>
            <span className="text-white font-bold text-[14px] tracking-tight">
              E-Cell MIT
            </span>
          </Link>

          {/* Center / Right Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1 text-[13px] font-medium rounded-full transition-colors duration-150 ${
                    isActive
                      ? "text-white bg-white/[0.14]"
                      : "text-white/65 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center flex-shrink-0">
            <Link
              href="/initiatives"
              className="rb-btn px-4 py-1.5 rounded-full text-[13px]"
            >
              Initiatives →
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 rounded-full hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors flex flex-col items-center justify-center gap-1"
            aria-label="Open menu"
          >
            <span className="block w-4 h-[1.5px] bg-current rounded-full" />
            <span className="block w-4 h-[1.5px] bg-current rounded-full" />
          </button>
        </header>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed inset-0 z-[60] bg-black/80 backdrop-blur-md md:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[75vw] max-w-[290px] bg-[#0f0f0f] border-l border-white/[0.12] md:hidden flex flex-col transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between px-6 h-18 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <Image
              src="/transparent-logo.webp"
              alt="E-Cell"
              width={20}
              height={20}
              className="w-5 h-5 object-contain brightness-0 invert"
            />
            <span className="text-white font-bold text-sm tracking-tight">
              E-Cell MIT
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 1l10 10M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-white/[0.14] text-white"
                        : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-white/20 text-lg">›</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-white/[0.08]">
          <Link
            href="/initiatives"
            onClick={() => setSidebarOpen(false)}
            className="rb-btn flex items-center justify-center py-3 rounded-full text-sm font-semibold w-full"
          >
            Initiatives →
          </Link>
        </div>
      </div>
    </>
  );
}


