import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button5 } from './components/ui/button-5';
import { WIX_BOOKING_URL } from './lib/wixClient';

// ──────────────────────────────────────────
//  Service data (mirrored from ServicesPage)
// ──────────────────────────────────────────
const ALL_SERVICES = [
    { id: 10, name: "Manual Lymphatic Drainage", shortDesc: "Gentle therapy to reduce swelling and support recovery.", duration: "1 hr – 1 hr 30 min", startPrice: 130, icon: "water_drop" },
    { id: 6, name: "Medical Massage", shortDesc: "Focused treatment for specific medical conditions.", duration: "1 hr – 2 hr", startPrice: 120, icon: "medical_services" },
    { id: 4, name: "Russian Sports Massage", shortDesc: "Built for athletes — warmup, recovery, injury prevention.", duration: "1 hr – 2 hr", startPrice: 110, icon: "fitness_center" },
    { id: 1, name: "Trigger Point Therapy", shortDesc: "Focused pressure on tight muscle knots causing pain.", duration: "1 hr – 2 hr", startPrice: 110, icon: "pin_drop" },
    { id: 2, name: "Deep Tissue Massage", shortDesc: "Slow, deep pressure to relieve severe tension.", duration: "1 hr – 2 hr", startPrice: 110, icon: "layers" },
    { id: 3, name: "Swedish Relaxation Massage", shortDesc: "Classic full-body relaxation and stress relief.", duration: "1 hr – 2 hr", startPrice: 110, icon: "spa" },
    { id: 5, name: "Reflexology", shortDesc: "Targeted foot and hand pressure for whole-body balance.", duration: "1 hr – 1 hr 30 min", startPrice: 110, icon: "do_not_step" },
    { id: 7, name: "Hot Stones Massage", shortDesc: "Warm basalt stones melt away deep muscle tension.", duration: "1 hr – 2 hr", startPrice: 130, icon: "whatshot" },
    { id: 8, name: "Prenatal Massage", shortDesc: "Supportive therapy for expecting mothers.", duration: "1 hr – 2 hr", startPrice: 130, icon: "pregnant_woman" },
    { id: 9, name: "Craniosacral Therapy", shortDesc: "Gentle technique for head, spine, and nervous system.", duration: "1 hr – 2 hr", startPrice: 130, icon: "psychology" },
    { id: 11, name: "Shiatsu", shortDesc: "Japanese pressure-point therapy for anxiety and tension.", duration: "1 hr – 1 hr 30 min", startPrice: 130, icon: "touch_app" },
    { id: 12, name: "Assisted Clinical Stretching", shortDesc: "Professional stretching for flexibility and injury prevention.", duration: "1 hr – 1 hr 30 min", startPrice: 130, icon: "accessibility_new" },
    { id: 13, name: "Cupping Therapy", shortDesc: "Suction therapy to improve circulation and reduce inflammation.", duration: "1 hr – 2 hr", startPrice: 130, icon: "circle" },
];

