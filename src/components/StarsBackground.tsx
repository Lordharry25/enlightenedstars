'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function StarsBackground() {
  const { scrollY } = useScroll();
  
  // Create parallax effect: scrolling down (positive Y) means stars move left (negative X)
  const x1 = useTransform(scrollY, [0, 3000], [0, -400]);
  const x2 = useTransform(scrollY, [0, 3000], [0, -800]);
  const x3 = useTransform(scrollY, [0, 3000], [0, -1200]);

  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; layer: number; opacity: number; emoji: string }[]>([]);

  useEffect(() => {
    // Generate stars only on the client to avoid hydration mismatches
    const ww = window.innerWidth;
    // Make the universe wider than the window so stars can scroll into view
    const totalW = ww * 3;
    const totalH = window.innerHeight; // The wrapper is fixed, so we only need viewport height
    
    // Assortment of star emojis
    const emojis = ['⭐', '✨', '🌟'];

    const newStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * totalW, 
      y: Math.random() * totalH,
      size: Math.random() * 10 + 10, // 10px to 20px font size
      layer: Math.floor(Math.random() * 3) + 1,
      opacity: Math.random() * 0.6 + 0.3,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));
    setStars(newStars);
  }, []);

  if (stars.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* Parallax Layers */}
      <motion.div style={{ x: x1 }} className="absolute inset-0 w-[400vw] h-[100vh]">
        {stars.filter(s => s.layer === 1).map(star => (
          <div key={star.id} className="absolute drop-shadow-sm" style={{ left: star.x, top: star.y, fontSize: star.size, opacity: star.opacity }}>{star.emoji}</div>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className="absolute inset-0 w-[400vw] h-[100vh]">
        {stars.filter(s => s.layer === 2).map(star => (
          <div key={star.id} className="absolute drop-shadow-md" style={{ left: star.x, top: star.y, fontSize: star.size * 1.5, opacity: star.opacity }}>{star.emoji}</div>
        ))}
      </motion.div>
      <motion.div style={{ x: x3 }} className="absolute inset-0 w-[400vw] h-[100vh]">
        {stars.filter(s => s.layer === 3).map(star => (
          <div key={star.id} className="absolute drop-shadow-xl" style={{ left: star.x, top: star.y, fontSize: star.size * 2, opacity: star.opacity }}>{star.emoji}</div>
        ))}
      </motion.div>
    </motion.div>
  );
}
