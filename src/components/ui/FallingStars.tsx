'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

export default function FallingStars() {
  const [stars, setStars] = useState<Star[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 2,
      size: 2 + Math.random() * 4,
      opacity: 0.4 + Math.random() * 0.6,
    }));
    setStars(generated);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
        transition: 'opacity 1s ease-out',
        opacity: visible ? 1 : 0,
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            top: '-10px',
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ffd700, #ffaa00)',
            boxShadow: `0 0 ${star.size * 2}px ${star.size}px rgba(255, 215, 0, 0.3)`,
            opacity: star.opacity,
            animation: `starFall ${star.duration}s ${star.delay}s ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes starFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          70% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
