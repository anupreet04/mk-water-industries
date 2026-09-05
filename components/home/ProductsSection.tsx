'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Package, Droplets, ArrowRight, CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const products = [
  {
    id: 1,
    name: '250 ml Bottle',
    tagline: 'Perfect for on-the-go hydration',
    description: 'Compact, lightweight and perfectly sized for school bags, travel and on-the-go consumption.',
    features: ['Food Grade PET', 'Leak Proof Cap', 'BPA Free', 'Hygienically Packed'],
    badge: 'Mini',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    id: 2,
    name: '500 ml Bottle',
    tagline: 'Most popular everyday choice',
    description: 'Our bestselling bottle, ideal for offices, restaurants, schools, and daily hydration needs.',
    features: ['Crystal Clear PET', 'Easy Grip Design', 'BPA Free', 'Leak Proof'],
    badge: 'Bestseller',
    badgeColor: 'bg-blue-100 text-blue-700',
    popular: true,
  },
  {
    id: 3,
    name: '1 Litre Bottle',
    tagline: 'Family sized pure water',
    description: 'The ideal choice for homes, cafés and small events. Full-day hydration in a single bottle.',
    features: ['Wide Mouth Cap', 'Durable Plastic', 'BPA Free', 'Hygienically Packed'],
    badge: 'Family',
    badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 4,
    name: '20 Litre Water Jar',
    tagline: 'Bulk solution for offices & homes',
    description: 'Designed for offices, factories, canteens and households with high water consumption needs.',
    features: ['Reusable Jar', 'Food Grade Plastic', 'Leak Proof', 'Easy Dispenser Ready'],
    badge: 'Bulk',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
];

export default function ProductsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <SectionHeader
            badge="Our Products"
            title="Premium Water"
            titleHighlight="For Every Need"
            subtitle="From personal hydration to bulk supply, our complete range of pure drinking water products meets every requirement with unmatched quality."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className={`group relative rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-400 bg-white border ${
                product.popular ? 'border-mk-blue ring-2 ring-mk-blue/20' : 'border-gray-100'
              }`}
            >
              {/* Popular ring */}
              {product.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mk-blue via-mk-sky to-mk-blue" />
              )}

              {/* Image area */}
              <div className="relative h-52 bg-gradient-to-br from-blue-50 to-mk-light-blue overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Glow effect */}
                  <div className="absolute w-32 h-32 bg-mk-blue/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <motion.div
                    className="relative z-10"
                    whileHover={{ scale: 1.08, y: -8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Image
                      src="/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.23.jpeg"
                      alt={product.name}
                      width={140}
                      height={200}
                      className="object-contain drop-shadow-xl h-44 w-auto"
                    />
                  </motion.div>
                </div>

                {/* Badge */}
                <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${product.badgeColor}`}>
                  {product.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-mk-navy mb-1 group-hover:text-mk-blue transition-colors">
                  {product.name}
                </h3>
                <p className="text-mk-blue text-xs font-medium mb-2">{product.tagline}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>

                {/* Features */}
                <ul className="space-y-1.5 mb-5">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle size={13} className="text-mk-green shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/products"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-mk-blue text-white hover:bg-[#0066dd] transition-colors"
                >
                  View Details
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10"
        >
          <Link href="/products" className="inline-flex items-center gap-2 text-mk-blue font-semibold hover:gap-3 transition-all">
            View All Products
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
