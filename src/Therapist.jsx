import React from 'react';

const Therapist = () => {
    return (
        <section className="relative py-24 bg-primary/5 overflow-hidden">
            {/* Background anatomical texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cGF0aCBkPSJNMCAwbDQwMCA0MDBNMCA0MDBsNDAwLTQwMCIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuNSkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')" }}></div>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="w-full lg:w-5/12 relative z-20">
                        <div className="aspect-[4/5] bg-center bg-cover rounded-2xl shadow-2xl relative z-10" style={{ backgroundImage: "url('/max_new.png')" }}></div>
                        {/* Dynamic abstract medical frame */}
                        <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/30 rounded-2xl z-0 backdrop-blur-sm"></div>
                        <div className="absolute -top-4 -left-4 w-32 h-32 border-t-4 border-l-4 border-slate-blue rounded-tl-2xl z-20"></div>
                    </div>

                    <div className="w-full lg:w-7/12">
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Lead Clinical Specialist
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-charcoal dark:text-white">
                            Restoring Function. Optimizing Biomechanics. Meet Max.
                        </h2>
                        <p className="text-lg text-charcoal/80 dark:text-slate-300 mb-6 leading-relaxed font-medium">
                            With over 10 years of focused clinical education, Max has shifted the paradigm of massage therapy from transient relaxation to measurable physical restoration. His diagnostic approach identifies the root cause of muscular dysfunction.
                        </p>
                        <p className="text-lg text-charcoal/80 dark:text-slate-300 mb-10 leading-relaxed font-medium">
                            Through targeted neuromuscular re-education and myofascial release, he develops customized treatment plans to reverse chronic pain patterns, accelerate post-surgical healing, and restore optimal body alignment.
                        </p>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-charcoal/5 dark:border-white/5">
                                <span className="material-symbols-outlined text-primary text-3xl mb-2">vital_signs</span>
                                <span className="text-xs font-bold text-center uppercase tracking-wide">Clinical Assessment</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-charcoal/5 dark:border-white/5">
                                <span className="material-symbols-outlined text-primary text-3xl mb-2">psychology</span>
                                <span className="text-xs font-bold text-center uppercase tracking-wide">Neuromuscular Specialist</span>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-charcoal/5 dark:border-white/5">
                                <span className="material-symbols-outlined text-primary text-3xl mb-2">accessibility_new</span>
                                <span className="text-xs font-bold text-center uppercase tracking-wide">Myofascial Release</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Therapist;
