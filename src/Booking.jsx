import React from 'react';
import { Button5 } from './components/ui/button-5';
import { WIX_BOOKING_URL } from './lib/wixClient';

const Booking = () => {
    return (
        <section className="py-24 px-6 lg:px-20 bg-background-light dark:bg-background-dark/50 relative overflow-hidden">
            {/* Background design elements to match the clinical premium vibe */}
            <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-forest-green/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-[1440px] mx-auto bg-charcoal dark:bg-slate-900 rounded-[2rem] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl border border-white/10 dark:border-white/5">
                {/* Internal container background effects */}
                <div className="absolute inset-0 bg-primary from-forest-green/80 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 max-w-2xl text-center lg:text-left">
                    <span className="inline-block text-background-light font-bold tracking-widest text-xs uppercase mb-4">
                        Ready for Relief?
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Less Pain. More Movement. Better Days.
                    </h2>
                    <p className="text-white/70 text-lg mb-0 leading-relaxed font-light">
                        Stop living with tension and pain. Book a massage therapy session in Katy, TX and start feeling like yourself again.
                    </p>
                </div>
                <div className="relative z-10 shrink-0 w-full lg:w-auto mt-8 lg:mt-0">
                    <Button5 href={WIX_BOOKING_URL} theme="dark" text="Book Your Session" className="max-w-md mx-auto" hasWhiteOutline={true} />
                </div>
            </div>
        </section>
    );
};

export default Booking;
