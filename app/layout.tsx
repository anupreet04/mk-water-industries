import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/layout/LoadingScreen';
import FloatingButtons from '@/components/layout/FloatingButtons';
import BackToTop from '@/components/layout/BackToTop';
import ScrollProgress from '@/components/layout/ScrollProgress';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://mkwaterindustries.com'),
  title: 'MK Water Industries | Premium Packaged Drinking Water – Nanded, Maharashtra',
  description:
    'MK Water Industries is a leading manufacturer of premium packaged drinking water in Nanded, Maharashtra. We supply 250ml, 500ml, 1L bottles and 20L jars with advanced RO+UV+UF purification technology. Bulk orders, wholesale supply and PAN India distribution.',
  keywords:
    'MK Water Industries, packaged drinking water, bottled water manufacturer, Nanded, Maharashtra, 20 litre water jar, bulk water supply, RO purified water, food grade water bottles, wholesale water',
  authors: [{ name: 'MK Water Industries' }],
  creator: 'MK Water Industries',
  publisher: 'MK Water Industries',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mkwaterindustries.com',
    siteName: 'MK Water Industries',
    title: 'MK Water Industries | Premium Packaged Drinking Water',
    description:
      'Delivering hygienic and premium quality packaged drinking water with advanced RO+UV+UF purification technology across India.',
    images: [
      {
        url: '/assets/images/logo/WhatsApp_Image_2026-07-31_at_19.54.21.jpeg',
        width: 1200,
        height: 630,
        alt: 'MK Water Industries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MK Water Industries | Premium Packaged Drinking Water',
    description: 'Premium quality packaged drinking water with advanced purification. Bulk orders, PAN India supply.',
    images: ['/assets/images/logo/WhatsApp_Image_2026-07-31_at_19.54.21.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/assets/images/logo/WhatsApp_Image_2026-07-31_at_19.54.21.jpeg',
    apple: '/assets/images/logo/WhatsApp_Image_2026-07-31_at_19.54.21.jpeg',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'MK Water Industries',
              description: 'Premium packaged drinking water manufacturer in Nanded, Maharashtra',
              url: 'https://mkwaterindustries.com',
              telephone: '+917719005629',
              email: 'mkindustries0013@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Dhillon Motors, Opp. Gramin Polytechnic College, Beside Gurudwara, Vishnupuri',
                addressLocality: 'Nanded',
                addressRegion: 'Maharashtra',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '19.0760',
                longitude: '77.3188',
              },
              openingHours: 'Mo-Sa 09:00-19:00',
              priceRange: '₹₹',
              image: '/assets/images/logo/WhatsApp_Image_2026-07-31_at_19.54.21.jpeg',
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <LoadingScreen />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <BackToTop />
      </body>
    </html>
  );
}
