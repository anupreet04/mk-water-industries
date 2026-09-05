'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Droplets, Sun, Filter, Wind, Package, FlaskConical, Eye, ShieldCheck
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const steps = [
  { icon: Droplets, step: '01', title: 'RO Purification', desc: 'Reverse Osmosis removes dissolved impurities, heavy metals, and contaminants from the water source.', color: 'from-blue-500 to-blue-600' },
  { icon: Sun, step: '02', title: 'UV Treatment', desc: 'Ultraviolet light eliminates bacteria, viruses and other micro-organisms without adding chemicals.', color: 'from-yellow-500 to-yellow-600' },
  { icon: Filter, step: '03', title: 'UF Filtration', desc: 'Ultrafiltration membranes remove suspended particles, colloids and residual impurities.', color: 'from-green-500 to-green-600' },
  { icon: Wind, step: '04', title: 'Ozonization', desc: 'Ozone treatment provides final disinfection and extends shelf life while keeping water fresh.', color: 'from-teal-500 to-teal-600' },
  { icon: FlaskConical, step: '05', title: 'Mineral Balancing', desc: 'Essential minerals are balanced to ensure the water is healthy, refreshing and great tasting.', color: 'from-purple-500 to-purple-600' },
  { icon: Eye, step: '06', title: 'Quality Testing', desc: 'Multi-parameter lab testing on every batch for pH, TDS, bacteria and chemical compliance.', color: 'from-orange-500 to-orange-600' },
  { icon: Package, step: '07', title: 'Food Grade Packaging', desc: 'Bottles and jars are manufactured from BPA-free, food-grade plastic in a hygienic environment.', color: 'from-pink-500 to-pink-600' },
  { icon: ShieldCheck, step: '08', title: 'Leak Testing', desc: 'Every bottle is pressure-tested and inspected for leaks before being sealed and dispatched.', color: 'from-red-500 to-red-600' },
];

export default function QualitySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-mk-light-blue blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <SectionHeader
            badge="Quality Assurance"
            title="8-Stage Purification"
            titleHighlight="Process"
            subtitle="Every drop of MK Water undergoes our stringent 8-stage purification process to ensure absolute purity and safety."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl p-6 bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                {/* Step number */}
                <span className="absolute top-4 right-4 text-6xl font-black text-gray-50 leading-none select-none">
                  {step.step}
                </span>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-md`}>
                  <Icon size={22} className="text-white" />
                </div>

                <h3 className="font-bold text-mk-navy text-base mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>

                {/* Connector arrow on lg */}
                {i < steps.length - 1 && (i + 1) % 4 !== 0 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-200 to-mk-blue/30 z-10" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Purity meter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-14 rounded-3xl bg-gradient-to-r from-mk-navy to-mk-blue p-8 text-white text-center"
        >
          <p className="text-white/70 text-sm mb-2">Achieved Purity Level</p>
          <div className="text-5xl font-extrabold mb-3">99.9%</div>
          <div className="w-full max-w-md mx-auto h-3 bg-white/20 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-mk-sky to-mk-green rounded-full"
              initial={{ width: '0%' }}
              animate={inView ? { width: '99.9%' } : {}}
              transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
            />
          </div>
          <p className="text-white/60 text-sm">Tested and verified on every production batch</p>
        </motion.div>
      </div>
    </section>
  );
}
