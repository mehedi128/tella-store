import React from 'react';
import { Hero } from '../components/home/Hero';
import { TrustStrip } from '../components/home/TrustStrip';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedCarousel } from '../components/home/FeaturedCarousel';
import { Testimonials } from '../components/home/Testimonials';
import { Product } from '../types';

interface HomePageProps {
  onQuickView?: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onQuickView }) => {
  return (
    <div id="homepage-root" className="space-y-0 animate-in fade-in duration-300">
      {/* 1. Hero Carousel */}
      <Hero />

      {/* 2. Trust Strip */}
      <TrustStrip />

      {/* 3. Shop By Category */}
      <CategoryGrid />

      {/* 4. Bestsellers / Featured Products */}
      <FeaturedCarousel onQuickView={onQuickView} />

      {/* 5. Testimonials & Community */}
      <Testimonials />
    </div>
  );
};

