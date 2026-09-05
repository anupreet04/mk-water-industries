'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';
import { telLink, whatsappLink } from '@/lib/config';

export default function CTABanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 bg-mk-navy/60" />

      {/* Decorative rings */}
      <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full border border-white/8 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-mk-sky text-sm font-semibold tracking-widest uppercase mb-3">Ready to Get Started?</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Get Pure Water Delivered
            <br />
            <span className="text-gradient-gold">To Your Doorstep</span>
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Contact us for bulk orders, wholesale partnerships, or home delivery. We're available 24×7 to serve you.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary flex items-center gap-2">
              Get a Quote
              <ArrowRight size={16} />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="btn-outline flex items-center gap-2"
            >
              <WhatsAppIcon size={16} />
              WhatsApp Us
            </a>
            <a href={telLink()} className="btn-outline flex items-center gap-2">
              <Phone size={16} />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
