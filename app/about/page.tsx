'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CircleCheck as CheckCircle, Target, Eye, Heart, Leaf, Users, Shield, Zap } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/home/CTABanner';
import { SITE_CONFIG } from '@/lib/config';

const values = [
  { icon: Shield, label: 'Purity', desc: 'We never compromise on the purity of water.', color: 'from-blue-500 to-blue-600' },
  { icon: Heart, label: 'Integrity', desc: 'Honest business practices and transparent operations.', color: 'from-red-500 to-red-600' },
  { icon: CheckCircle, label: 'Quality', desc: 'Highest quality standards in every batch we produce.', color: 'from-green-500 to-green-600' },
  { icon: Zap, label: 'Innovation', desc: 'Continuously improving processes and technology.', color: 'from-yellow-500 to-yellow-600' },
  { icon: Users, label: 'Customer First', desc: 'Our customers are at the heart of everything we do.', color: 'from-purple-500 to-purple-600' },
  { icon: Leaf, label: 'Sustainability', desc: 'Eco-conscious practices and sustainable packaging.', color: 'from-teal-500 to-teal-600' },
];

const team = [
  { label: 'Company', value: 'MK Water Industries' },
  { label: 'Established', value: '2025' },
  { label: 'Location', value: 'Nanded, Maharashtra' },
  { label: 'Business Type', value: 'Manufacturer & Distributor' },
  { label: 'Availability', value: 'Open 24×7' },
  { label: 'Working Hours', value: '9 AM – 7 PM (Mon–Sat)' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-mk-navy via-[#004080] to-mk-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white" style={{ width: `${200 + i * 100}px`, height: `${200 + i * 100}px`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block badge-glass text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">About Us</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">
              Our Story &amp; <span className="text-mk-sky">Mission</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed max-w-2xl mx-auto">
              MK Water Industries was born from a simple belief: every person deserves access to pure, safe and affordable drinking water.
            </p>
          </motion.div>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.23.jpeg" alt="MK Water Industries" width={600} height={500} className="object-cover w-full h-96" />
                <div className="absolute inset-0 bg-gradient-to-t from-mk-navy/50 to-transparent" />
                <div className="absolute bottom-6 left-6 badge-glass rounded-xl px-4 py-3 text-white">
                  <p className="text-2xl font-extrabold">Est. 2025</p>
                  <p className="text-xs text-white/70">Nanded, Maharashtra</p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
              <SectionHeader badge="Our Story" title="Committed to" titleHighlight="Pure Drinking Water" centered={false} />
              <div className="mt-4 space-y-4 text-gray-600 leading-relaxed">
                <p>Founded in 2025 in the heart of Nanded, Maharashtra, MK Water Industries emerged with a clear purpose — to provide every individual, household and business with access to safe, hygienic, and affordable packaged drinking water.</p>
                <p>Our state-of-the-art purification facility combines the most advanced water treatment technologies including Reverse Osmosis, UV Disinfection, Ultrafiltration and Ozonization. This multi-barrier approach ensures that every drop that leaves our facility is not just safe, but genuinely pure.</p>
                <p>We take immense pride in our food-grade, BPA-free packaging, rigorous quality testing and efficient distribution network that reaches homes, schools, hotels, corporate offices and retailers across Nanded and beyond.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {team.map(({ label, value }) => (
                  <div key={label} className="bg-blue-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="font-semibold text-mk-navy text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-mk-light-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-mk-navy to-[#004080] rounded-3xl p-8 text-white">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                <Target size={28} className="text-mk-sky" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
              <p className="text-white/75 leading-relaxed">To provide safe, hygienic and affordable packaged drinking water using modern purification technology while ensuring complete customer satisfaction. We aim to be the most trusted water brand for households and businesses across Maharashtra.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-gradient-to-br from-mk-blue to-[#0066dd] rounded-3xl p-8 text-white">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                <Eye size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
              <p className="text-white/85 leading-relaxed">To become one of India's most trusted packaged drinking water manufacturers known for quality, innovation and sustainability. We envision a future where every home has access to pure water through our expanding network.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionHeader badge="Core Values" title="Principles That" titleHighlight="Drive Us" subtitle="Our six core values guide every decision, every product and every customer interaction." />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.label} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="rounded-2xl p-6 border border-gray-100 shadow-card text-center hover:shadow-card-hover transition-all">
                  <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow-md`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-mk-navy mb-2">{v.label}</h3>
                  <p className="text-gray-500 text-sm">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Address & Contact */}
      <section className="py-16 bg-mk-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Our Location</h2>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src={SITE_CONFIG.maps.embedUrl}
              width="100%" height="350" loading="lazy" className="w-full"
              title="MK Water Industries Location"
            />
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="badge-glass rounded-xl p-4">
              <p className="text-white/60 mb-1">Address</p>
              <p className="text-white font-medium leading-snug">Dhillon Motors, Opp. Gramin Polytechnic College, Vishnupuri, Nanded, MH</p>
            </div>
            <div className="badge-glass rounded-xl p-4">
              <p className="text-white/60 mb-1">Phone / WhatsApp</p>
              <a href="tel:+917719005629" className="text-mk-sky font-bold text-lg">+91 77190 05629</a>
            </div>
            <div className="badge-glass rounded-xl p-4">
              <p className="text-white/60 mb-1">Email</p>
              <a href="mailto:mkindustries0013@gmail.com" className="text-mk-sky font-medium break-all">mkindustries0013@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
