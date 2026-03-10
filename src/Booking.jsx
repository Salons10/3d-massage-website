import React from 'react';
import { Button5 } from './components/ui/button-5';
import { WIX_BOOKING_URL } from './lib/wixClient';

const Booking = ({ 
    subtitle = "Ready for Relief?",
    title = "Less Pain. More Movement. Better Days.",
    description = "Stop living with tension and pain. Book a massage therapy session in Katy, TX and start feeling like yourself again.",
    buttonText = "Book Your Session"
}) => {
    return (
        <section className="pt-12 pb-24 px-6 lg:px-20 bg-background-light dark:bg-background-dark/50 relative overflow-hidden">
            <div className="max-w-[1440px] mx-auto bg-charcoal dark:bg-slate-900 rounded-[2rem] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl border border-white/10 dark:border-white/5">
                <div className="relative z-10 max-w-2xl text-center lg:text-left">
                    {subtitle && (
                        <span className="inline-block text-accent font-bold tracking-widest text-xs uppercase mb-4">
                            {subtitle}
                        </span>
                    )}
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                        {title}
                    </h2>
                    <p className="text-white/90 text-lg mb-0 leading-relaxed font-light">
                        {description}
                    </p>
                </div>
                
                <div className="relative z-10 shrink-0 w-full lg:w-auto mt-8 lg:mt-0 flex justify-center lg:justify-end">
                    {/* CHANGED: Replaced max-w-md with !w-fit px-8 to stop the stretching and balance the padding */}
                    <Button5 
                        href={WIX_BOOKING_URL} 
                        theme="dark" 
                        text={buttonText} 
                        className="!w-fit px-8" 
                        hasWhiteOutline={true} 
                    />
                </div>
            </div>
        </section>
    );
};

export default Booking;