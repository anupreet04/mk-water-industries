'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import { CalendarCheck, ShieldCheck, Headphones, Globe } from 'lucide-react';

const stats = [
  {
    icon: CalendarCheck,
    value: 2025,
    prefix: '',
    suffix: '',
    label: 'Year Established',
    sublabel: 'Serving Since 2025',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: ShieldCheck,
    value: 100,
    prefix: '',
    suffix: '%',
    label: 'Quality Checked',
    sublabel: 'Every Batch Tested',
    color: 'from-green-400 to-green-600',
  },
  {
    icon: Headphones,
    value: 24,
    prefix: '',
    suffix: '/7',
    label: 'Customer Support',
    sublabel: 'Always Available',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Globe,
    value: 0,
    prefix: 'PAN',
    suffix: '',
    label: 'Supply Network',
    sublabel: 'India Delivery',
    special: 'PAN India',
    color: 'from-orange-400 to-orange-600',
  },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative bg-white py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
                className="card-3d glass-card-light rounded-2xl p-6 text-center shadow-card border border-blue-50 group"
              >
                {/* Icon */}
                <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon size={26} className="text-white" />
                </div>

                {/* Value */}
                <div className="text-3xl lg:text-4xl font-extrabold text-mk-navy mb-1">
                  {stat.special ? (
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: i * 0.15 + 0.3 }}
                    >
                      {stat.special}
                    </motion.span>
                  ) : (
                    <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  )}
                </div>

                {/* Label */}
                <p className="text-mk-navy font-semibold text-sm">{stat.label}</p>
                <p className="text-gray-400 text-xs mt-1">{stat.sublabel}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
