"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./clinic.module.css";

export function ClinicBookingProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default function ClinicBookingCTA({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Link
      href="/business-clinic/book"
      className={`${styles.primaryButton} ${className}`}
      onPointerMove={(event) => {
        if (
          event.pointerType !== "mouse" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--magnet-x",
          (event.clientX - rect.left - rect.width / 2) * 0.04 + "px",
        );
        event.currentTarget.style.setProperty(
          "--magnet-y",
          (event.clientY - rect.top - rect.height / 2) * 0.08 + "px",
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--magnet-x", "0px");
        event.currentTarget.style.setProperty("--magnet-y", "0px");
      }}
    >
      Book a Session <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}