import React from 'react';
import { GradientCard } from './components/ui/gradient-card';

const Services = () => {
    return (
        <section className="pt-12 pb-24 px-6 lg:px-20 max-w-[1440px] mx-auto bg-transparent relative z-20">
            <div className="text-center mb-16 relative z-10">
                <span className="inline-block text-primary font-bold tracking-widest text-xs uppercase mb-4 bg-primary/10 px-3 py-1 rounded border border-primary/20">
                    Core Therapies
                </span>
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-charcoal dark:text-white tracking-tight">Targeted Clinical Therapies</h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mt-6 mb-6"></div>
                <p className="text-lg text-charcoal/70 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-4">
                    We utilize evidence-based treatments to resolve chronic pain, aid post-surgical recovery, and optimize athletic biomechanics.
                </p>
                <p className="text-sm font-bold text-primary uppercase tracking-wider">                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-30">

                {/* MLD */}
                <GradientCard
                    title="Manual Lymphatic Drainage"
                    description="A highly specialized, light-touch protocol designed to stimulate the lymphatic system, critically important for reducing post-surgical edema and boosting immunity."
                    icon={<span className="material-symbols-outlined text-3xl">water_drop</span>}
                    linkTo="/services"
                />

                {/* Medical */}
                <GradientCard
                    title="Medical Massage"
                    description="Outcome-based therapy prescribed to resolve specific clinically diagnosed pathologies, aid post-surgical recovery, and manage chronic disease symptoms."
                    icon={<span className="material-symbols-outlined text-3xl">medical_services</span>}
                    linkTo="/services"
                />

                {/* Russian Sports */}
                <GradientCard
                    title="Russian Sports Massage"
                    description="Athletic optimization therapy designed for pre-event preparation or post-event recovery, enhancing biomechanical performance and reducing injury risk."
                    icon={<span className="material-symbols-outlined text-3xl">fitness_center</span>}
                    linkTo="/services"
                />

            </div>

            <div className="mt-16 text-center">
                <a href="/services" className="inline-flex items-center justify-center px-10 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    View All Services <span className="material-symbols-outlined ml-2">explore</span>
                </a>
            </div>
        </section>
    );
};

export default Services;
