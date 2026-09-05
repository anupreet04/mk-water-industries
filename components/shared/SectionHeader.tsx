'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  titleHighlight,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={centered ? 'text-center' : ''}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1 }}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-4 ${
            light
              ? 'bg-white/15 text-white border border-white/25'
              : 'bg-blue-50 text-mk-blue border border-blue-100'
          }`}
        >
          {badge}
        </motion.span>
      )}
      <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${light ? 'text-white' : 'text-mk-navy'}`}>
        {title}{' '}
        {titleHighlight && (
          <span className={light ? 'text-mk-sky' : 'text-gradient'}>
            {titleHighlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
