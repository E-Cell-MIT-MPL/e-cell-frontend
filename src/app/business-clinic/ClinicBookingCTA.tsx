"use client";

import {
  createContext,
  useContext,
  useId,
  useRef,
  type ReactNode,
} from "react";
import { ArrowUpRight, X } from "lucide-react";
import styles from "./clinic.module.css";

const BookingContext = createContext<(() => void) | null>(null);

export function ClinicBookingProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  return (
    <BookingContext.Provider value={() => dialog.current?.showModal()}>
      {children}
      <dialog
        ref={dialog}
        className={styles.bookingDialog}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className={styles.dialogContent}>
          <button
            type="button"
            className={styles.dialogClose}
            aria-label="Close booking notice"
            onClick={() => dialog.current?.close()}
          >
            <X size={20} />
          </button>
          <span className={styles.eyebrow}>A CONVERSATION WORTH HAVING</span>
          <h2 id={titleId}>
            Your next chapter.
            <br />
            Coming soon.
          </h2>
          <p>
            Online booking isn&apos;t available yet. This is a placeholder
            action while the Business Clinic session details are being
            confirmed.
          </p>
          <p>No booking has been made and no information has been collected.</p>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => dialog.current?.close()}
          >
            Keep exploring <ArrowUpRight size={17} />
          </button>
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}

export default function ClinicBookingCTA({
  className = "",
}: {
  className?: string;
}) {
  const open = useContext(BookingContext);
  return (
    <button
      type="button"
      onClick={() => open?.()}
      className={styles.primaryButton + " " + className}
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
    </button>
  );
}
