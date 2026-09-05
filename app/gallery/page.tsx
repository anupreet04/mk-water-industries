'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/home/CTABanner';
import { galleryImages, galleryCategories, type GalleryCategory } from '@/lib/gallery-data';

type FilterCategory = 'All' | GalleryCategory;
const filterCategories: FilterCategory[] = ['All', ...galleryCategories];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((g) => g.category === activeCategory);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + filtered.length) % filtered.length;
    });
  }, [filtered.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % filtered.length;
    });
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const activeItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

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
            <span className="inline-block badge-glass text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">Gallery</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5">
              Our Products &amp; <span className="text-mk-sky">Brand Gallery</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">A visual showcase of MK Water Industries products, packaging and brand identity.</p>
          </motion.div>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-mk-blue text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-mk-blue'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={`${item.id}-${item.src}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.05 }}
                  className="img-zoom-wrap group relative cursor-pointer rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover bg-gradient-to-br from-blue-50 to-mk-light-blue aspect-square"
                  onClick={() => setLightboxIndex(i)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-mk-navy/0 group-hover:bg-mk-navy/50 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="absolute top-2 left-2 text-xs bg-white/90 text-mk-navy font-semibold px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-mk-navy/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-sm">No photos in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors p-2"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X size={28} />
            </button>

            {filtered.length > 1 && (
              <button
                className="absolute left-2 sm:left-4 z-10 text-white hover:text-gray-300 transition-colors p-2"
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
                aria-label="Previous image"
              >
                <ChevronLeft size={36} />
              </button>
            )}

            {filtered.length > 1 && (
              <button
                className="absolute right-2 sm:right-4 z-10 text-white hover:text-gray-300 transition-colors p-2"
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                aria-label="Next image"
              >
                <ChevronRight size={36} />
              </button>
            )}

            <motion.div
              key={activeItem.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-50 to-mk-light-blue" style={{ height: '60vh' }}>
                <Image
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-white font-medium">{activeItem.title}</p>
                <p className="text-white/50 text-xs mt-1">{activeItem.category} • {lightboxIndex + 1} of {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTABanner />
    </div>
  );
}
