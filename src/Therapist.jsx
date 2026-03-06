import React from 'react';

const Therapist = () => {
    return (
        <section className="relative py-24 bg-background-light dark:bg-background-dark overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-5/12 relative z-20">
                        <div className="aspect-[4/5] bg-center bg-cover rounded-2xl shadow-2xl relative z-10" style={{ backgroundImage: "url('/new-max-image.png')" }}></div>
                        {/* Dynamic abstract medical frame */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/30 rounded-2xl z-0 backdrop-blur-sm"></div>
                        <div className="absolute -top-4 -left-4 w-32 h-32 border-t-4 border-l-4 border-slate-blue rounded-tl-2xl z-20"></div>
                    </div>

                    <div className="w-full lg:w-7/12">
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Your Massage Therapist
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-charcoal dark:text-white">
                            Real Results. Real Relief. Meet Max.
                        </h2>
                        <p className="text-lg text-charcoal/80 dark:text-slate-300 mb-6 leading-relaxed font-medium">
                            With over 10 years of hands-on experience, Max is a licensed massage therapist in Katy, TX who goes beyond surface-level relaxation. He finds the root cause of your pain — not just where it hurts, but why it hurts — and builds a plan to fix it.
                        </p>
                        <p className="text-lg text-charcoal/80 dark:text-slate-300 mb-10 leading-relaxed font-medium">
                            Using targeted deep tissue work, trigger point therapy, and fascial release techniques, Max creates custom treatment plans that reduce chronic pain, speed up recovery after surgery, and help your body move the way it should.
                        </p>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                            <div className="flex flex-col items-center justify-center p-4 bg-secondary dark:bg-slate-800 rounded-xl shadow-sm border border-charcoal/5 dark:border-white/5">
                                <span className="material-symbols-outlined text-white text-3xl mb-2">vital_signs</span>
                                <span className="text-white text-xs font-bold text-center uppercase tracking-wide">10+ Years Experience</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-secondary dark:bg-slate-800 rounded-xl shadow-sm border border-charcoal/5 dark:border-white/5">
                                <span className="material-symbols-outlined text-white text-3xl mb-2">psychology</span>
                                <span className="text-white text-xs font-bold text-center uppercase tracking-wide">Pain Relief Specialist</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-secondary dark:bg-slate-800 rounded-xl shadow-sm border border-charcoal/5 dark:border-white/5">
                                <span className="material-symbols-outlined text-white text-3xl mb-2">accessibility_new</span>
                                <span className="text-white text-xs font-bold text-center uppercase tracking-wide">Licensed Therapist</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Therapist;
