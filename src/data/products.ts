import { Product, Testimonial } from '../types';
import umbro3PackComboImg from '../assets/images/umbro_3pack_combo_1787243931364.jpg';
// import womensRibbedBoxerBriefsImg from '../assets/images/womens_ribbed_boxer_briefs_1787245544494.jpg';
import umbro5PackHeroImg from '../assets/images/boxer/tella1.jpeg';

// Product images

import umbroImg1 from '../assets/images/boxer/tella1.jpeg';
import umbroImg2 from '../assets/images/boxer/tella2.jpeg';
import umbroImg3 from '../assets/images/boxer/tella3.jpeg';
import umbroImg4 from '../assets/images/boxer/tella4.png';
import umbroImg5 from '../assets/images/boxer/tella5.jpeg';
import umbroImg6 from '../assets/images/boxer/tella6.jpeg';
import umbroImg7 from '../assets/images/boxer/tella7.jpeg';

// Product combo images
import umbroImgCombo1 from '../assets/images/boxer/tella-combo1.jpg';
import umbroImgCombo2 from '../assets/images/boxer/tella-combo2.jpg';

export const PRODUCTS: Product[] = [
    // --- 1. MEN'S BESTSELLER ---
    {
        id: 'prod-m-und-01',
        slug: 'midnight-jungle-modal-boxer-brief',
        name: '100% Exported Umbro Boxer',
        category: 'man',
        subcategory: 'underwear',
        productType: 'Boxers',
        price: 550,
        mrp: 700,
        images: [umbroImg1, umbroImg2, umbroImg3, umbroImg4, umbroImg5, umbroImg6, umbroImg7],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
        colors: ['#1E293B', '#64748B', '#DC2626', '#2563EB', '#F8FAFC'],
        isNew: true,
        badge: 'Bestseller',
        printName: 'Umbro Export Edition',
        description: 'অফিস হোক বা বাসা যেকোনো জায়গায় দেবে সেরা কমফোর্ট। স্ট্রেচেবল ফিটের কারণে সারাদিন ফ্রি মুভমেন্ট পাবেন। নরম ও ত্বক-বান্ধব ফ্যাব্রিক দিয়ে তৈরি এই বক্সার গরমে রাখবে আপনাকে ঠাণ্ডা ও ফ্রেশ।',
        createdAt: '2026-08-10T00:00:00.000Z',
        rating: 4.9,
        reviewsCount: 382,
        fabricDetails: '95% Cotton আর 5% Elastane — সফট আর ফ্লেক্সিবল ফেব্রিক',
        features: ['ঘাম শোষণ করে', 'ব্যাকটেরিয়া প্রতিরোধী', 'নরম ও ত্বক-বান্ধব ফ্যাব্রিক'],
        inStock: true,
        bgPastel: '#E6F7F2',
    },
    // --- 2. 5-PACK BOX COMBO ---
    {
        id: 'prod-m-und-05',
        slug: '100-percent-exported-umbro-boxer-1box-5-pic',
        name: '100% Exported Umbro Boxer (1box-5 pic)',
        category: 'man',
        subcategory: 'underwear',
        productType: 'Boxers',
        price: 899,
        mrp: 1150,
        images: [umbroImg7, umbroImgCombo1, umbroImgCombo2, umbroImg2, umbroImg4, umbroImg5, umbroImg6],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
        colors: ['#DC2626', '#64748B', '#2563EB', '#1E293B', '#F8FAFC'],
        isNew: true,
        badge: 'Box Pack (5 Pcs)',
        printName: 'Umbro 5-Pack Premium Box Combo',
        description:
            '১ বক্সে পাবেন মোট ৫টি প্রিমিয়াম এক্সপোর্ট কোয়ালিটি Umbro বক্সার। অফিস হোক বা বাসা যেকোনো জায়গায় দেবে সেরা কমফোর্ট। স্ট্রেচেবল ফিটের কারণে সারাদিন ফ্রি মুভমেন্ট পাবেন। নরম ও ত্বক-বান্ধব ফ্যাব্রিক দিয়ে তৈরি এই বক্সার গরমে রাখবে আপনাকে ঠাণ্ডা ও ফ্রেশ।',
        createdAt: '2026-08-20T00:00:00.000Z',
        rating: 4.9,
        reviewsCount: 145,
        fabricDetails: '95% Ultra-soft Combed Cotton, 5% Elastane — এক্সপোর্ট প্রিমিয়াম ফ্যাব্রিক',
        features: ['১ বক্সে ৫ পিস প্রিমিয়াম কালার কম্বো', 'ঘাম শোষণ করে ও ব্যাক্টেরিয়া প্রতিরোধী', 'নরম ও দীর্ঘস্থায়ী কোয়ালিটি ইলাস্টিক ব্যান্ড'],
        inStock: true,
        bgPastel: '#FFF3EA',
    },
    // --- 3. 5-PACK BOX COMBO (750 TK EDITION) ---
    {
        id: 'prod-m-und-06',
        slug: '100-percent-exported-umbro-boxer-1box-5-pic-750',
        name: '100% Exported Umbro Boxer (1box-5 pic)',
        category: 'man',
        subcategory: 'underwear',
        productType: 'Boxers',
        price: 750,
        mrp: 950,
        images: [umbroImg7, umbroImgCombo1, umbroImgCombo2, umbroImg2, umbroImg4, umbroImg5, umbroImg6],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
        colors: ['#DC2626', '#64748B', '#2563EB', '#1E293B', '#F8FAFC'],
        isNew: true,
        badge: 'Box Pack (5 Pcs)',
        printName: 'Umbro 5-Pack Box Combo',
        description:
            '১ বক্সে পাবেন মোট ৫টি প্রিমিয়াম এক্সপোর্ট কোয়ালিটি Umbro বক্সার। অফিস হোক বা বাসা যেকোনো জায়গায় দেবে সেরা কমফোর্ট। স্ট্রেচেবল ফিটের কারণে সারাদিন ফ্রি মুভমেন্ট পাবেন। নরম ও ত্বক-বান্ধব ফ্যাব্রিক দিয়ে তৈরি এই বক্সার গরমে রাখবে আপনাকে ঠাণ্ডা ও ফ্রেশ।',
        createdAt: '2026-08-25T00:00:00.000Z',
        rating: 4.9,
        reviewsCount: 145,
        fabricDetails: '95% Ultra-soft Combed Cotton, 5% Elastane — এক্সপোর্ট প্রিমিয়াম ফ্যাব্রিক',
        features: ['১ বক্সে ৫ পিস প্রিমিয়াম কালার কম্বো', 'ঘাম শোষণ করে ও ব্যাক্টেরিয়া প্রতিরোধী', 'নরম ও দীর্ঘস্থায়ী কোয়ালিটি ইলাস্টিক ব্যান্ড'],
        inStock: true,
        bgPastel: '#FFF3EA',
    },
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 't-1',
        name: 'Rohan Sharma',
        verified: true,
        quote: 'Literally threw out all my old underwear after trying Tella once. The modal fabric feels weightless and the prints make my morning.',
        rating: 5,
        productName: '100% Exported Umbro Boxer',
        productSlug: 'midnight-jungle-modal-boxer-brief',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        location: 'Mumbai',
    },
    {
        id: 't-2',
        name: 'Ananya Verma',
        verified: true,
        quote: 'The bikini briefs are unmatched for zero-panty-line comfort under workout leggings. Plus, no chafing ever!',
        rating: 5,
        productName: 'Flamingo Party Bikini Brief',
        productSlug: 'flamingo-party-bikini-brief',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        location: 'Bengaluru',
    },
    {
        id: 't-3',
        name: 'Kabir Mehta',
        verified: true,
        quote: 'Saw them on Shark Tank and had to try. Truly 3x softer than regular cotton and super comfortable for all-day wear.',
        rating: 5,
        productName: '100% Exported Umbro Boxer',
        productSlug: 'midnight-jungle-modal-boxer-brief',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
        location: 'Delhi NCR',
    },
];

