import React from 'react';
import { TestimonialCard } from './components/ui/testimonial-card';

const Testimonials = () => {
    return (
        <section className="py-24 bg-secondary/10 dark:bg-background-dark/40">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-16 px-4">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

                    {/* Testimonial 1 */}
                    <TestimonialCard
                        title="Linda S."
                        description="My muscles were so tight and Max improved my mobility through medical massage in just a few weeks. Prior to seeing Max, after I’d sit for a while, it was difficult to stand up & start walking. By my 3rd weekly massage, I realized I was standing up easily & ready to walk. Max is incredibly knowledgeable about the muscular system and has a passion for helping people. Thanks Max!"
                    />

                    {/* Testimonial 2 */}
                    <TestimonialCard
                        title="Chris H."
                        description="I had an absolutely fantastic experience! From the moment I arrived, the therapist was professional and attentive, taking the time to discuss my problem areas and what I was hoping to achieve. During the session, he was constantly checking in about the pressure and making sure I was comfortable and safe. He really worked wonders on my knee problem spots, and I walked out feeling amazing. Highly recommended!"
                    />

                    {/* Testimonial 3 */}
                    <TestimonialCard
                        title="Seyed J."
                        description="I was never a fan of massages until I met Max with 3D Massage. The experience of getting a deep, full-body massage from him is honestly beyond words. If you think massages aren't for you, Max will completely change your mind. Highly recommended!"
                    />

                </div>
            </div>
        </section>
    );
};

export default Testimonials;
