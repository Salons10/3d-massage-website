import React from 'react';
import { GradientCard } from './components/ui/gradient-card';
import { Button5 } from './components/ui/button-5';

const Services = () => {
    return (
        <section className="pt-12 pb-8 px-6 lg:px-20 max-w-[1440px] mx-auto bg-transparent relative z-20">
            <div className="text-center mb-16 relative z-10">
                <span className="inline-block text-accent font-bold tracking-widest text-xs uppercase mb-4">
                    Our Specialties
                </span>
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 text-charcoal dark:text-white tracking-tight">Therapeutic Massage in Katy, TX</h2>
                <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mt-6 mb-6"></div>
                <p className="text-lg text-charcoal/70 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-4">
                    From chronic pain and post-surgery recovery to sports performance, we offer hands-on therapies that deliver real, lasting results.
                </p>
                <p className="text-sm font-bold text-primary uppercase tracking-wider">                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-30">

                {/* MLD */}
                <GradientCard
                    title="Manual Lymphatic Drainage"
                    description="Gentle, light-touch therapy that reduces swelling after surgery, boosts your immune system, and speeds up recovery by moving fluid where it needs to go."
                    imageUrl="/mld_clinical.png"
                    linkTo="/services"
                />

                {/* Medical */}
                <GradientCard
                    title="Medical Massage"
                    description="Focused treatment for specific medical conditions to help you recover faster after surgery, manage chronic pain, and get back to feeling like yourself."
                    imageUrl="/hero_clinical.png"
                    linkTo="/services"
                />

                {/* Russian Sports */}
                <GradientCard
                    title="Russian Sports Massage"
                    description="Built for athletes and active people. Whether you're prepping for a game or recovering from one, this therapy improves performance and prevents injuries."
                    imageUrl="/russian_sports_male.png"
                    linkTo="/services"
                />

            </div>

            <div className="mt-16 text-center">
                <Button5 asLink to="/services" theme="dark" text="View All Services" className="max-w-[300px] border border-charcoal/10" />
            </div>
        </section>
    );
};

export default Services;