export const HERO_SLIDES = [
    {
        id: 'slide-1',
        tag: 'Shark Tank India Sensation',
        heading: 'Softest. Funkiest. Period.',
        subtitle: 'Made with 95% premium cotton and 5% elastane for a soft, comfortable, and flexible fit.',
        ctaText: 'Shop New Arrivals',
        ctaLink: '/new-arrival',
        secondaryCtaText: 'Shop Men',
        secondaryCtaLink: '/man',
        image: umbro5PackHeroImg,
        accentColor: '#FF4800',
        bgColor: '#FFF3EA',
    },
    {
        id: 'slide-2',
        tag: "Women's Cloud Collection",
        heading: 'Zero Wires. Zero Digging. 100% Freedom.',
        subtitle: 'Featherlight bikini briefs & butter-soft modal wear that move like a second skin.',
        ctaText: 'Explore Women',
        ctaLink: '/woman',
        secondaryCtaText: 'Shop Underwear',
        secondaryCtaLink: '/woman/underwear',
        badge: 'BUY 3 GET 1 FREE',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85',
        accentColor: '#EC4899',
        bgColor: '#FCE7F3',
    },
    {
        id: 'slide-3',
        tag: 'Limited Edition Drop',
        heading: 'Lounge Like A Legend.',
        subtitle: 'Signature modal innerwear designed for endless comfort from bedroom to daily adventures.',
        ctaText: 'Shop Now',
        ctaLink: '/man/underwear',
        secondaryCtaText: 'All Bestsellers',
        secondaryCtaLink: '/man',
        badge: 'NEW PRINTS LIVE',
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=85',
        accentColor: '#2563EB',
        bgColor: '#EFF6FF',
    },
];

export const TRUST_STATS = [
    {
        stat: '300K+',
        label: 'Happy & Funky Customers',
        sublabel: 'Across 450+ cities',
    },
    {
        stat: '5,000+',
        label: '5-Star Verified Reviews',
        sublabel: '4.9/5 overall comfort score',
    },
    {
        stat: '14-Day',
        label: 'Guaranteed Fit & Exchange',
        sublabel: 'No questions asked policy',
    },
    {
        stat: '3X Softer',
        label: 'Austrian Beechwood Modal',
        sublabel: 'Eco-conscious & carbon neutral',
    },
];
