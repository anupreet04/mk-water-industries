export const SITE_CONFIG = {
  company: {
    name: 'MK Water Industries',
    tagline: 'Pure Water. Pure Life. Better Future.',
    established: '2025',
    location: 'Nanded, Maharashtra',
  },
  contact: {
    phone: '+917719005629',
    phoneDisplay: '+91 77190 05629',
    whatsapp: '917719005629',
    whatsappDisplay: '+91 77190 05629',
    email: 'mkindustries0013@gmail.com',
    address: {
      line1: 'Dhillon Motors, Opp. Gramin Polytechnic College,',
      line2: 'Beside Gurudwara, Vishnupuri,',
      city: 'Nanded',
      state: 'Maharashtra',
      country: 'India',
    },
    hours: 'Mon–Sat: 9 AM – 7 PM',
    availability: 'Available 24×7',
  },
  maps: {
    placeUrl: 'https://maps.app.goo.gl/1tb6wr7gEoYJnAiv5',
    directionsUrl: 'https://maps.app.goo.gl/1tb6wr7gEoYJnAiv5',
    embedUrl: 'https://maps.app.goo.gl/1tb6wr7gEoYJnAiv5',
  },
  social: {
    facebook: '#',
    instagram: '#',
    twitter: '#',
    youtube: '#',
  },
} as const;

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${SITE_CONFIG.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(): string {
  return `tel:${SITE_CONFIG.contact.phone}`;
}

export function mailtoLink(subject?: string): string {
  const base = `mailto:${SITE_CONFIG.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}
