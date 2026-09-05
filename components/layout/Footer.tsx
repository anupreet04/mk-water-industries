'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube, ChevronRight, Droplets } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Services', href: '/services' },
  { label: 'Quality Assurance', href: '/quality' },
];

const moreLinks = [
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
];

const products = ['250 ml Bottle', '500 ml Bottle', '1 Litre Bottle', '20 Litre Water Jar'];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Wave top */}
      <div className="relative h-20 bg-white">
        <svg viewBox="0 0 1440 80" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none">
          <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="#002B5B" />
        </svg>
      </div>

      <div className="bg-mk-navy text-white">
        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                  <Image
                    src="/assets/images/logo/WhatsApp_Image_2026-07-31_at_19.54.21.jpeg"
                    alt="MK Water Industries"
                    width={56}
                    height={56}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="font-bold text-lg leading-tight">MK Water Industries</p>
                  <p className="text-white/60 text-xs">Est. 2025</p>
                </div>
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-5">
                Delivering hygienic and premium quality packaged drinking water across India with advanced purification technology and food-grade packaging.
              </p>
              <div className="flex items-center gap-2">
                <Droplets size={16} className="text-mk-sky" />
                <span className="text-mk-sky text-sm font-medium italic">Pure Water. Pure Life. Better Future.</span>
              </div>
              {/* Social */}
              <div className="flex items-center gap-3 mt-5">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Youtube, label: 'YouTube' },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-mk-blue transition-colors"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-bold text-base mb-5 text-white">Quick Links</h4>
              <ul className="space-y-2">
                {[...quickLinks, ...moreLinks].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-white/65 hover:text-white text-sm transition-colors group"
                    >
                      <ChevronRight size={14} className="text-mk-sky group-hover:translate-x-1 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-bold text-base mb-5 text-white">Our Products</h4>
              <ul className="space-y-2">
                {products.map((p) => (
                  <li key={p}>
                    <Link
                      href="/products"
                      className="flex items-center gap-2 text-white/65 hover:text-white text-sm transition-colors group"
                    >
                      <ChevronRight size={14} className="text-mk-sky group-hover:translate-x-1 transition-transform" />
                      {p}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 text-white/65 hover:text-white text-sm transition-colors group"
                  >
                    <ChevronRight size={14} className="text-mk-sky group-hover:translate-x-1 transition-transform" />
                    Custom Branding / OEM
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-base mb-5 text-white">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin size={18} className="text-mk-sky shrink-0 mt-0.5" />
                  <span className="text-white/65 text-sm leading-relaxed">
                    Dhillon Motors, Opp. Gramin Polytechnic College,<br />
                    Beside Gurudwara, Vishnupuri,<br />
                    Nanded, Maharashtra
                  </span>
                </li>
                <li>
                  <a href="tel:+917719005629" className="flex items-center gap-3 text-white/65 hover:text-white text-sm transition-colors">
                    <Phone size={16} className="text-mk-sky shrink-0" />
                    +91 77190 05629
                  </a>
                </li>
                <li>
                  <a href="mailto:mkindustries0013@gmail.com" className="flex items-center gap-3 text-white/65 hover:text-white text-sm transition-colors">
                    <Mail size={16} className="text-mk-sky shrink-0" />
                    mkindustries0013@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock size={16} className="text-mk-sky shrink-0" />
                  <div>
                    <p className="text-white/65 text-sm">Mon–Sat: 9 AM – 7 PM</p>
                    <p className="text-mk-green text-xs font-medium">Available 24×7</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/50 text-sm">
            <p>© 2025 MK Water Industries. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Made with <span className="text-red-400">♥</span> in India
              <span className="text-mk-sky ml-2">| Pure Water. Pure Life.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
