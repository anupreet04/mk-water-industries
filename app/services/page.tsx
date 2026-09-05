'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Boxes, Store, Printer, Factory, Package, BarChart2, Truck, Send, Globe,
  ArrowRight, CheckCircle
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/home/CTABanner';

const services = [
  {
    icon: Boxes,
    title: 'Bulk Orders',
    desc: 'Need water in large quantities for events, institutions or businesses? We accept bulk orders of any size with competitive pricing and priority dispatch.',
    features: ['Minimum order: 1 carton', 'Price breaks on large volume', 'Priority processing', 'Dedicated account manager'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Store,
    title: 'Wholesale Supply',
    desc: 'Become an authorized wholesale distributor of MK Water in your area. Enjoy consistent supply, excellent margins and full business support.',
    features: ['Distributor pricing', 'Exclusive territory options', 'Marketing materials', 'Regular supply schedule'],
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Printer,
    title: 'Custom Branding',
    desc: 'Put your brand on premium drinking water. Custom labels with your logo, color scheme, and contact details — perfect for events and corporate identity.',
    features: ['Minimum 500 bottles', 'Full color label printing', 'Custom design support', 'Quick turnaround'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Factory,
    title: 'OEM Manufacturing',
    desc: 'Launch your own water brand with our private label and OEM manufacturing services. We handle production, you handle the brand.',
    features: ['White-label production', 'Custom packaging design', 'Regulatory compliance support', 'Scalable volumes'],
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Package,
    title: 'Bottle Printing',
    desc: 'Custom label and sleeve printing for 250ml, 500ml and 1L bottles. Brand every bottle with your identity for corporate events and promotions.',
    features: ['All bottle sizes supported', 'Waterproof label materials', 'Vibrant color printing', 'Bulk pricing available'],
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: BarChart2,
    title: 'Jar Printing',
    desc: 'Custom label and sleeve solutions for 20 litre water jars. Make your dispensed water a branding opportunity for your office or business.',
    features: ['Custom jar sleeves', 'Label design service', 'Minimum 50 jars', 'Heat shrink options'],
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Truck,
    title: 'Distribution',
    desc: 'We operate a reliable distribution network across Nanded and surrounding districts. On-time, every time — our logistics team ensures prompt delivery.',
    features: ['Nanded city coverage', 'Surrounding district delivery', 'Scheduled route deliveries', 'Real-time order tracking'],
    color: 'from-red-500 to-red-600',
  },
  {
    icon: Send,
    title: 'Home Delivery',
    desc: 'Convenient doorstep delivery for households, offices and commercial establishments. Schedule regular deliveries and never run out of pure water.',
    features: ['Same-day delivery available', 'Scheduled recurring orders', 'Contactless delivery', 'Easy online ordering'],
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Globe,
    title: 'PAN India Supply',
    desc: 'For bulk institutional and corporate clients, we supply premium packaged water across India with coordinated logistics and quality assurance.',
    features: ['Large volume shipments', 'Quality certified packaging', 'Documentation support', 'Flexible MOQ for exports'],
    color: 'from-indigo-500 to-indigo-600',
  },
];

export default function ServicesPage() {
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
            <span className="inline-block badge-glass text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">Our Services</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5">
              Complete Water <span className="text-mk-sky">Business Solutions</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">From custom branding to PAN India distribution — we offer a complete suite of water supply and manufacturing services.</p>
          </motion.div>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <SectionHeader badge="Services" title="Everything You Need" titleHighlight="in One Place" subtitle="We are more than just a water company — we are your end-to-end water business partner." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl p-7 border border-gray-100 shadow-card hover:shadow-card-hover transition-all bg-white"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-md`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <h3 className="font-bold text-mk-navy text-xl mb-2">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={13} className="text-mk-green shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="flex items-center gap-2 text-mk-blue font-semibold text-sm hover:gap-3 transition-all">
                    Enquire Now <ArrowRight size={14} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
