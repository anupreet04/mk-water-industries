'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const testimonials = [
  {
    name: 'Rajesh Patil',
    role: 'Hotel Manager',
    company: 'Hotel Vishnupuri, Nanded',
    rating: 5,
    review: 'MK Water Industries has been our trusted water supplier for months. The quality is exceptional, and the delivery is always on time. Our guests appreciate the clean, fresh taste of the water.',
    initials: 'RP',
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Sunita Kulkarni',
    role: 'School Principal',
    company: 'New English School, Nanded',
    rating: 5,
    review: 'We supply MK Water bottles to all students and staff. The food-grade packaging and purity standards give us complete confidence. Excellent service and great pricing for bulk orders.',
    initials: 'SK',
    color: 'from-green-500 to-green-600',
  },
  {
    name: 'Amit Sharma',
    role: 'Restaurant Owner',
    company: 'Sharma Family Restaurant, Nanded',
    rating: 5,
    review: 'Switched to MK Water Industries 6 months ago. The difference in water quality is noticeable. Our customers love it and it has actually improved our reputation. Highly recommended!',
    initials: 'AS',
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Priya Deshmukh',
    role: 'Retail Store Owner',
    company: 'Deshmukh General Store',
    rating: 5,
    review: 'As a retailer, I need reliable supply and consistent quality. MK Water Industries delivers both. My customers keep coming back for their bottles. Great product, great service!',
    initials: 'PD',
    color: 'from-orange-500 to-orange-600',
  },
  {
    name: 'Sunil Reddy',
    role: 'Distribution Partner',
    company: 'Reddy Beverages, Nanded',
    rating: 5,
    review: 'The wholesale pricing and quality consistency of MK Water Industries makes distribution easy and profitable. Their 20L jars are in high demand in our area. Perfect business partner.',
    initials: 'SR',
    color: 'from-teal-500 to-teal-600',
  },
  {
    name: 'Kavita Naik',
    role: 'HR Manager',
    company: 'Naik Industries Pvt. Ltd.',
    rating: 5,
    review: 'We order 20L jars in bulk for our corporate office. The water quality is superb and the delivery is always prompt. MK Water has been our go-to choice for office drinking water.',
    initials: 'KN',
    color: 'from-pink-500 to-pink-600',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding bg-mk-light-blue relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-mk-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <SectionHeader
            badge="Testimonials"
            title="What Our"
            titleHighlight="Customers Say"
            subtitle="Trusted by hotels, schools, restaurants, retailers and corporate clients across Maharashtra."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 relative"
            >
              <Quote className="absolute top-5 right-5 text-blue-100" size={36} />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.review}"</p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-mk-navy text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
