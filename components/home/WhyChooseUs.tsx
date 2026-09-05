'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Award, DollarSign, Cpu, Zap, Users, ShieldCheck, RefreshCw, PhoneCall
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const reasons = [
  { icon: Award, title: 'Premium Quality', desc: 'Every bottle undergoes multi-stage purification and quality testing before it reaches you.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: DollarSign, title: 'Affordable Pricing', desc: 'We believe clean water should be accessible to everyone. Competitive pricing without compromise.', color: 'text-green-500', bg: 'bg-green-50' },
  { icon: Cpu, title: 'Modern Machinery', desc: 'State-of-the-art RO+UV+UF+Ozone purification equipment ensures highest water purity standards.', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Zap, title: 'Fast Delivery', desc: 'Streamlined logistics ensures your orders are delivered on time, every time, wherever you are.', color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { icon: Users, title: 'Experienced Team', desc: 'Our skilled team of water treatment experts and quality inspectors bring years of industry experience.', color: 'text-teal-500', bg: 'bg-teal-50' },
  { icon: ShieldCheck, title: 'Quality Assurance', desc: 'Rigorous quality checks at every production stage ensure consistent purity, taste and safety.', color: 'text-red-500', bg: 'bg-red-50' },
  { icon: RefreshCw, title: 'Reliable Supply', desc: 'Consistent, uninterrupted supply of packaged drinking water through our robust distribution network.', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: PhoneCall, title: 'Excellent Support', desc: '24/7 customer support to handle orders, queries, complaints and feedback with utmost care.', color: 'text-indigo-500', bg: 'bg-indigo-50' },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <SectionHeader
            badge="Why Choose Us"
            title="The MK Water"
            titleHighlight="Advantage"
            subtitle="We go beyond just supplying water. We deliver trust, purity, and value with every order."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(0,123,255,0.15)' }}
                className="rounded-2xl p-6 bg-white border border-gray-100 shadow-card transition-all duration-300 cursor-default"
              >
                <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon size={24} className={item.color} />
                </div>
                <h3 className="font-bold text-mk-navy text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
