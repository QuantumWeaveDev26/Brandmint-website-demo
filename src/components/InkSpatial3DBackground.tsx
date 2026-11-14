import React, { useEffect, useRef } from 'react';

/**
 * Real-Time 60fps 3D Astronomical Depth Starfield (Zero distracting wireframe lines)
 * Uses the exact 7-shade "Чернила" (Ink Nocturne) palette:
 * #0A0224, #0E0433, #120642, #160952, #312185, #7265C2, #CCC7F2
 */
export const InkSpatial3DBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Subtle 3D Depth Particles (no straight or circular lines)
    const stars = Array.from({ length: 44 }, (_, i) => ({
      x: ((Math.sin(i * 12.9898) * 43758.5453) % 1) * 2 - 1,
      y: ((Math.cos(i * 78.233) * 29432.123) % 1) * 2 - 1,
      z: (i / 44) * 1.8 + 0.25,
      r: i % 3 === 0 ? 1.8 : 1.15,
    }));

    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;
    let scrollOffset = window.scrollY || 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };

    const onScroll = () => {
      scrollOffset = window.scrollY || 0;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const render = (time: number) => {
      if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);

        curMouseX += (targetMouseX - curMouseX) * 0.06;
        curMouseY += (targetMouseY - curMouseY) * 0.06;

        const t = time * 0.00024;
        const cx = width * 0.5 + curMouseX * 22;
        const cy = height * 0.45 + curMouseY * 16;

        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          const zCycle = (((s.z - (t * 0.38 + scrollOffset * 0.00032)) % 2) + 2) % 2;
          const depth = zCycle + 0.35;
          const sx = cx + (s.x * width * 0.62) / depth;
          const sy = cy + (s.y * height * 0.62) / depth;
          if (sx < 0 || sx > width || sy < 0 || sy > height) continue;

          const alpha = Math.max(0.06, Math.min(0.55, (2.1 - depth) * 0.3));
          ctx.fillStyle =
            i % 2 === 0
              ? `rgba(204, 199, 242, ${alpha})`
              : `rgba(114, 101, 194, ${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, s.r / Math.max(0.75, depth * 0.7), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-75"
    />
  );
};