// ──────────────────────────────────────────
//  Booking Gateway Component
// ──────────────────────────────────────────
const BookingPage = () => {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState(null);
    const [isReady, setIsReady] = useState(false);

    // Check if we arrived from a service card click
    useEffect(() => {
        const stored = localStorage.getItem('pendingBooking');
        if (stored) {
            const data = JSON.parse(stored);
            const match = ALL_SERVICES.find(s => s.name === data.serviceName);
            if (match) setSelectedService(match.id);
            localStorage.removeItem('pendingBooking');
        }
        // Small delay for entrance animation
        const t = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(t);
    }, []);

    const handleBookOnWix = () => {
        if (WIX_BOOKING_URL && WIX_BOOKING_URL !== 'YOUR_WIX_BOOKING_PAGE_URL_HERE') {
            window.open(WIX_BOOKING_URL, '_blank', 'noopener,noreferrer');
        } else {
            // Fallback: construct a likely Wix booking URL from the siteId
            // User should replace the placeholder in wixClient.js
            alert('Booking URL not configured yet. Please contact us to schedule your appointment.');
        }
    };

    return (
        <main className="min-h-screen bg-background-light pt-28 pb-16 px-4 lg:px-20 font-sans relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/4 rounded-full blur-[120px] -ml-[250px] -mt-[250px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px] -mr-[200px] -mb-[200px] pointer-events-none" />

            <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-700 ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>

                {/* Back nav */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-charcoal/50 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider mb-8 group"
                >
                    <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
                    Back
                </button>

                {/* Hero Header */}
                <div className="bg-primary rounded-2xl px-8 py-10 mb-8 shadow-2xl shadow-primary/20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l40 40M0 40l40-40' stroke='%23fff' stroke-width='1' fill='none'/%3E%3C/svg%3E\")" }} />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

                    <div className="relative z-10 text-center max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <span className="material-symbols-outlined text-3xl text-white">calendar_month</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">Book Your Session</h1>
                        <p className="text-white/60 text-base leading-relaxed max-w-lg mx-auto">
                            Choose a service below, then you'll be taken to our secure scheduling page to pick a date and time that works for you.
                        </p>
                    </div>
                </div>

                {/* Service Selection Grid */}
                <div className="mb-8">
                    <h2 className="text-sm font-extrabold text-charcoal uppercase tracking-widest mb-5 flex items-center gap-2.5">
                        <span className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-[16px]">clinical_notes</span>
                        </span>
                        Select Your Treatment
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {ALL_SERVICES.map((service) => {
                            const isSelected = selectedService === service.id;
                            return (
                                <button
                                    key={service.id}
                                    onClick={() => setSelectedService(isSelected ? null : service.id)}
                                    className={`group text-left p-4 rounded-xl border-2 transition-all duration-200 ${isSelected
                                            ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 scale-[1.02]'
                                            : 'border-charcoal/8 bg-white hover:border-primary/30 hover:shadow-md hover:bg-primary/[0.02]'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-primary/8 text-primary'
                                            }`}>
                                            <span className="material-symbols-outlined text-[20px]">{service.icon}</span>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className={`font-bold text-sm leading-tight mb-1 transition-colors ${isSelected ? 'text-primary' : 'text-charcoal'
                                                }`}>
                                                {service.name}
                                            </p>
                                            <p className="text-charcoal/50 text-xs leading-relaxed line-clamp-2">{service.shortDesc}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-charcoal/6">
                                        <div className="flex items-center gap-1.5 text-charcoal/40">
                                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                                            <span className="text-[11px] font-bold">{service.duration}</span>
                                        </div>
                                        <span className={`text-sm font-extrabold transition-colors ${isSelected ? 'text-primary' : 'text-charcoal'}`}>
                                            from ${service.startPrice}
                                        </span>
                                    </div>
                                    {isSelected && (
                                        <div className="flex items-center gap-1.5 mt-3 text-primary">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                            <span className="text-xs font-bold">Selected</span>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Book Now CTA */}
                <div className="bg-white rounded-2xl shadow-xl border border-charcoal/5 p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            {selectedService ? (
                                <>
                                    <p className="text-[11px] uppercase tracking-widest font-bold text-charcoal/40 mb-1">Ready to Book</p>
                                    <p className="text-lg font-extrabold text-charcoal">
                                        {ALL_SERVICES.find(s => s.id === selectedService)?.name}
                                    </p>
                                    <p className="text-sm text-charcoal/50 mt-0.5">
                                        You'll pick your exact date, time, and duration on the booking page.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-[11px] uppercase tracking-widest font-bold text-charcoal/40 mb-1">No Selection Required</p>
                                    <p className="text-lg font-extrabold text-charcoal">
                                        Browse All Available Times
                                    </p>
                                    <p className="text-sm text-charcoal/50 mt-0.5">
                                        Click below to see the full schedule and choose any service.
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="w-full sm:w-auto shrink-0">
                            <div onClick={handleBookOnWix} className="cursor-pointer">
                                <Button5
                                    text="Continue to Scheduling →"
                                    theme="light"
                                    className="h-[56px] min-w-[260px] text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-5 border-t border-charcoal/6">
                        {[
                            { icon: 'lock', label: 'Secure Booking' },
                            { icon: 'event_available', label: 'Instant Confirmation' },
                            { icon: 'notifications_active', label: 'Appointment Reminders' },
                            { icon: 'credit_card_off', label: 'Pay In Person' },
                        ].map(({ icon, label }) => (
                            <div key={label} className="flex items-center gap-1.5 text-charcoal/40">
                                <span className="material-symbols-outlined text-[16px]">{icon}</span>
                                <span className="text-[11px] font-bold uppercase tracking-wide">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Location Info */}
                <div className="mt-6 bg-primary/5 border border-primary/10 rounded-xl p-5 flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary text-[24px] shrink-0">location_on</span>
                    <div>
                        <p className="font-bold text-sm text-charcoal">3D Massage — Katy, TX</p>
                        <p className="text-charcoal/50 text-xs mt-0.5">2039 N. Mason Rd Suite 602, Katy, TX 77449</p>
                    </div>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=2039+N+Mason+Rd+Suite+602+Katy+TX+77449"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto text-primary text-xs font-bold hover:underline shrink-0 hidden sm:block"
                    >
                        Get Directions →
                    </a>
                </div>
            </div>
        </main>
    );
};

export default BookingPage;
