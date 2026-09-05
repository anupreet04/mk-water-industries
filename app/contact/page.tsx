'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Loader as Loader2 } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';
import { SITE_CONFIG, telLink, whatsappLink, mailtoLink } from '@/lib/config';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Dhillon Motors, Opp. Gramin Polytechnic College, Beside Gurudwara, Vishnupuri, Nanded, Maharashtra', href: SITE_CONFIG.maps.directionsUrl },
  { icon: Phone, label: 'Phone', value: SITE_CONFIG.contact.phoneDisplay, href: telLink() },
  { icon: WhatsAppIcon, label: 'WhatsApp', value: SITE_CONFIG.contact.whatsappDisplay, href: whatsappLink() },
  { icon: Mail, label: 'Email', value: SITE_CONFIG.contact.email, href: mailtoLink() },
  { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9 AM – 7 PM | Available 24×7', href: null },
];

const products = ['250 ml Bottle', '500 ml Bottle', '1 Litre Bottle', '20 Litre Water Jar', 'Bulk/Wholesale', 'Custom Branding', 'OEM Manufacturing'];

interface FormData {
  name: string; phone: string; email: string; company: string;
  city: string; state: string; product: string; quantity: string; message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', company: '', city: '', state: '', product: '', quantity: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');

  const validatePhone = (phone: string) => /^\+?[\d\s\-()]{10,15}$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  const validateEmail = (email: string) => email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!validatePhone(form.phone)) e.phone = 'Enter a valid phone number (at least 10 digits)';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.message.trim()) e.message = 'Message is required';
    if (!validateEmail(form.email)) e.email = 'Enter a valid email address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    setApiError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'We could not submit your inquiry right now. Please try again or contact us directly.');
      }
      setStatus('success');
      setForm({ name: '', phone: '', email: '', company: '', city: '', state: '', product: '', quantity: '', message: '' });
    } catch (err) {
      setStatus('error');
      setApiError(err instanceof Error ? err.message : 'We could not submit your inquiry right now. Please try again or contact us directly.');
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl border bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-mk-blue/30 transition-all placeholder:text-gray-400';
  const getInputClass = (field: string) => `${inputClass} ${errors[field] ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-mk-blue'}`;

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
            <span className="inline-block badge-glass text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">Contact Us</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5">
              Get In <span className="text-mk-sky">Touch</span>
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">Ready to order pure water or have a business enquiry? We're here to help 24×7.</p>
          </motion.div>
        </div>
        <svg viewBox="0 0 1440 80" fill="none" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: '80px' }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </section>

      {/* Contact section */}
      <section className="py-20 bg-mk-light-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left: contact info */}
            <div className="lg:col-span-2 space-y-5">
              <SectionHeader badge="Contact Info" title="We're Here" titleHighlight="For You" centered={false} />

              <div className="mt-4 space-y-4">
                {contactInfo.map(({ icon: Icon, label, value, href }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-4 bg-white rounded-2xl shadow-card"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-mk-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-mk-navy font-medium text-sm hover:text-mk-blue transition-colors leading-relaxed">
                          {value}
                        </a>
                      ) : (
                        <p className="text-mk-navy font-medium text-sm leading-relaxed">{value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick action buttons */}
              <div className="flex gap-3 pt-2">
                <a href={telLink()} className="flex-1 flex items-center justify-center gap-2 bg-mk-blue text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#0066dd] transition-colors">
                  <Phone size={16} /> Call Now
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors">
                  <WhatsAppIcon size={16} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-card p-6 sm:p-8">
                {status === 'success' ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-mk-green" />
                    </div>
                    <h3 className="text-2xl font-bold text-mk-navy mb-2">Inquiry Submitted!</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">Thank you! Your inquiry has been submitted successfully. MK Water Industries will contact you shortly.</p>
                    <button onClick={() => setStatus('idle')} className="btn-primary">Send Another Inquiry</button>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-mk-navy mb-6">Send us an Inquiry</h3>

                    {status === 'error' && (
                      <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                        <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-red-700">{apiError || 'Something went wrong.'}</p>
                          <p className="text-xs text-red-600 mt-0.5">Please try again or contact us directly on WhatsApp.</p>
                          <a href={whatsappLink('Hi, I tried submitting an inquiry on your website but it failed. Please help me.')} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-700">
                            <WhatsAppIcon size={14} /> Contact on WhatsApp
                          </a>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Full Name *</label>
                          <input required name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className={getInputClass('name')} />
                          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Phone *</label>
                          <input required name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className={getInputClass('phone')} />
                          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Email</label>
                          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={getInputClass('email')} />
                          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Company / Organization</label>
                          <input name="company" value={form.company} onChange={handleChange} placeholder="Company name" className={getInputClass('company')} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">City *</label>
                          <input required name="city" value={form.city} onChange={handleChange} placeholder="Your city" className={getInputClass('city')} />
                          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">State</label>
                          <input name="state" value={form.state} onChange={handleChange} placeholder="State" className={getInputClass('state')} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Product Interested In</label>
                          <select name="product" value={form.product} onChange={handleChange} className={getInputClass('product')}>
                            <option value="">Select product</option>
                            {products.map((p) => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Quantity Required</label>
                          <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="e.g. 100 cartons" className={getInputClass('quantity')} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Message *</label>
                        <textarea required name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us about your requirements..." className={`${getInputClass('message')} resize-none`} />
                        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                      </div>
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === 'submitting' ? (
                          <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" />Submitting inquiry...</span>
                        ) : (
                          <span className="flex items-center gap-2"><Send size={16} />Send Inquiry</span>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-mk-navy">Find Us on the Map</h2>
            <p className="text-gray-500 text-sm mt-1">Dhillon Motors, Vishnupuri, Nanded, Maharashtra</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <iframe
              src={SITE_CONFIG.maps.embedUrl}
              width="100%"
              height="420"
              loading="lazy"
              title="MK Water Industries - Nanded Location"
              className="w-full"
            />
          </div>
          <div className="mt-4 text-center">
            <a href={SITE_CONFIG.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-mk-blue font-semibold text-sm hover:underline">
              <MapPin size={14} /> Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
