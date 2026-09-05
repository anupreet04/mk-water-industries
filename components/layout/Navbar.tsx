'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Services', href: '/services' },
  { label: 'Quality', href: '/quality' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';

  // On non-home pages, treat top-of-page as "dark" (navy) rather than transparent
  const isDark = !scrolled;          // true when at top
  const showDark = isDark && !isHome; // non-home pages: solid navy at top
  const showTransparent = isDark && isHome; // home page only: transparent over hero

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    // Re-check immediately on navigation
    setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navBg = scrolled
    ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-blue-50'
    : showDark
      ? 'bg-mk-navy/95 backdrop-blur-xl shadow-lg'
      : 'bg-transparent';

  // Text/icon colors based on current nav background
  const textLight = scrolled ? false : true; // white text when not scrolled (home transparent OR non-home navy)

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-md transition-transform group-hover:scale-105">
                <Image
                  src="/assets/images/logo/WhatsApp_Image_2026-07-31_at_19.54.21.jpeg"
                  alt="MK Water Industries"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <span className={`font-bold text-lg leading-tight block transition-colors duration-300 ${scrolled ? 'text-mk-navy' : 'text-white'}`}>
                  MK Water Industries
                </span>
                <span className={`text-xs transition-colors duration-300 ${scrolled ? 'text-mk-blue' : 'text-white/70'}`}>
                  Pure Water. Pure Life.
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    pathname === link.href
                      ? scrolled ? 'text-mk-blue bg-blue-50' : 'text-white bg-white/20'
                      : scrolled ? 'text-gray-700 hover:text-mk-blue hover:bg-blue-50' : 'text-white/80 hover:text-white hover:bg-white/15'
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${scrolled ? 'bg-mk-blue' : 'bg-white'}`}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+917719005629"
                className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                  scrolled
                    ? 'bg-mk-blue text-white hover:bg-[#0066dd] shadow-md'
                    : 'bg-white text-mk-navy hover:bg-white/90'
                }`}              >
                <Phone size={14} />
                Call Now
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-mk-navy' : 'text-white'}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-white/95 backdrop-blur-xl shadow-xl border-b border-blue-100 lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'bg-mk-blue text-white'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-mk-blue'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <a
                  href="tel:+917719005629"
                  className="flex items-center justify-center gap-2 bg-mk-blue text-white py-3 rounded-xl font-semibold"
                >
                  <Phone size={16} />
                  +91 77190 05629
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
