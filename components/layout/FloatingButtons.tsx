'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from '@/components/shared/WhatsAppIcon';
import { SITE_CONFIG, telLink, whatsappLink } from '@/lib/config';

const actions = [
  {
    label: 'Get Directions',
    href: SITE_CONFIG.maps.directionsUrl,
    icon: MapPin,
    className: 'bg-gradient-to-br from-amber-500 to-orange-600',
    delay: 2.5,
    external: true,
  },
  {
    label: 'Chat with us on WhatsApp',
    href: whatsappLink(),
    icon: WhatsAppIcon,
    className: 'bg-gradient-to-br from-[#25D366] to-[#128C7E]',
    delay: 2.7,
    external: true,
  },
  {
    label: 'Call us',
    href: telLink(),
    icon: Phone,
    className: 'bg-gradient-to-br from-[#007BFF] to-[#0056b3]',
    delay: 2.9,
    external: false,
  },
];

export default function FloatingButtons() {
  return (
    <div
      className="fixed right-4 z-50 flex flex-col gap-3 sm:right-5"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
    >
      {actions.map(({ label, href, icon: Icon, className, delay, external }) => (
        <motion.a
          key={label}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          title={label}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`group flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-shadow hover:shadow-2xl sm:h-14 sm:w-14 ${className}`}
          aria-label={label}
        >
          <Icon size={label === 'Chat with us on WhatsApp' ? 25 : 22} />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-mk-navy px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
            {label}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
