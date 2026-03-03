import React from 'react';
import { Link } from 'react-router-dom';
const Booking = () => {
    return (
        <section className="py-24 px-6 lg:px-20 bg-background-light dark:bg-background-dark/50 relative overflow-hidden">
            {/* Background design elements to match the clinical premium vibe */}
            <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-forest-green/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-[1440px] mx-auto bg-charcoal dark:bg-slate-900 rounded-[2rem] p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl border border-white/10 dark:border-white/5">
                {/* Internal container background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-forest-green/80 to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full -ml-48 -mb-48 blur-3xl pointer-events-none"></div>

                {/* Subtle geometric lines */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGw0MCA0ME0wIDQwbDQwLTQwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')" }}></div>

                <div className="relative z-10 max-w-2xl text-center lg:text-left">
                    <span className="inline-block text-background-light font-bold tracking-widest text-xs uppercase mb-4 bg-primary/10 px-3 py-1 rounded border border-primary/20">
                        Ready for Relief?
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Feel Weightless. Restore Function. Reduce Pain.
                    </h2>
                    <p className="text-white/70 text-lg mb-0 leading-relaxed font-light">
                        Experience premier clinical bodywork. Let us help you break the cycle of chronic tension and restore your structural health with targeted, evidence-based therapy.
                    </p>
                </div>
                <div className="relative z-10 shrink-0">
                    <Link to="/booking" className="flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-xl font-bold text-base hover:bg-forest-green transition-all shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transform duration-300 border border-primary/50">
                        <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                        Schedule Therapy Session
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Booking;
