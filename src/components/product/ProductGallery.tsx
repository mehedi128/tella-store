import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const prevImage = () => {
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div id='product-gallery' className='space-y-4'>
            {/* Main Image Stage */}
            <div className='relative w-full rounded-3xl overflow-hidden bg-white border-2 border-black group'>
                <img
                    src={images[activeIndex] || images[0]}
                    alt={`${productName} view ${activeIndex + 1}`}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                />

                {/* Carousel Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            type='button'
                            onClick={prevImage}
                            className='absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center text-black hover:bg-[#FFDE6B] transition-all'
                            aria-label='Previous image'
                        >
                            <ChevronLeft className='w-5 h-5 stroke-[2.5]' />
                        </button>
                        <button
                            type='button'
                            onClick={nextImage}
                            className='absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center text-black hover:bg-[#FFDE6B] transition-all'
                            aria-label='Next image'
                        >
                            <ChevronRight className='w-5 h-5 stroke-[2.5]' />
                        </button>
                    </>
                )}

                {/* Mobile Swipe Indicators */}
                {images.length > 1 && (
                    <div className='absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-10'>
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                type='button'
                                onClick={() => setActiveIndex(idx)}
                                className={`h-2.5 rounded-full border border-black transition-all ${activeIndex === idx ? 'w-8 bg-[#FF5A1F]' : 'w-2.5 bg-white'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Thumbnails strip */}
            {images.length > 1 && (
                <div className='flex gap-3 overflow-x-auto pb-2 hide-scrollbar'>
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            type='button'
                            onClick={() => setActiveIndex(idx)}
                            className={`w-20 h-24 rounded-2xl overflow-hidden bg-white shrink-0 border-2 border-black transition-all ${
                                activeIndex === idx ? 'border-black scale-95 ring-2 ring-[#FF5A1F]' : 'opacity-70 hover:opacity-100 hover:scale-100'
                            }`}
                        >
                            <img src={img} alt={`${productName} thumbnail ${idx + 1}`} className='w-full h-full object-cover' />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
