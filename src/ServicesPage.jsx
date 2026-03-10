import React from 'react';
import ServiceCard from './ServiceCard';
import Booking from './Booking';
import Enhancements from './Enhancements';
import Contact from './Contact';

const ServicesPage = () => {

    const services = [
        {
            id: 10,
            name: "Manual Lymphatic Drainage",
            description: "Gentle, light-touch therapy that helps reduce swelling after surgery, supports your immune system, and speeds up recovery by guiding fluid back to where it needs to go.",
            purpose: "To reduce swelling by moving lymphatic fluid away from tissues and toward lymph nodes for reabsorption.",
            procedure: "Using gentle, slow, skin-stretching strokes to pump lymph toward regional nodes.",
            imageUrl: "/mld_male_new2.png"
        },
        {
            id: 6,
            name: "Medical Massage",
            description: "Focused treatment designed to address specific medical conditions, whether you're recovering from surgery, managing chronic pain, or dealing with an injury.",
            purpose: "To ease discomfort related to a specific medical condition and to improve post-surgical outcomes.",
            procedure: "Customized depending on specific clinical goals and patient contraindications.",
            imageUrl: "/hero_clinical.png"
        },
        {
            id: 4,
            name: "Russian Sports Massage",
            description: "Built for athletes and active people, whether you need to warm up before a game or recover after one. Improves performance and reduces injury risk.",
            purpose: "To help prepare for and recover from sports/exercise by warming up and loosening tense muscles.",
            procedure: "Range-of-motion techniques, stretching, vigorous strokes, kneading friction, and percussion.",
            imageUrl: "/russian_sports_male_new2.png"
        },
        {
            id: 1,
            name: "Trigger Point Therapy",
            description: "Focused pressure on tight muscle knots that cause pain in other areas of the body. Great for headaches, neck pain, and limited range of motion.",
            purpose: "To release myofascial trigger points that cause referral patterns of pain, sensitivity, weakness, numbness, and tingling.",
            procedure: "Hold-and-release techniques concentrated on precise areas along bands of muscle fibers containing trigger points.",
            imageUrl: "/service_triggerpoint.png"
        },
        {
            id: 2,
            name: "Deep Tissue Massage",
            description: "Slow, focused pressure that reaches the deeper layers of muscle to break up tightness, relieve severe tension, and restore balance to your body.",
            purpose: "To relieve pain and stiffness in muscles, tendons, and joints by working through the deeper layers of tissue.",
            procedure: "Slow, penetrating strokes and deep compression.",
            imageUrl: "/deep_tissue_male_new.png"
        },
        {
            id: 3,
            name: "Swedish Relaxation Massage",
            description: "Classic full-body massage that improves circulation, melts away stress, and leaves you feeling completely relaxed and recharged.",
            purpose: "To improve blood and lymph circulation, relieve tension, and induce relaxation.",
            procedure: "Gliding strokes, kneading, friction, and percussion.",
            imageUrl: "/swedish_male_new.png"
        },
        {
            id: 5,
            name: "Reflexology",
            description: "Targeted pressure on specific points in the feet, hands, and ears that connect to different parts of the body, helping restore balance and relieve tension throughout.",
            purpose: "To restore internal systems (circulatory, respiratory, endocrine, immune, and neuropeptide) to optimal functioning and to relax the central nervous system.",
            procedure: "Applying gentle pressure to specific points (on the feet, hands, and ears) that correspond to different parts of the body.",
            imageUrl: "/reflexology_male_new.png"
        },
        {
            id: 7,
            name: "Hot Stones Massage",
            description: "Warm basalt stones placed on key areas of the body to deeply relax tight muscles, calm the nervous system, and melt away tension.",
            purpose: "To reduce severe muscular tension through gentle and smooth application of therapeutic heat.",
            procedure: "Placing of hot stones on strategic areas (sacral region, spine, palms) and gliding hot stones over broad areas.",
            imageUrl: "/hot_stones_male_new.png"
        },
        {
            id: 8,
            name: "Prenatal Massage",
            description: "Safe, supportive massage designed for expecting mothers to help relieve pregnancy-related aches and pains, reduce swelling, and prepare your body for labor.",
            purpose: "To reduce aches and pains in muscles and joints during pregnancy and to improve labor outcomes.",
            procedure: "Gliding strokes, kneading, and friction while client is in supportive supine and side-lying positions.",
            imageUrl: "/prenatal_male_new.png"
        },
        {
            id: 9,
            name: "Craniosacral Therapy",
            description: "A very gentle, hands-on technique that releases tension in the head, spine, and lower back. Great for headaches, stress, and overall nervous system relief.",
            purpose: "To gently release tension-causing compression in the bones of the skull, spine, and sacrum.",
            procedure: "Very gentle manipulation of membranes and fluid along the craniosacral pathway while client remains fully clothed.",
            imageUrl: "/craniosacral_male_new2.png"
        },
        {
            id: 11,
            name: "Shiatsu",
            description: "Traditional Japanese pressure-point therapy that reduces anxiety, eases muscle tension and joint pain, and improves circulation while you stay fully clothed.",
            purpose: "To reduce anxiety, muscle tension, joint pain, digestive disorders, and fatigue by improving blood and lymph circulation.",
            procedure: "Compressing, stretching, or tapping specific pressure points along vital energy pathways while client remains fully clothed.",
            imageUrl: "/shiatsu_male.png"
        },
        {
            id: 12,
            name: "Assisted Clinical Stretching",
            description: "Professional assisted stretching that dramatically increases your flexibility and range of motion, making it perfect for improving posture and preventing injuries.",
            purpose: "To increase range of motion and flexibility, improve blood and lymph circulation, and significantly reduce risk of biomechanical injuries.",
            procedure: "Carefully regulated assisted stretching (client is passive but aware and informed) while client remains fully clothed.",
            imageUrl: "/assisted_stretching_male_new3.png"
        },
        {
            id: 13,
            name: "Cupping Therapy",
            description: "Suction cups lift and separate tight connective tissue, improving blood flow and reducing inflammation. Great for stubborn tension and muscle recovery.",
            purpose: "To improve circulation, reduce inflammation, and stimulate natural healing by drawing blood flow to targeted areas.",
            procedure: "Using suction cups on strategically placed areas to lift skin, underlying fascia, and draw up fluids.",
            imageUrl: "/service_cupping.png"
        }
    ];

    return (
        <>
            <main className="bg-background-light pt-32 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -mr-[400px] -mt-[400px] pointer-events-none"></div>
                <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[100px] -ml-[300px] pointer-events-none"></div>

                {/* Page Header */}
                <section className="max-w-[1440px] mx-auto px-6 lg:px-20 mb-16 text-center relative z-10">
                    <span className="inline-block text-accent font-bold tracking-widest text-xs uppercase mb-4">
                        All Services
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-extrabold text-charcoal dark:text-white mb-6">
                        Massage <span className="text-secondary">Services</span>
                    </h1>
                    <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed">
                        From chronic pain and post-surgery recovery to sports performance, we offer hands-on therapies that deliver real, lasting results. Select any service below to learn more.
                    </p>
                </section>

                {/* Services Grid */}
                <section className="max-w-[1440px] mx-auto px-6 lg:px-20 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div 
                                key={service.id} 
                                id={service.name.toLowerCase().replace(/\s+/g, '-')}
                                /* FIX: If this is the last item (index 12), move it to the 
                                   middle column (2nd col) on desktop (xl screens).
                                */
                                className={index === services.length - 1 ? 'xl:col-start-2' : ''}
                            >
                                <ServiceCard {...service} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Add On Enhancements */}
                <Enhancements />

            </main>

            <Booking 
                subtitle=""
                title="Schedule Your Appointment"
                description="We offer seamless online bookings. Find a time that works for you."
                buttonText="Book Now"
            />
            <Contact />
        </>
    );
};

export default ServicesPage;