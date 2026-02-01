"use client";
import { useState, useEffect } from "react";

export default function ParticleBackground() {
  const [particles, setParticles] = useState
    { left: number; top: number; delay: number; duration: number }[]
  >([]);
  const [largeParticles, setLargeParticles] = useState
    { left: number; top: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
      }))
    );

    setLargeParticles(
      [...Array(5)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 3,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Floating Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      {/* Larger floating elements */}
      {largeParticles.map((p, i) => (
        <div
          key={`large-${i}`}
          className="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-pulse"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}