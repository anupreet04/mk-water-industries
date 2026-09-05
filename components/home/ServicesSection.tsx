'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Package, Truck, Printer, Globe, Factory, Store, BarChart2, Send, Boxes
} from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const services = [
  { icon: Boxes, title: 'Bulk Orders', desc: 'Custom large-volume water supply for businesses, events, and institutions at competitive wholesale rates.', color: 'from-blue-500 to-blue-600' },
  { icon: Store, title: 'Wholesale Supply', desc: 'Partner with us as a wholesale distributor and enjoy consistent quality supply with dedicated support.', color: 'from-green-500 to-green-600' },
  { icon: Printer, title: 'Custom Branding', desc: 'Print your company logo and brand identity on bottles and jars for corporate events and promotions.', color: 'from-purple-500 to-purple-600' },
  { icon: Factory, title: 'OEM Manufacturing', desc: 'White-label and private label manufacturing services for brands looking to launch their own water products.', color: 'from-orange-500 to-orange-600' },
  { icon: Package, title: 'Bottle Printing', desc: 'Custom label printing on 250ml, 500ml and 1L bottles with your branding, contact and design.', color: 'from-pink-500 to-pink-600' },
  { icon: BarChart2, title: 'Jar Printing', desc: 'Custom label and sleeve printing solutions for 20 litre water jars for offices and homes.', color: 'from-teal-500 to-teal-600' },
  { icon: Truck, title: 'Distribution', desc: 'Reliable distribution network across Nanded and surrounding districts ensuring timely delivery.', color: 'from-red-500 to-red-600' },
  { icon: Send, title: 'Home Delivery', desc: 'Convenient doorstep delivery for households, offices and commercial establishments.', color: 'from-yellow-500 to-yellow-600' },
  { icon: Globe, title: 'Export', desc: 'Supplying premium packaged drinking water to businesses and distributors across India.', color: 'from-indigo-500 to-indigo-600' },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-mk-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-mk-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-mk-sky/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <SectionHeader
            badge="Services"
            title="End-to-End"
            titleHighlight="Water Solutions"
            subtitle="From single bottle orders to large-scale OEM manufacturing and PAN India distribution — we cover every water supply need."
            light
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-6 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
