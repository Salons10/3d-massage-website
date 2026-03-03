import React from 'react';
import { Link } from 'react-router-dom';
import ShapeDivider from './ShapeDivider';
import { Button5 } from './components/ui/button-5';

const Hero = () => {
    return (
        <section className="relative w-full min-h-[100vh] flex items-end justify-center pt-32 pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-1000 scale-105"
                    style={{ backgroundImage: "url('/Whisk_f6c5a7f3066ca2797f74ed53f546a7badr_upscayl_3x_ultramix-balanced-4x.png')" }}
                ></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20"></div>
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-20 w-full mb-12 text-center flex flex-col items-center">
                <div className="max-w-4xl flex flex-col items-center">
                    <p className="text-base lg:text-lg text-white/90 mb-4 max-w-2xl font-medium leading-relaxed drop-shadow-sm mx-auto">
                        We don't believe in one-size-fits-all treatments. Every patient receives targeted, thoughtful care — built on their specific biomechanical needs and clinical goals.
                    </p>
                    <h1 className="text-6xl md:text-8xl lg:text-[130px] leading-[0.9] text-white mb-10 tracking-tighter font-serif">
                        Targeted. <br className="md:hidden" /><span className="italic font-serif">Relief.</span>
                    </h1>

                    <div className="w-full max-w-5xl">
                        <Button5
                            text="Book Appointment"
                            asLink={true}
                            to="/booking"
                        />
                    </div>
                </div>
            </div>

            {/* SEAMLESS SHAPE DIVIDER */}
            <div className="absolute bottom-[-2px] left-0 w-full z-20 leading-[0]">
                <ShapeDivider
                    position="bottom"
                    color="#F7F5F0"
                    className="rotate-180"
                />
            </div>
        </section>
    );
};

export default Hero;