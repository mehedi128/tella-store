import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
  noindex?: boolean;
  productData?: {
    price?: number;
    currency?: string;
    availability?: string;
    brand?: string;
  };
  schema?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'TELLA | 100% Exported Premium Boxers & Innerwear in Bangladesh';
const DEFAULT_DESCRIPTION = 'প্রিমিয়াম এক্সপোর্ট কোয়ালিটি Umbro বক্সার ও ইনারওয়্যার কিনুন সাশ্রয়ী মূল্যে। 100% Combed Cotton, সর্বোচ্চ আরাম, ফ্রি মুভমেন্ট ও দ্রুত ক্যাশ অন ডেলিভারি।';
const DEFAULT_KEYWORDS = 'umbro boxer, men underwear bangladesh, export boxer bangladesh, premium innerwear, modal underwear, cotton boxers, tella store, বক্সার, আন্ডারওয়্যার';
const SITE_URL = 'https://tella-store.vercel.app';
const DEFAULT_OG_IMAGE = 'https://tella-store.vercel.app/assets/tella1-Ctay2dwq.jpeg';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  noindex = false,
  productData,
  schema,
}) => {
  const pageTitle = title ? (title.includes('TELLA') ? title : `${title} | TELLA`) : DEFAULT_TITLE;
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const pageKeywords = keywords || DEFAULT_KEYWORDS;
  const pageImage = ogImage || DEFAULT_OG_IMAGE;
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : SITE_URL);

  useEffect(() => {
    // 1. Set Title
    document.title = pageTitle;

    // Helper to set or create meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set link tags (e.g. canonical)
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', pageDescription);
    setMetaTag('name', 'keywords', pageKeywords);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setMetaTag('name', 'author', 'TELLA Brand Bangladesh');
    setLinkTag('canonical', currentUrl);

    // 3. Open Graph (Facebook, WhatsApp, LinkedIn)
    setMetaTag('property', 'og:site_name', 'TELLA Store');
    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('property', 'og:description', pageDescription);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', pageImage);
    setMetaTag('property', 'og:locale', 'bn_BD');

    if (productData) {
      if (productData.price) setMetaTag('property', 'product:price:amount', productData.price.toString());
      if (productData.currency) setMetaTag('property', 'product:price:currency', productData.currency);
      if (productData.availability) setMetaTag('property', 'product:availability', productData.availability);
      if (productData.brand) setMetaTag('property', 'product:brand', productData.brand);
    }

    // 4. Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', pageTitle);
    setMetaTag('name', 'twitter:description', pageDescription);
    setMetaTag('name', 'twitter:image', pageImage);

    // 5. JSON-LD Structured Data Schema
    const existingScript = document.getElementById('seo-json-ld');
    if (existingScript) {
      existingScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = 'seo-json-ld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      // Clean up injected script if component unmounts
      const script = document.getElementById('seo-json-ld');
      if (script) script.remove();
    };
  }, [pageTitle, pageDescription, pageKeywords, currentUrl, pageImage, ogType, noindex, productData, schema]);

  return null;
};
