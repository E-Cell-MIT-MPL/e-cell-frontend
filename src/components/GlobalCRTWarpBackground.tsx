"use client";

import CRTWarp from "@/components/CRTWarp";

export default function GlobalCRTWarpBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-full h-full"
      aria-hidden="true"
    >
      <CRTWarp
        color="#575656"
        backgroundColor="#121212"
        speed={0.5}
        curvature={0.25}
        scanlineStrength={0.25}
        scanlineFrequency={200}
        waveAmplitude={0.3}
        waveFrequency={2.5}
        bloom={1.5}
        bloomRadius={1}
        noise={0.1}
        vignette={0}
        brightness={1.25}
        pixelation={1}
        rgbShift={0.015}
        mouseReact
        mouseStrength={0.5}
        dpr={1}
        fps={30}
        paused={false}
      />
    </div>
  );
}
