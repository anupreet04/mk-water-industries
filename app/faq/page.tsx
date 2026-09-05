'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABanner from '@/components/home/CTABanner';

const faqs = [
  {
    q: 'Do you supply bulk orders?',
    a: 'Yes, absolutely! MK Water Industries specializes in bulk order fulfilment for businesses, institutions, events and retailers. We offer competitive pricing on large volume orders with priority processing and dedicated account management. Please contact us with your quantity requirements for a custom quote.',
  },
  {
    q: 'Do you provide home and office delivery?',
    a: 'Yes, we provide doorstep delivery to homes, offices, restaurants, hotels and commercial establishments in and around Nanded, Maharashtra. We also offer scheduled recurring deliveries so you never run out of pure water. Same-day delivery is available for select locations.',
  },
  {
    q: 'Are your bottles and jars food grade?',
    a: 'Absolutely. All our packaging — whether 250ml bottles, 500ml, 1L or 20L jars — is manufactured from virgin, food-grade PET plastic that meets BIS, FDA and FSSAI standards. Our packaging is 100% BPA-free and is produced in a hygienic, dust-free environment.',
  },
  {
    q: 'Do you offer custom branding or label printing on bottles?',
    a: 'Yes! We offer custom label printing and branding services on all bottle sizes (250ml, 500ml, 1L) as well as 20L water jars. This is perfect for corporate events, hotel branding, restaurant identity and promotional campaigns. Minimum order quantities apply. Contact us for pricing.',
  },
  {
    q: 'Which locations do you currently supply to?',
    a: 'We primarily supply across Nanded city and the surrounding districts of Nanded, Osmanabad, Latur and Hingoli in Maharashtra. For large institutional orders, we can arrange logistics across India. Please contact us to discuss supply arrangements for your location.',
  },
  {
    q: 'What purification technology do you use?',
    a: 'We use an advanced multi-stage purification system: Reverse Osmosis (RO) removes dissolved impurities, Ultraviolet (UV) treatment eliminates pathogens, Ultrafiltration (UF) removes suspended particles, and Ozonization provides final disinfection. This 4-stage purification ensures 99.9% purity in every bottle.',
  },
  {
    q: 'Do you offer OEM or private label manufacturing?',
    a: 'Yes, we offer complete OEM and private label manufacturing services. If you want to launch your own water brand without setting up a plant, we can manufacture, fill, label and package water products under your brand name. This includes custom bottle design, label printing and bulk packaging.',
  },
  {
    q: 'What is the shelf life of your packaged water?',
    a: 'Our packaged drinking water has a shelf life of 12 months from the date of manufacture when stored in a cool, dry place away from direct sunlight. Our Ozonization process ensures the water remains fresh and safe throughout this period. Always check the manufacturing date printed on the bottle.',
  },
  {
    q: 'How can I become a distributor or wholesale partner?',
    a: 'We welcome distribution and wholesale partnership inquiries. As an authorized distributor, you get exclusive pricing, territory support and a consistent supply schedule. Please contact us by phone, WhatsApp or email with details about your business and location, and our team will get back to you promptly.',
  },
  {
    q: 'Are your products tested for safety and quality?',
    a: 'Yes, every production batch undergoes comprehensive quality testing in our on-site laboratory. We test for pH level, TDS, turbidity, chloride, nitrates, total dissolved solids, and microbiological parameters including E. coli and coliform bacteria. Our products comply with BIS IS 14543 standards for packaged drinking water.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            <span className="inline-block badge-glass text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">FAQ</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5">
              Frequently Asked <span className="text-mk-sky">Questions</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">Find answers to the most common questions about our products, services and ordering process.</p>
          </motion.div>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <SectionHeader badge="FAQs" title="Got Questions?" titleHighlight="We Have Answers" subtitle="Everything you need to know about MK Water Industries." />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === i ? 'border-mk-blue shadow-card' : 'border-gray-100 shadow-sm'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle size={20} className={`shrink-0 mt-0.5 ${openIndex === i ? 'text-mk-blue' : 'text-gray-300'}`} />
                    <span className={`font-semibold text-base ${openIndex === i ? 'text-mk-blue' : 'text-mk-navy'}`}>
                      {faq.q}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={20} className={openIndex === i ? 'text-mk-blue' : 'text-gray-400'} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pl-14 text-gray-600 text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact prompt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center p-8 bg-mk-light-blue rounded-2xl"
          >
            <p className="text-mk-navy font-semibold mb-2">Still have questions?</p>
            <p className="text-gray-500 text-sm mb-4">We're happy to help. Reach out to us directly.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="tel:+917719005629" className="btn-primary text-sm py-2.5">Call +91 77190 05629</a>
              <a href="https://wa.me/917719005629" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-full border-2 border-mk-green text-mk-green font-semibold text-sm hover:bg-mk-green hover:text-white transition-colors">
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
