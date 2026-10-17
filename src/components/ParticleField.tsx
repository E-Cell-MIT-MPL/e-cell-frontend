"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;

    const mouse = { x: -1000, y: -1000 };
    const particles: Particle[] = [];

    function resizeCanvas() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles.length = 0;

      const count = Math.min(
        110,
        Math.floor((width * height) / 11000)
      );

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    }

    function handleMouseMove(event: MouseEvent) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }

    function handleMouseLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    function animate() {
      ctx!.clearRect(0, 0, width, height);

      const rect = canvas!.getBoundingClientRect();
      const mouseX = mouse.x - rect.left;
      const mouseY = mouse.y - rect.top;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        
        if (distance < 120 && distance > 0) {
          const force = ((120 - distance) / 120) * 0.7;

          p.vx += (dx / distance) * force * 0.025;
          p.vy += (dy / distance) * force * 0.025;
        }

        
        const minSpeed = 0.12;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

        if (speed < minSpeed) {
          const angle = Math.random() * Math.PI * 2;
          p.vx = Math.cos(angle) * minSpeed;
          p.vy = Math.sin(angle) * minSpeed;
        }

        p.vx *= 0.999;
        p.vy *= 0.999;

        const maxSpeed = 0.6;
        p.vx = Math.max(-maxSpeed, Math.min(maxSpeed, p.vx));
        p.vy = Math.max(-maxSpeed, Math.min(maxSpeed, p.vy));

        p.x += p.vx;
        p.y += p.vy;

        
        if (p.x < 0) {
          p.x = 0;
          p.vx = Math.abs(p.vx);
        } else if (p.x > width) {
          p.x = width;
          p.vx = -Math.abs(p.vx);
        }

        if (p.y < 0) {
          p.y = 0;
          p.vy = Math.abs(p.vy);
        } else if (p.y > height) {
          p.y = height;
          p.vy = -Math.abs(p.vy);
        }

        if (distance < 180) {
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mouseX, mouseY);

          ctx!.strokeStyle = `rgba(255,255,255,${
            (1 - distance / 180) * 0.35
          })`;

          ctx!.lineWidth = 1;
          ctx!.stroke();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];

          const ox = p.x - other.x;
          const oy = p.y - other.y;
          const gap = Math.sqrt(ox * ox + oy * oy);

          if (gap < 100) {
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(other.x, other.y);

            ctx!.strokeStyle = `rgba(255,255,255,${
              (1 - gap / 100) * 0.12
            })`;

            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }

        
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(255,255,255,0.75)";
        ctx!.fill();
      }

      animationFrame = requestAnimationFrame(animate);
    }

    resizeCanvas();

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resizeCanvas);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}