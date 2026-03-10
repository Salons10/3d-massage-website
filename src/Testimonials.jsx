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
                        title="Michael T."
                        description="Max figured out exactly what was going on with my shoulder on the first visit. After three sessions of targeted deep tissue work and a stretching plan, I'm completely pain-free and back to lifting."
                    />

                    {/* Testimonial 2 */}
                    <TestimonialCard
                        title="Sarah L."
                        description="The lymphatic drainage massage made a huge difference in my recovery after surgery. My surgeon couldn't believe how fast the swelling went down and how quickly I got my movement back."
                    />

                    {/* Testimonial 3 */}
                    <TestimonialCard
                        title="David H."
                        description="I had chronic lower back pain for over five years. Max didn't just work on the surface. He analyzed how I move, released the deep tension, and gave me my active life back."
                    />

                </div>
            </div>
        </section>
    );
};

export default Testimonials;
