import React from 'react';
import { Hero } from '../components/home/Hero';
import { TrustStrip } from '../components/home/TrustStrip';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedCarousel } from '../components/home/FeaturedCarousel';
import { Testimonials } from '../components/home/Testimonials';
import { SEO } from '../components/seo/SEO';
import { Product } from '../types';

interface HomePageProps {
  onQuickView?: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onQuickView }) => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://tella-store.vercel.app/#website",
        "url": "https://tella-store.vercel.app/",
        "name": "TELLA Store",
        "description": "Premium 100% Export Quality Boxers and Innerwear in Bangladesh",
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://tella-store.vercel.app/new-arrival?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "bn-BD"
      },
      {
        "@type": "Organization",
        "@id": "https://tella-store.vercel.app/#organization",
        "name": "TELLA",
        "url": "https://tella-store.vercel.app/",
        "logo": "https://tella-store.vercel.app/assets/tella1-Ctay2dwq.jpeg",
        "description": "Leading brand for premium export quality underwear, boxers and loungewear in Bangladesh.",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+8801700000000",
          "contactType": "Customer Support",
          "areaServed": "BD",
          "availableLanguage": ["Bengali", "English"]
        }
      },
      {
        "@type": "ClothingStore",
        "@id": "https://tella-store.vercel.app/#store",
        "name": "TELLA Bangladesh",
        "url": "https://tella-store.vercel.app/",
        "priceRange": "BDT 550 - BDT 1150",
        "currenciesAccepted": "BDT",
        "paymentAccepted": "Cash on Delivery, bKash, Nagad",
        "areaServed": "Bangladesh"
      }
    ]
  };

  return (
    <div id="homepage-root" className="space-y-0 animate-in fade-in duration-300">
      <SEO
        title="TELLA | 100% Exported Premium Boxers & Innerwear in Bangladesh"
        description="প্রিমিয়াম এক্সপোর্ট কোয়ালিটি Umbro বক্সার ও ইনারওয়্যার কিনুন সাশ্রয়ী মূল্যে। 100% Combed Cotton, সর্বোচ্চ আরাম ও ক্যাশ অন ডেলিভারি।"
        canonicalUrl="https://tella-store.vercel.app/"
        schema={homeSchema}
      />

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


