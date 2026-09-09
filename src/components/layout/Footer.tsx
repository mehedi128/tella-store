import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { X, Check } from 'lucide-react';

export const Footer: React.FC = () => {
    const { navigate } = useRouter();
    const [showStayUpdatedModal, setShowStayUpdatedModal] = useState(false);
    const [showEarnModal, setShowEarnModal] = useState(false);
    const [whatsappPhone, setWhatsappPhone] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleWhatsappSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (whatsappPhone.length >= 10) {
            setIsSubscribed(true);
            setTimeout(() => {
                setIsSubscribed(false);
                setShowStayUpdatedModal(false);
                setWhatsappPhone('');
            }, 2500);
        }
    };

    const handleWhatsAppDirect = () => {
        window.open('https://wa.me/8801752421224?text=Hi%20Tella!%20I%20want%20to%20know%20about%20the%20latest%20offers%20and%20restocks.', '_blank');
    };

    return (
        <footer id='main-footer' className='relative w-full border-t-2 border-black select-none'>
            {/* TOP YELLOW SECTION */}
            <div className='bg-[#FFC700] text-black border-b-2 border-black overflow-hidden relative'>
                <div className='w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-16'>
                    <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch'>
                        {/* LEFT 3 COLUMNS: Shop, About, Support */}
                        <div className='lg:col-span-6 grid grid-cols-3 gap-3 sm:gap-5 lg:pr-8'>
                            {/* Col 1: Shop */}
                            <div className='space-y-2'>
                                <h4 className='font-extrabold text-sm sm:text-base text-black tracking-tight'>Shop</h4>
                                <ul className='space-y-1 sm:space-y-1.5 text-xs sm:text-[13px] font-semibold text-black/90'>
                                    <li>
                                        <button onClick={() => navigate('/man')} className='hover:underline transition-all text-left font-medium'>
                                            Men
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => navigate('/woman')} className='hover:underline transition-all text-left font-medium'>
                                            Women
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Col 2: About */}
                            <div className='space-y-2'>
                                <h4 className='font-extrabold text-sm sm:text-base text-black tracking-tight'>About</h4>
                                <ul className='space-y-1 sm:space-y-1.5 text-xs sm:text-[13px] font-semibold text-black/90'>
                                    <li>
                                        <a href='#fabric-spotlight' className='hover:underline transition-all text-left font-medium block'>
                                            Our Story
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Col 3: Support */}
                            <div className='space-y-2'>
                                <h4 className='font-extrabold text-sm sm:text-base text-black tracking-tight'>Support</h4>
                                <ul className='space-y-1 sm:space-y-1.5 text-xs sm:text-[13px] font-semibold text-black/90'>
                                    <li>
                                        <button onClick={handleWhatsAppDirect} className='hover:underline transition-all text-left font-medium'>
                                            WhatsApp Us
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Headline, Green Stay Updated Button & White Line Art */}
                        <div className='lg:col-span-6 lg:border-l-2 lg:border-black lg:pl-10 xl:pl-14 flex flex-col sm:flex-row items-start sm:items-center justify-between relative pt-6 lg:pt-0'>
                            {/* Text & Button */}
                            <div className='space-y-6 max-w-lg z-10'>
                                <h3 className='font-display text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-black leading-tight tracking-tight'>
                                    <span className='block whitespace-nowrap'>Offers, New Arrivals,</span>
                                    <span className='block whitespace-nowrap'>Restocks and More.</span>
                                </h3>

                                <div className='flex flex-wrap items-center gap-3'>
                                    <a
                                        href='https://www.facebook.com/profile.php?id=61593605003661'
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='bg-[#1877F2] hover:bg-[#166fe5] text-white font-black text-base sm:text-lg px-7 py-3 rounded-lg border-2 border-black active:translate-x-[1px] active:translate-y-[1px] transition-all inline-flex items-center gap-2.5 cursor-pointer'
                                    >
                                        <span>Facebook</span>
                                        {/* Facebook SVG Icon */}
                                        <svg className='w-6 h-6 fill-current' viewBox='0 0 24 24'>
                                            <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                            {/* Exact Line Art Illustration of Waist / Butt with Sparkle */}
                            <div className='hidden sm:flex items-center justify-end h-full absolute right-0 bottom-0 top-0 pointer-events-none opacity-90 lg:opacity-100'>
                                <svg viewBox='0 0 200 240' fill='none' xmlns='http://www.w3.org/2000/svg' className='h-[210px] lg:h-[240px] w-auto'>
                                    {/* Right waist and hip contour */}
                                    <path d='M 170 0 C 160 40 120 70 120 105 C 120 135 180 165 170 240' stroke='white' strokeWidth='5' strokeLinecap='round' fill='none' />
                                    {/* Left waist, outer buttock, and thigh curve */}
                                    <path d='M 125 0 C 110 35 70 70 45 100 C 15 135 25 170 65 185 C 95 195 100 215 100 240' stroke='white' strokeWidth='5' strokeLinecap='round' fill='none' />
                                    {/* Inner butt cheek crease */}
                                    <path d='M 85 110 C 60 120 58 150 88 165 C 112 175 125 165 130 152' stroke='white' strokeWidth='5' strokeLinecap='round' fill='none' />
                                    {/* 4-point sparkle star */}
                                    <path d='M 108 120 C 108 132 118 132 122 135 C 118 138 108 138 108 150 C 108 138 98 138 94 135 C 98 132 108 132 108 120 Z' fill='white' />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM WARM CREAM BAR */}
            <div className='bg-[#FAF7F2] text-black py-8 px-6 sm:px-10 lg:px-14'>
                <div className='w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6'>
                    {/* Giant Lowercase Italic Tella Logo */}
                    <div className='flex items-center'>
                        <button
                            onClick={() => navigate('/')}
                            className='text-4xl sm:text-5xl lg:text-6xl font-black italic tracking-tighter text-black lowercase font-display hover:opacity-85 transition-opacity'
                        >
                            tella
                        </button>
                    </div>

                    {/* Right Side: Copyright */}
                    <div className='text-center sm:text-right space-y-1.5'>
                        <div className='text-xs sm:text-sm font-bold text-zinc-900'>© {new Date().getFullYear()} Tella Apparels Pvt. Ltd.</div>
                    </div>
                </div>
            </div>

            {/* FLOATING WHATSAPP BUTTON (Bottom-Right) */}
            <button
                onClick={handleWhatsAppDirect}
                className='fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full border-2 border-black flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer'
                aria-label='Chat on WhatsApp'
            >
                <svg className='w-7 h-7 fill-white' viewBox='0 0 24 24'>
                    <path d='M12.031 0C5.396 0 .029 5.367.029 12.002c0 2.118.552 4.186 1.602 6.007L0 24l6.168-1.617c1.758.959 3.744 1.464 5.863 1.464 6.635 0 12.002-5.367 12.002-12.002C24.033 5.367 18.666 0 12.031 0zm.002 21.848c-1.807 0-3.578-.486-5.122-1.402l-.367-.218-3.805.998 1.016-3.709-.24-.381c-1.008-1.604-1.54-3.468-1.54-5.385 0-5.385 4.382-9.767 9.767-9.767 5.385 0 9.767 4.382 9.767 9.767 0 5.385-4.382 9.697-9.476 9.697zm5.348-7.319c-.293-.146-1.733-.855-2.002-.953-.269-.098-.464-.146-.66.146-.195.293-.757.953-.928 1.149-.171.195-.342.22-.635.073-.293-.146-1.236-.456-2.355-1.453-.87-.776-1.458-1.734-1.629-2.027-.171-.293-.018-.451.129-.597.132-.132.293-.342.44-.513.146-.171.195-.293.293-.488.098-.195.049-.366-.024-.513-.073-.146-.66-1.587-.903-2.173-.238-.57-.48-.493-.66-.502-.171-.009-.366-.009-.561-.009-.195 0-.513.073-.781.366-.269.293-1.026 1.001-1.026 2.442s1.05 2.833 1.197 3.028c.146.195 2.066 3.155 5.006 4.423.699.302 1.245.483 1.671.618.702.223 1.341.191 1.846.116.563-.084 1.733-.708 1.977-1.392.244-.684.244-1.27.171-1.392-.073-.122-.269-.195-.562-.342z' />
                </svg>
            </button>

            {/* STAY UPDATED MODAL */}
            {showStayUpdatedModal && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4' onClick={() => setShowStayUpdatedModal(false)}>
                    <div className='bg-[#FFFBF2] w-full max-w-md rounded-3xl p-6 sm:p-8 border-2 border-black relative' onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowStayUpdatedModal(false)} className='absolute top-4 right-4 p-1.5 rounded-xl border-2 border-black bg-white hover:bg-[#FFDE6B] text-black'>
                            <X className='w-5 h-5 stroke-[2.5]' />
                        </button>

                        <div className='space-y-4 text-center'>
                            <div className='w-14 h-14 bg-[#00C06A] border-2 border-black rounded-2xl flex items-center justify-center mx-auto text-white'>
                                <svg className='w-8 h-8 fill-current' viewBox='0 0 24 24'>
                                    <path d='M12.031 0C5.396 0 .029 5.367.029 12.002c0 2.118.552 4.186 1.602 6.007L0 24l6.168-1.617c1.758.959 3.744 1.464 5.863 1.464 6.635 0 12.002-5.367 12.002-12.002C24.033 5.367 18.666 0 12.031 0zm.002 21.848c-1.807 0-3.578-.486-5.122-1.402l-.367-.218-3.805.998 1.016-3.709-.24-.381c-1.008-1.604-1.54-3.468-1.54-5.385 0-5.385 4.382-9.767 9.767-9.767 5.385 0 9.767 4.382 9.767 9.767 0 5.385-4.382 9.697-9.476 9.697zm5.348-7.319c-.293-.146-1.733-.855-2.002-.953-.269-.098-.464-.146-.66.146-.195.293-.757.953-.928 1.149-.171.195-.342.22-.635.073-.293-.146-1.236-.456-2.355-1.453-.87-.776-1.458-1.734-1.629-2.027-.171-.293-.018-.451.129-.597.132-.132.293-.342.44-.513.146-.171.195-.293.293-.488.098-.195.049-.366-.024-.513-.073-.146-.66-1.587-.903-2.173-.238-.57-.48-.493-.66-.502-.171-.009-.366-.009-.561-.009-.195 0-.513.073-.781.366-.269.293-1.026 1.001-1.026 2.442s1.05 2.833 1.197 3.028c.146.195 2.066 3.155 5.006 4.423.699.302 1.245.483 1.671.618.702.223 1.341.191 1.846.116.563-.084 1.733-.708 1.977-1.392.244-.684.244-1.27.171-1.392-.073-.122-.269-.195-.562-.342z' />
                                </svg>
                            </div>

                            <div>
                                <h4 className='font-display text-xl sm:text-2xl font-black text-black uppercase'>Stay in the Loop!</h4>
                                <p className='text-xs sm:text-sm text-zinc-700 font-bold mt-1'>Get WhatsApp updates on flash discounts, restocks, and exclusive prints.</p>
                            </div>

                            {!isSubscribed ? (
                                <form onSubmit={handleWhatsappSubmit} className='space-y-3 pt-2'>
                                    <div className='flex rounded-xl border-2 border-black overflow-hidden bg-white '>
                                        <span className='bg-[#FFDE6B] px-3 py-2.5 text-xs font-black text-black border-r-2 border-black flex items-center'>+91</span>
                                        <input
                                            type='tel'
                                            placeholder='Enter WhatsApp Number'
                                            value={whatsappPhone}
                                            onChange={(e) => setWhatsappPhone(e.target.value)}
                                            required
                                            className='w-full px-3 py-2.5 text-sm font-bold text-black focus:outline-none'
                                        />
                                    </div>

                                    <button
                                        type='submit'
                                        className='w-full bg-[#00C06A] hover:bg-[#00ab5e] text-white font-black text-sm uppercase py-3.5 rounded-xl border-2 border-black active:translate-x-[1px] active:translate-y-[1px] transition-all'
                                    >
                                        Subscribe for Updates
                                    </button>
                                </form>
                            ) : (
                                <div className='bg-[#FFDE6B] border-2 border-black rounded-2xl p-4 text-black font-black text-sm flex items-center justify-center gap-2 '>
                                    <Check className='w-5 h-5 stroke-[3]' />
                                    <span>You're subscribed! Welcome to Tella Squad.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* EARN ৳200 / FAQ / POLICY INFO MODAL */}
            {showEarnModal && (
                <div className='fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4' onClick={() => setShowEarnModal(false)}>
                    <div className='bg-[#FFFBF2] w-full max-w-lg rounded-3xl p-6 sm:p-8 border-2 border-black relative max-h-[85vh] overflow-y-auto' onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowEarnModal(false)} className='absolute top-4 right-4 p-1.5 rounded-xl border-2 border-black bg-white hover:bg-[#FFDE6B] text-black'>
                            <X className='w-5 h-5 stroke-[2.5]' />
                        </button>

                        <div className='space-y-4'>
                            <div className='inline-block bg-[#FFDE6B] text-black border-2 border-black px-3 py-1 rounded-full text-xs font-black uppercase '>Tella Rewards & Support</div>

                            <h3 className='font-display text-2xl font-black text-black uppercase'>Earn ৳200 & Customer Policies</h3>

                            <div className='space-y-3 text-xs sm:text-sm text-zinc-800 font-bold leading-relaxed bg-white p-4 rounded-2xl border-2 border-black '>
                                <p>
                                    <strong>🎉 Refer a Friend:</strong> Share your unique referral code with buddies. When they place their first order, they get ৳200 off, and you get ৳200 Tella Coins
                                    in your wallet!
                                </p>
                                <p>
                                    <strong>🔄 14-Day Free Exchange:</strong> Size didn't fit? We offer free doorstep size pickups and exchanges on unworn products with tags attached.
                                </p>
                                <p>
                                    <strong>📦 Express Dispatch:</strong> All orders are packed in 100% plastic-free eco boxes and shipped within 24 hours.
                                </p>
                            </div>

                            <button
                                type='button'
                                onClick={() => {
                                    setShowEarnModal(false);
                                    navigate('/new-arrival');
                                }}
                                className='w-full btn-bold-primary py-3.5 rounded-xl text-xs uppercase'
                            >
                                Shop Now & Use Points
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
};
