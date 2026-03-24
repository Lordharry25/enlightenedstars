'use client';

import { useEffect, useRef } from 'react';

const STAR_EMOJIS = ['⭐', '✨', '🌟'];

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  emoji: string;
}

export default function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const scrollRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate stars
    const ww = window.innerWidth * 3;
    const wh = window.innerHeight;
    starsRef.current = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * ww,
      y: Math.random() * wh,
      size: Math.random() * 14 + 10,
      speed: Math.random() * 0.3 + 0.1, // parallax speed factor
      opacity: Math.random() * 0.5 + 0.3,
      emoji: STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)],
    }));

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Fade-in animation
    let fadeOpacity = 0;

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (fadeOpacity < 1) fadeOpacity += 0.02;

      ctx.globalAlpha = fadeOpacity;

      for (const star of starsRef.current) {
        const xOffset = -scrollRef.current * star.speed;
        const drawX = ((star.x + xOffset) % (window.innerWidth * 3) + window.innerWidth * 3) % (window.innerWidth * 3) - window.innerWidth;
        
        if (drawX < -50 || drawX > canvas.width + 50) continue;
        
        ctx.globalAlpha = star.opacity * fadeOpacity;
        ctx.font = `${star.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(star.emoji, drawX, star.y);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
