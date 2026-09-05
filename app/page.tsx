import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import AboutPreview from '@/components/home/AboutPreview';
import ProductsSection from '@/components/home/ProductsSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import QualitySection from '@/components/home/QualitySection';
import Testimonials from '@/components/home/Testimonials';
import CTABanner from '@/components/home/CTABanner';
import WaveDivider from '@/components/shared/WaveDivider';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <WaveDivider topColor="#ffffff" bottomColor="#EFF6FF" />
      <AboutPreview />
      <WaveDivider topColor="#EFF6FF" bottomColor="#ffffff" />
      <ProductsSection />
      <WaveDivider topColor="#ffffff" bottomColor="#002B5B" />
      <ServicesSection />
      <WaveDivider topColor="#002B5B" bottomColor="#ffffff" />
      <WhyChooseUs />
      <WaveDivider topColor="#ffffff" bottomColor="#EFF6FF" />
      <QualitySection />
      <WaveDivider topColor="#ffffff" bottomColor="#EFF6FF" />
      <Testimonials />
      <WaveDivider topColor="#EFF6FF" bottomColor="#002B5B" />
      <CTABanner />
    </>
  );
}
