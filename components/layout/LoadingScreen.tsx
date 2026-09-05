'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Animated bubbles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 pointer-events-none"
              style={{
                width: `${20 + i * 15}px`,
                height: `${20 + i * 15}px`,
                left: `${10 + i * 15}%`,
                bottom: '0',
                animationDelay: `${i * 1.2}s`,
                animation: `bubbleRise ${8 + i}s ease-in infinite`,
              }}
            />
          ))}

          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
            className="mb-8 text-center"
          >
            <div className="w-28 h-28 mx-auto mb-4 relative rounded-full overflow-hidden border-4 border-white/30 shadow-glow">
              <Image
                src="/assets/images/logo/WhatsApp_Image_2026-07-31_at_19.54.21.jpeg"
                alt="MK Water Industries Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <motion.h1
              className="text-white text-3xl font-bold tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              MK Water Industries
            </motion.h1>
            <motion.p
              className="text-white/70 text-sm mt-1 tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Pure Water. Pure Life.
            </motion.p>
          </motion.div>

          {/* Animated water drop */}
          <motion.div
            className="mb-8"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <svg width="40" height="52" viewBox="0 0 40 52" fill="none">
              <path
                d="M20 0 C20 0 2 22 2 32 C2 42 10 50 20 50 C30 50 38 42 38 32 C38 22 20 0 20 0Z"
                fill="url(#dropGrad)"
              />
              <defs>
                <linearGradient id="dropGrad" x1="0" y1="0" x2="40" y2="52" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4DAFFF" />
                  <stop offset="1" stopColor="#007BFF" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-white"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-3 tracking-widest">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
