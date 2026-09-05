'use client';

import { motion } from 'framer-motion';
import {
  Droplets, Sun, Filter, Wind, FlaskConical, Eye, Package, ShieldCheck, Award, CheckCircle
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/home/CTABanner';

const qualitySteps = [
  { icon: Droplets, title: 'RO Purification', desc: 'Multi-stage Reverse Osmosis removes dissolved salts, heavy metals, nitrates, arsenic and all harmful dissolved solids.', detail: 'TDS reduced to optimal 80-150 ppm', color: 'from-blue-500 to-blue-600' },
  { icon: Sun, title: 'UV Treatment', desc: 'Germicidal UV rays at 254nm wavelength irradiate and neutralize all living micro-organisms including bacteria and viruses.', detail: '99.9% pathogen elimination', color: 'from-yellow-500 to-yellow-600' },
  { icon: Filter, title: 'UF Filtration', desc: 'Ultrafiltration hollow fiber membranes with 0.01 micron precision remove suspended particles and micro-contaminants.', detail: '0.01 micron filtration precision', color: 'from-green-500 to-green-600' },
  { icon: Wind, title: 'Ozonization', desc: 'Ozone gas dissolved in water acts as a powerful disinfectant, eliminating residual pathogens and oxidizing organic matter.', detail: '0.1-0.3 ppm ozone treatment', color: 'from-teal-500 to-teal-600' },
  { icon: Package, title: 'Food Grade Packaging', desc: 'Bottles and jars manufactured from virgin PET resin that meets FDA and BIS food contact material standards.', detail: 'BIS IS 14543 compliant', color: 'from-purple-500 to-purple-600' },
  { icon: Eye, title: 'Leak Testing', desc: 'Every sealed bottle undergoes automated pressure testing and visual inspection before being labelled and boxed.', detail: '100% bottles pressure tested', color: 'from-orange-500 to-orange-600' },
  { icon: FlaskConical, title: 'Lab Quality Inspection', desc: 'On-site laboratory tests every production batch for pH, TDS, turbidity, chloride, nitrates and microbiological parameters.', detail: 'ISO-compliant testing protocols', color: 'from-pink-500 to-pink-600' },
  { icon: ShieldCheck, title: 'Safe Drinking Standards', desc: 'All products comply with BIS IS 14543 (packaged drinking water) and WHO drinking water quality guidelines.', detail: 'BIS IS 14543 & WHO compliant', color: 'from-red-500 to-red-600' },
];

const certifications = [
  { label: 'BIS IS 14543', desc: 'Bureau of Indian Standards — Packaged Drinking Water' },
  { label: 'Food Grade', desc: 'FDA/FSSAI compliant packaging materials' },
  { label: 'BPA Free', desc: 'No bisphenol-A in any packaging material' },
  { label: 'RO+UV+UF', desc: 'Certified multi-stage purification system' },
];

export default function QualityPage() {
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
            <span className="inline-block badge-glass text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">Quality Assurance</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5">
              Quality You Can <span className="text-mk-sky">Trust</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">Every bottle of MK Water undergoes 8 rigorous quality checkpoints before it reaches your hands.</p>
          </motion.div>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* Purity meter */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-gray-400 text-sm mb-2 tracking-wide uppercase">Achieved Purity Level</p>
            <div className="text-7xl font-black text-mk-navy mb-4">99.9<span className="text-mk-blue">%</span></div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-mk-blue to-mk-green rounded-full"
                initial={{ width: '0%' }}
                whileInView={{ width: '99.9%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 1.5 }}
              />
            </div>
            <p className="text-gray-400 text-sm">Verified through comprehensive laboratory testing on every production batch</p>
          </motion.div>
        </div>
      </section>

      {/* Quality Steps */}
      <section className="py-16 bg-mk-light-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionHeader badge="Quality Process" title="8-Stage Quality" titleHighlight="Assurance System" subtitle="Our comprehensive quality assurance system covers every aspect of water purity, packaging safety and delivery." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualitySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-md`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-mk-navy mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{step.desc}</p>
                  <span className="inline-block text-xs bg-blue-50 text-mk-blue px-2 py-1 rounded-lg font-medium">{step.detail}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-10">
            <SectionHeader badge="Compliance" title="Standards &" titleHighlight="Certifications" subtitle="We comply with all mandatory national and international quality standards for packaged drinking water." />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center rounded-2xl border-2 border-mk-blue/20 p-6 hover:border-mk-blue transition-colors"
              >
                <Award size={32} className="text-mk-blue mx-auto mb-3" />
                <p className="font-bold text-mk-navy text-sm">{cert.label}</p>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
