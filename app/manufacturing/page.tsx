'use client';

import { motion } from 'framer-motion';
import {
  Droplets, Sun, Filter, Wind, FlaskConical, CheckSquare, Package, Send, Truck, MapPin
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/home/CTABanner';

const steps = [
  { icon: MapPin, step: '01', title: 'Water Source', desc: 'Pure groundwater is sourced from our dedicated bore-wells and verified through initial quality screening for suitability.', color: 'from-blue-600 to-blue-700' },
  { icon: Droplets, step: '02', title: 'RO Purification', desc: 'Reverse Osmosis with high-pressure membranes removes dissolved salts, heavy metals, nitrates, and other impurities.', color: 'from-blue-500 to-blue-600' },
  { icon: Sun, step: '03', title: 'UV Treatment', desc: 'Ultraviolet irradiation at 254nm wavelength neutralizes all bacteria, viruses and pathogens without adding chemicals.', color: 'from-yellow-500 to-yellow-600' },
  { icon: Filter, step: '04', title: 'UF Filtration', desc: 'Ultrafiltration membranes with 0.01 micron pore size remove colloidal matter, suspended particles and residual turbidity.', color: 'from-green-500 to-green-600' },
  { icon: Wind, step: '05', title: 'Ozonization', desc: 'Ozone gas treatment provides tertiary disinfection, eliminates taste and odor compounds, and preserves water freshness.', color: 'from-teal-500 to-teal-600' },
  { icon: FlaskConical, step: '06', title: 'Mineral Balancing', desc: 'Essential minerals like calcium, magnesium and potassium are precisely balanced for optimal health benefits and taste.', color: 'from-purple-500 to-purple-600' },
  { icon: CheckSquare, step: '07', title: 'Quality Testing', desc: 'Comprehensive laboratory analysis including TDS, pH, turbidity, microbiological and chemical parameter verification.', color: 'from-orange-500 to-orange-600' },
  { icon: Package, step: '08', title: 'Packaging', desc: 'Automated filling in BPA-free, food-grade PET bottles in a dust-free, hygienic environment with tamper-evident sealing.', color: 'from-pink-500 to-pink-600' },
  { icon: Send, step: '09', title: 'Dispatch', desc: 'Sealed and labeled products are stored in our warehouse and dispatched through our distribution network.', color: 'from-indigo-500 to-indigo-600' },
];

export default function ManufacturingPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-mk-navy via-[#004080] to-mk-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white" style={{ width: `${200 + i * 100}px`, height: `${200 + i * 100}px`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block badge-glass text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">Manufacturing</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5">
              How We Make <span className="text-mk-sky">Pure Water</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">Our 9-stage manufacturing process transforms raw water into the purest, safest drinking water using cutting-edge technology.</p>
          </motion.div>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <SectionHeader badge="Our Process" title="9-Stage" titleHighlight="Manufacturing Process" subtitle="From water source to your hands — every step is carefully engineered for maximum purity and safety." />
          </div>

          <div className="relative">
            {/* Center vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-mk-blue via-mk-sky to-mk-green transform -translate-x-1/2" />

            <div className="space-y-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-0`}
                  >
                    {/* Card */}
                    <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all border border-gray-100">
                        <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0`}>
                            <Icon size={18} className="text-white" />
                          </div>
                          <div>
                            <span className="text-xs text-gray-400 font-mono">Step {step.step}</span>
                            <h3 className="font-bold text-mk-navy text-base">{step.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-mk-blue to-mk-sky items-center justify-center text-white font-bold text-xs shadow-glow z-10 border-4 border-white">
                      {step.step}
                    </div>

                    <div className="hidden md:block w-5/12" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-mk-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '9', label: 'Stage Process' },
              { value: '99.9%', label: 'Purity Level' },
              { value: '0.01µ', label: 'Filtration Size' },
              { value: '100%', label: 'Tested Batches' },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-6">
                <div className="text-3xl font-extrabold text-mk-sky mb-1">{s.value}</div>
                <div className="text-white/60 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
