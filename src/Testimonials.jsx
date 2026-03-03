import React from 'react';
import { GradientCard } from './components/ui/gradient-card';

const Testimonials = () => {
    return (
        <section className="py-24 bg-white dark:bg-background-dark/40">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center">
                <h2 className="text-4xl font-bold mb-16">Clinical Outcomes & Patient Success</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

                    {/* Testimonial 1 */}
                    <GradientCard
                        title="Michael T., Athlete"
                        description="Max diagnosed the structural tension in my rotator cuff immediately. After just three targeted neuromuscular sessions and a custom stretching protocol, I am completely pain-free and back to lifting weights."
                        icon={<span className="material-symbols-outlined font-bold">verified</span>}
                    />

                    {/* Testimonial 2 */}
                    <GradientCard
                        title="Sarah L., Post-Op Patient"
                        description="The lymphatic drainage treatments were instrumental in my post-surgical recovery. My surgeon was amazed at how quickly the swelling reduced and how fast my range of motion returned."
                        icon={<span className="material-symbols-outlined font-bold">verified</span>}
                    />

                    {/* Testimonial 3 */}
                    <GradientCard
                        title="David H., Consultant"
                        description="I suffered from chronic lower back pain for over five years. Max didn't just rub my back; he analyzed my gait, released the deep fascial adhesions, and literally gave me my active life back."
                        icon={<span className="material-symbols-outlined font-bold">verified</span>}
                    />

                </div>
            </div>
        </section>
    );
};

export default Testimonials;
