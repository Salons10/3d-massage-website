import React from 'react';

const ValueProps = () => {
    return (
        <section className="py-24 px-6 lg:px-20 max-w-[1440px] mx-auto">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            </div>

            {/* Treatment-focused quote — moved from ServicesPage */}
            <div className="max-w-3xl mx-auto rounded-2xl p-8 bg-primary shadow-md relative overflow-hidden mb-16">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mt-16 blur-2xl"></div>
                <p className="text-lg text-white leading-relaxed font-medium relative z-10">
                    Every massage therapy session at 3D Massage is <strong className="text-secondary font-bold uppercase tracking-wide text-sm mx-1">treatment-focused</strong> and tailored to your body.
                    Whether you're dealing with chronic pain, recovering from surgery, or looking to perform better — we'll find the right approach for you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 text-primary bg-primary/10 p-4 rounded-full">
                        <span className="material-symbols-outlined text-4xl">assignment</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Assessment</h4>
                    <p className="text-charcoal/70 dark:text-slate-400 text-sm font-medium">
                        We start by understanding your pain — where it is, what causes it, and how it's affecting your daily life. No guesswork.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 text-primary bg-primary/10 p-4 rounded-full">
                        <span className="material-symbols-outlined text-4xl">school</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Targeted Treatment</h4>
                    <p className="text-charcoal/70 dark:text-slate-400 text-sm font-medium">
                        Using the right massage techniques for your situation — from deep tissue and trigger point work to stretching and fascial release.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 text-primary bg-primary/10 p-4 rounded-full">
                        <span className="material-symbols-outlined text-4xl">query_stats</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Measurable Progress</h4>
                    <p className="text-charcoal/70 dark:text-slate-400 text-sm font-medium">
                        We track your improvement session to session — better range of motion, less pain, more mobility. You'll feel the difference.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 text-primary bg-primary/10 p-4 rounded-full">
                        <span className="material-symbols-outlined text-4xl">monitoring</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Long-Term Results</h4>
                    <p className="text-charcoal/70 dark:text-slate-400 text-sm font-medium">
                        We give you stretches and self-care tips to keep your body feeling great between sessions — so the relief actually lasts.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ValueProps;
