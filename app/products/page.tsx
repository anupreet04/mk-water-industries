'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/home/CTABanner';

const products = [
  {
    id: 1,
    name: '250 ml Bottle',
    volume: '250 ml',
    tagline: 'Perfect for on-the-go hydration',
    description: 'Our smallest yet most versatile bottle. Compact enough for school bags, gym kits, and travel. Perfect for serving guests, events, and hospitality businesses.',
    features: ['Food Grade BPA-Free PET', 'Tamper-Evident Cap', 'Leak Proof Seal', 'Hygienically Packed', 'Crystal Clear Plastic', 'Easy to Carry'],
    uses: ['Schools & Colleges', 'Events & Functions', 'Hotels & Restaurants', 'Travel & Tourism'],
    badge: 'Mini',
    badgeColor: 'bg-green-100 text-green-700',
    available: '24 bottles/carton',
  },
  {
    id: 2,
    name: '500 ml Bottle',
    volume: '500 ml',
    tagline: 'Most popular everyday choice',
    description: 'Our bestselling product. Ideal size for daily hydration at offices, restaurants, schools and home. The perfect balance of convenience and value.',
    features: ['Food Grade BPA-Free PET', 'Easy Grip Design', 'Tamper-Evident Cap', 'Leak Proof', 'Crystal Clear', 'Hygienically Packed'],
    uses: ['Offices & Corporates', 'Restaurants & Cafes', 'Retail Stores', 'Daily Personal Use'],
    badge: 'Bestseller',
    badgeColor: 'bg-blue-100 text-blue-700',
    available: '24 bottles/carton',
    popular: true,
  },
  {
    id: 3,
    name: '1 Litre Bottle',
    volume: '1 Litre',
    tagline: 'Family-sized pure drinking water',
    description: 'Generous 1-litre capacity for extended hydration. Perfect for cafes, meeting rooms, long journeys and families. More value per bottle.',
    features: ['Wide Mouth Opening', 'Durable PET Plastic', 'BPA Free', 'Tamper-Evident Seal', 'Hygienically Packed', 'Stable Base Design'],
    uses: ['Households', 'Meeting Rooms', 'Long Distance Travel', 'Cafes & Outlets'],
    badge: 'Family',
    badgeColor: 'bg-purple-100 text-purple-700',
    available: '12 bottles/carton',
  },
  {
    id: 4,
    name: '20 Litre Water Jar',
    volume: '20 Litre',
    tagline: 'Bulk solution for offices & homes',
    description: 'Our flagship 20-litre jar is the ultimate bulk water solution. Reusable, eco-friendly and perfectly compatible with all standard water dispensers.',
    features: ['Reusable Food Grade Plastic', 'Compatible with Dispensers', 'Leak Proof Seal', 'BPA Free', 'Hygienic Filling Process', 'Heavy Duty Build'],
    uses: ['Corporate Offices', 'Factories & Industries', 'Hospitals & Clinics', 'Large Households'],
    badge: 'Bulk',
    badgeColor: 'bg-orange-100 text-orange-700',
    available: 'Individual or multi-jar orders',
  },
];

export default function ProductsPage() {
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
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block badge-glass text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">Our Products</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">
              Premium Water <span className="text-mk-sky">Products</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed max-w-2xl mx-auto">
              Four variants of pure drinking water, crafted to suit every need from personal hydration to large-scale bulk supply.
            </p>
          </motion.div>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-mk-light-blue p-10 flex items-center justify-center min-h-64 shadow-card">
                  {/* Ring decoration */}
                  <div className="absolute w-64 h-64 rounded-full border-2 border-mk-blue/10" />
                  <div className="absolute w-44 h-44 rounded-full border border-mk-blue/15" />
                  {/* Glow */}
                  <div className="absolute w-40 h-40 rounded-full bg-mk-blue/10 blur-2xl" />
                  {product.popular && (
                    <div className="absolute top-5 right-5 bg-mk-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                      Bestseller
                    </div>
                  )}
                  <motion.div
                    className="relative z-10"
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  >
                    <Image
                      src="/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.23.jpeg"
                      alt={product.name}
                      width={200}
                      height={280}
                      className="object-contain h-64 w-auto drop-shadow-2xl"
                    />
                  </motion.div>
                  {/* Label badge */}
                  <div className="absolute bottom-4 left-4 w-20 h-24 rounded-xl overflow-hidden shadow-lg border-2 border-white">
                    <Image
                      src="/assets/images/products/WhatsApp_Image_2026-07-31_at_19.54.22_(1).jpeg"
                      alt="MK Water Label"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${product.badgeColor}`}>
                  {product.badge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-mk-navy mb-2">{product.name}</h2>
                <p className="text-mk-blue font-medium mb-4">{product.tagline}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-bold text-mk-navy mb-3 text-sm uppercase tracking-wide">Features</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={14} className="text-mk-green shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best for */}
                <div className="mb-6">
                  <h4 className="font-bold text-mk-navy mb-3 text-sm uppercase tracking-wide">Best For</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.uses.map((use) => (
                      <span key={use} className="bg-blue-50 text-mk-blue text-xs px-3 py-1.5 rounded-full font-medium">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <Package size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-500">{product.available}</span>
                </div>

                <div className="flex gap-3">
                  <Link href="/contact" className="btn-primary flex items-center gap-2">
                    Order Now
                    <ArrowRight size={14} />
                  </Link>
                  <a href="https://wa.me/917719005629" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-mk-green text-mk-green font-semibold text-sm hover:bg-mk-green hover:text-white transition-colors">
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
