"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MesSynth, type MesTrack } from "./mesSynth";
import {
  MES_EGG_EVENT,
  MES_MUSIC_EVENT,
  type MesMusicDetail,
} from "./mesSignals";
import styles from "./mes.module.css";

const MUTE_KEY = "mes-music-off";

function readMuted() {
  try {
    return window.localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}
function writeMuted(muted: boolean) {
  try {
    if (muted) window.localStorage.setItem(MUTE_KEY, "1");
    else window.localStorage.removeItem(MUTE_KEY);
  } catch {
    // storage unavailable: preference just isn't remembered
  }
}

/**
 * Background music for the MES page plus the on/off switch on the right edge.
 * Browsers only allow sound after the visitor interacts, so the soft ambient
 * track starts on their first tap, click or key press (unless they've turned
 * music off before). Unlocking the easter egg switches to the party track.
 */
export default function MesSoundtrack() {
  const synth = useRef<MesSynth | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState<MesTrack>("ambient");

  const announce = (detail: MesMusicDetail) =>
    window.dispatchEvent(new CustomEvent(MES_MUSIC_EVENT, { detail }));

  const play = useCallback((next: MesTrack) => {
    synth.current ??= new MesSynth();
    synth.current.play(next);
    setPlaying(true);
    setTrack(next);
    announce({ playing: true, track: next });
  }, []);

  const stop = useCallback(() => {
    synth.current?.stop();
    setPlaying(false);
    announce({ playing: false, track: synth.current?.track ?? "ambient" });
  }, []);

  // Start the ambient track on the first interaction with the page.
  useEffect(() => {
    if (readMuted()) return;
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    const start = (e: Event) => {
      // Let a first tap on the switch itself be handled by the switch.
      if (buttonRef.current?.contains(e.target as Node)) return;
      cleanup();
      if (!synth.current?.playing) play("ambient");
    };
    const cleanup = () =>
      events.forEach((ev) => window.removeEventListener(ev, start));
    events.forEach((ev) =>
      window.addEventListener(ev, start, { passive: true }),
    );
    return cleanup;
  }, [play]);

  // Easter egg: switch to the party track.
  useEffect(() => {
    const onEgg = () => play("party");
    window.addEventListener(MES_EGG_EVENT, onEgg);
    return () => window.removeEventListener(MES_EGG_EVENT, onEgg);
  }, [play]);

  useEffect(() => () => synth.current?.dispose(), []);

  const toggle = () => {
    if (playing) {
      stop();
      writeMuted(true);
    } else {
      play(track);
      writeMuted(false);
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Turn music off" : "Turn music on"}
      title={playing ? "Turn music off" : "Turn music on"}
      className="fixed right-2 top-1/2 z-[65] flex -translate-y-1/2 flex-col items-center gap-2.5 rounded-full border border-white/15 bg-black/70 px-2 py-3 text-white backdrop-blur-md transition-colors hover:border-white/40 sm:right-4"
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
        {[0, 0.25, 0.5, 0.15].map((delay) => (
          <span
            key={delay}
            className={`w-[3px] rounded-full bg-white ${playing ? styles.eqBar : ""}`}
            style={{
              height: playing ? "100%" : "25%",
              animationDelay: `${delay}s`,
              animationDuration: track === "party" ? "0.45s" : "1.1s",
            }}
          />
        ))}
      </span>
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
        {playing ? "Music on" : "Music off"}
      </span>
    </motion.button>
  );
}
