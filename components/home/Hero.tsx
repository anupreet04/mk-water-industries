'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Shield, Award, Truck, HeadphonesIcon } from 'lucide-react';

const badges = [
  { icon: Shield, label: '100% Quality Checked' },
  { icon: Award, label: 'BIS Certified' },
  { icon: Truck, label: 'PAN India Supply' },
  { icon: HeadphonesIcon, label: '24/7 Support' },
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-mk-navy/95 via-mk-navy/75 to-transparent" />

      {/* Floating bubbles */}
      {[
        { size: 12, left: '8%', delay: 0 },
        { size: 20, left: '15%', delay: 2 },
        { size: 8, left: '25%', delay: 4 },
        { size: 16, left: '45%', delay: 1 },
        { size: 10, left: '65%', delay: 3 },
        { size: 18, left: '80%', delay: 1.5 },
        { size: 6, left: '90%', delay: 5 },
        { size: 14, left: '55%', delay: 2.5 },
      ].map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/10 pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: '-20px',
            animation: `bubbleRise ${10 + i}s ease-in infinite`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* Animated wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full" preserveAspectRatio="none" style={{ height: '120px' }}>
          <motion.path
            d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z"
            fill="white"
            fillOpacity="0.08"
            animate={{ d: [
              "M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z",
              "M0,40 C360,80 1080,20 1440,40 L1440,120 L0,120 Z",
              "M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z",
            ]}}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          />
          <path d="M0,80 C360,40 1080,100 1440,80 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      {/* Decorative rings */}
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full border border-white/8 pointer-events-none" />
      <div className="absolute -right-10 -top-10 w-72 h-72 rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute right-40 bottom-20 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 badge-glass text-white/90 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-widest uppercase"
              >
                <span className="w-2 h-2 rounded-full bg-mk-green animate-pulse" />
                Est. 2025 &nbsp;|&nbsp; Nanded, Maharashtra
              </motion.div>

              {/* Main heading */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] text-white mb-6 tracking-tight"
              >
                Pure Water.
                <br />
                <span className="text-mk-sky">Pure Life.</span>
                <br />
                <span className="text-gradient-gold text-5xl sm:text-4xl lg:text-5xl xl:text-6xl">Better Future.</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-white/75 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl"
              >
                Delivering hygienic and premium quality packaged drinking water with advanced RO+UV+UF purification technology, food-grade packaging and PAN India distribution.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Link href="/products" className="btn-primary flex items-center gap-2">
                  Explore Products
                  <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="btn-outline flex items-center gap-2">
                  Contact Us
                </Link>
              </motion.div>

              {/* Feature badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {badges.map(({ icon: Icon, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="flex items-center gap-2 badge-glass text-white/85 text-xs px-3 py-1.5 rounded-full"
                  >
                    <Icon size={12} className="text-mk-sky" />
                    {label}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: Product Showcase */}
            <div className="relative hidden lg:flex items-center justify-center">
              {/* Glow behind bottle */}
              <div className="absolute w-72 h-72 rounded-full bg-mk-blue/25 blur-3xl" />

              {/* Rotating ring */}
              <div className="absolute w-80 h-80 rounded-full border border-white/10 animate-spin-slow" />
              <div className="absolute w-64 h-64 rounded-full border border-white/8" style={{ animation: 'spin-slow 30s linear infinite reverse' }} />

              {/* Bottle image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 100 }}
                className="relative z-10 animate-float"
              >
                <div className="relative w-64 h-80">
                  <Image
                    src="/assets/images/home/homepage-water.PNG"
                    alt="MK Water Industries Premium Bottled Water"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </motion.div>

              {/* Floating info cards */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute top-8 right-0 badge-glass rounded-2xl px-4 py-3 text-white"
              >
                <p className="text-xs text-white/60">Purity Level</p>
                <p className="text-lg font-bold text-mk-sky">99.9%</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-16 left-0 badge-glass rounded-2xl px-4 py-3 text-white"
              >
                <p className="text-xs text-white/60">Purification</p>
                <p className="text-sm font-bold">RO + UV + UF</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="absolute -bottom-4 right-10 badge-glass rounded-2xl px-4 py-3 text-white"
              >
                <p className="text-xs text-white/60">Packaging</p>
                <p className="text-sm font-bold text-mk-green">Food Grade BPA Free</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
