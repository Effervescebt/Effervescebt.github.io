'use client';

import { useEffect, useState } from 'react';

const EMOJIS = ['✨', '✨', '✨', '❤️'];

interface Star {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  emoji: string;
}

export default function FallingStars() {
  const [stars, setStars] = useState<Star[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 2,
      size: 16 + Math.random() * 20,
      opacity: 0.5 + Math.random() * 0.5,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
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
      }}
    >
      {stars.map((star) => (
        <span
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            top: '-40px',
            fontSize: `${star.size}px`,
            opacity: star.opacity,
            animation: `starFall ${star.duration}s ${star.delay}s ease-in forwards`,
            lineHeight: 1,
          }}
        >
          {star.emoji}
        </span>
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
            transform: translateY(105vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
