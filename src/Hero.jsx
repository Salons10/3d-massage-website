import React from 'react';
import ShapeDivider from './ShapeDivider';
import { Button5 } from './components/ui/button-5';
import { WIX_BOOKING_URL } from './lib/wixClient';

const Hero = () => {
    return (
        <section className="relative w-full min-h-[100vh] flex items-end justify-center pt-32 pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-1000 scale-105"
                    style={{ backgroundImage: "url('/New_Hero_image.png')" }}
                ></div>
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20 w-full mb-12 text-center flex flex-col items-center">
                <div className="max-w-6xl w-full flex flex-col items-center">
                    <p className="hero-lead text-base lg:text-lg text-white/90 mb-4 max-w-2xl font-medium leading-relaxed drop-shadow-sm mx-auto">
                        No generic sessions. At 3D Massage in Katy, TX, every treatment is built around your specific pain, your body, and your recovery goals, ensuring you actually feel the difference.
                    </p>

                    {/* 1. Added 'flex flex-row justify-center items-center gap-3 md:gap-5' to lock them on one line.
                        2. Scaled the max text size down to 110px so it physically fits inside the container.
                        3. Added 'w-full' to ensure the heading spans the container.
                    */}
                    <h1 className="hero-title flex flex-row justify-center items-center gap-3 md:gap-5 w-full text-5xl md:text-7xl lg:text-[90px] xl:text-[110px] leading-[0.9] mb-10 tracking-tighter whitespace-nowrap">
                        <span className="text-white">Targeted.</span>
                        <span className="text-[#94B4C1]">Relief.</span>
                    </h1>

                    <div className="w-full max-w-5xl">
                        <Button5
                            text="Book Appointment"
                            href={WIX_BOOKING_URL}
                        />
                    </div>
                </div>
            </div>

            {/* SEAMLESS SHAPE DIVIDER */}
            <div className="absolute bottom-[-2px] left-0 w-full z-20 leading-[0]">
                <ShapeDivider
                    position="bottom"
                    color="#FFFFFF"
                    className="rotate-180"
                />
            </div>
        </section>
    );
};

export default Hero;