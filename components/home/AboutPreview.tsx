'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const highlights = [
  'Advanced RO + UV + UF + Ozone purification',
  'Modern manufacturing plant with ISO standards',
  'Food-grade, BPA-free packaging materials',
  'Strict quality control on every batch',
  'Affordable pricing with no compromise on quality',
  'Reliable delivery across Maharashtra & beyond',
];

export default function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-mk-light-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Images collage */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96">
              <Image
                src="/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.23.jpeg"
                alt="MK Water Industries – Premium Bottled Water"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mk-navy/40 to-transparent" />
            </div>
            {/* Label detail */}
            <div className="absolute -bottom-6 -right-4 w-40 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.22_(1).jpeg"
                alt="MK Water Industries Bottle Label"
                fill
                className="object-cover"
              />
            </div>
            {/* Badge */}
            <div className="absolute top-5 left-5 badge-glass rounded-xl px-4 py-2.5 text-white">
              <p className="text-xs opacity-70">Est.</p>
              <p className="text-2xl font-extrabold">2025</p>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <SectionHeader
              badge="About MK Water Industries"
              title="Crafting Purity in"
              titleHighlight="Every Drop"
              centered={false}
            />

            <p className="text-gray-600 leading-relaxed mb-6 mt-4">
              Founded in 2025 in Nanded, Maharashtra, MK Water Industries is committed to delivering
              the highest standard of packaged drinking water to homes, businesses, and institutions across India.
              With cutting-edge multi-stage purification technology and food-grade packaging, we ensure that
              every bottle that leaves our facility meets the strictest quality benchmarks.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our state-of-the-art manufacturing facility combines RO, UV, UF, and Ozonization processes
              to deliver water that is not just safe but truly pure. We believe every individual deserves
              access to clean, affordable drinking water.
            </p>

            {/* Highlights */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <CheckCircle size={16} className="text-mk-green shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <Link href="/about" className="btn-primary inline-flex items-center gap-2">
              Learn More About Us
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
