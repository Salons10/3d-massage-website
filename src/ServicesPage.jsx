import React from 'react';
import ServiceCard from './ServiceCard';

const ServicesPage = () => {

    const services = [
        {
            id: 10,
            name: "Manual Lymphatic Drainage",
            description: "A highly specialized, light-touch protocol designed to stimulate the lymphatic system, critically important for reducing post-surgical edema and boosting immunity.",
            purpose: "To reduce swelling by mechanically moving lymphatic fluid away from tissues and toward lymph nodes for immediate reabsorption.",
            procedure: "Using gentle, slow, skin-stretching strokes to pump lymph toward regional nodes.",
            pricingOptions: [
                { duration: "1 hr", price: 130 },
                { duration: "1 hr 30 min", price: 195 }
            ],
            imageUrl: "/mld_clinical.png"
        },
        {
            id: 6,
            name: "Medical Massage",
            description: "Outcome-based therapy prescribed to resolve specific clinically diagnosed pathologies, aid post-surgical recovery, and manage chronic disease symptoms.",
            purpose: "To ease discomfort related to a specific medical diagnosis and/or to improve post-surgical outcomes.",
            procedure: "Customized depending on specific clinical goals and patient contraindications.",
            pricingOptions: [
                { duration: "1 hr", price: 120 },
                { duration: "1 hr 30 min", price: 180 },
                { duration: "2 hr", price: 240 }
            ],
            imageUrl: "/hero_clinical.png"
        },
        {
            id: 4,
            name: "Russian Sports Massage",
            description: "Athletic optimization therapy designed for pre-event preparation or post-event recovery, enhancing biomechanical performance and reducing injury risk.",
            purpose: "To help prepare for and recover from sports/exercise by warming up and loosening tense muscles.",
            procedure: "Range-of-motion techniques, stretching, vigorous strokes, kneading friction, and percussion.",
            pricingOptions: [
                { duration: "1 hr", price: 110 },
                { duration: "1 hr 30 min", price: 165 },
                { duration: "2 hr", price: 220 }
            ],
            imageUrl: "/russian_sports_male.png"
        },
        {
            id: 1,
            name: "Trigger Point Therapy",
            description: "A highly targeted approach to releasing contracted muscle fibers (knots) that cause referral pain patterns and restricted mobility.",
            purpose: "To release myofascial trigger points that cause referral patterns of pain, sensitivity, weakness, numbness, and tingling.",
            procedure: "Hold-and-release techniques concentrated on precise areas along bands of muscle fibers containing trigger points.",
            pricingOptions: [
                { duration: "1 hr", price: 110 },
                { duration: "1 hr 30 min", price: 165 },
                { duration: "2 hr", price: 220 }
            ],
            imageUrl: "/service_triggerpoint.png"
        },
        {
            id: 2,
            name: "Deep Tissue Massage",
            description: "Intensive manipulation of deeper muscular and fascial layers to break down adhesions, alleviate severe tension, and restore structural balance.",
            purpose: "To alleviate pain and stiffness in muscles, tendons, and joints by lengthening and loosening tight myofascia and muscles, including deeper layers.",
            procedure: "Slow, penetrating strokes and deep compression.",
            pricingOptions: [
                { duration: "1 hr", price: 110 },
                { duration: "1 hr 30 min", price: 165 },
                { duration: "2 hr", price: 220 }
            ],
            imageUrl: "/deep_tissue.png"
        },
        {
            id: 3,
            name: "Swedish Relaxation Massage",
            description: "A foundational circulatory therapy designed to drastically reduce systemic stress hormones while increasing blood oxygenation and lymphatic flow.",
            purpose: "To improve blood and lymph circulation, relieve tension, and induce relaxation.",
            procedure: "Gliding strokes, kneading, friction, and percussion.",
            pricingOptions: [
                { duration: "1 hr", price: 110 },
                { duration: "1 hr 30 min", price: 165 },
                { duration: "2 hr", price: 220 }
            ],
            imageUrl: "/swedish_massage.png"
        },
        {
            id: 5,
            name: "Reflexology",
            description: "Neurological stimulation of specific micro-zones on the extremities that correspond to major physiological systems and internal organs.",
            purpose: "To restore internal systems (circulatory, respiratory, endocrine, immune, and neuropeptide) to optimal functioning and to relax the central nervous system.",
            procedure: "Applying gentle pressure to specific points (on the feet, hands, and ears) that correspond to different parts of the body.",
            pricingOptions: [
                { duration: "1 hr", price: 110 },
                { duration: "1 hr 30 min", price: 165 }
            ],
            imageUrl: "/hero_clinical.png"
        },
        {
            id: 7,
            name: "Hot Stones Massage",
            description: "Thermal conductive therapy integrating heated basalt stones to profoundly sedate the central nervous system and melt hypertonic muscles.",
            purpose: "To reduce severe muscular tension through gentle and smooth application of therapeutic heat.",
            procedure: "Placing of hot stones on strategic areas (sacral region, spine, palms) and gliding hot stones over broad areas.",
            pricingOptions: [
                { duration: "1 hr", price: 130 },
                { duration: "1 hr 30 min", price: 185 },
                { duration: "2 hr", price: 240 }
            ],
            imageUrl: "/hot_stones.png"
        },
        {
            id: 8,
            name: "Prenatal Massage",
            description: "Specialized biomechanical support for expecting mothers to alleviate structural dysfunctions, reduce edema, and optimize pelvic alignment for labor.",
            purpose: "To reduce aches and pains in muscles and joints during pregnancy and to improve labor outcomes.",
            procedure: "Gliding strokes, kneading, and friction while client is in supportive supine and side-lying positions.",
            pricingOptions: [
                { duration: "1 hr", price: 130 },
                { duration: "1 hr 30 min", price: 195 },
                { duration: "2 hr", price: 260 }
            ],
            imageUrl: "/prenatal_male.png"
        },
        {
            id: 9,
            name: "Craniosacral Therapy",
            description: "A gentle, non-invasive manipulation of the synarthrodial joints of the cranium to regulate the flow of cerebrospinal fluid and relieve dural tube tension.",
            purpose: "To gently release tension-causing compression in the bones of the skull, spine, and sacrum.",
            procedure: "Very gentle manipulation of membranes and fluid along the craniosacral pathway while client remains fully clothed.",
            pricingOptions: [
                { duration: "1 hr", price: 130 },
                { duration: "1 hr 30 min", price: 195 },
                { duration: "2 hr", price: 260 }
            ],
            imageUrl: "/craniosacral_therapy.png"
        },
        {
            id: 11,
            name: "Shiatsu",
            description: "Traditional Japanese acupressure methodology utilized to correct somatic energy imbalances, improve autonomic nervous system function, and alleviate joint pain.",
            purpose: "To reduce anxiety, muscle tension, joint pain, digestive disorders, and fatigue by improving blood and lymph circulation.",
            procedure: "Compressing, stretching, or tapping specific pressure points along vital energy pathways while client remains fully clothed.",
            pricingOptions: [
                { duration: "1 hr", price: 130 },
                { duration: "1 hr 30 min", price: 195 }
            ],
            imageUrl: "/shiatsu_male.png"
        },
        {
            id: 12,
            name: "Assisted Clinical Stretching",
            description: "PNF (Proprioceptive Neuromuscular Facilitation) and active-isolated protocols to dramatically increase capsular mobility and correct postural deficits.",
            purpose: "To increase range of motion and flexibility, improve blood and lymph circulation, and significantly reduce risk of biomechanical injuries.",
            procedure: "Carefully regulated assisted stretching (client is passive but aware and informed) while client remains fully clothed.",
            pricingOptions: [
                { duration: "1 hr", price: 130 },
                { duration: "1 hr 30 min", price: 195 }
            ],
            imageUrl: "/assisted_stretching_male.png"
        },
        {
            id: 13,
            name: "Cupping Therapy",
            description: "Myofascial decompression technique using negative pressure to aggressively lift connective tissue, separate adhered fascial layers, and draw stagnant blood to the surface.",
            purpose: "To release systemic toxins, dramatically improve localized blood/lymph circulation, reduce focal inflammation, and stimulate natural fibroblastic healing.",
            procedure: "Using suction cups on strategically placed areas to lift skin, underlying fascia, and draw up fluids.",
            pricingOptions: [
                { duration: "1 hr", price: 130 },
                { duration: "2 hr", price: 240 }
            ],
            imageUrl: "/service_cupping.png"
        }
    ];

    return (
        <main className="bg-background-light min-h-screen pt-32 pb-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -mr-[400px] -mt-[400px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[100px] -ml-[300px] pointer-events-none"></div>

            {/* Page Header */}
            <section className="max-w-[1440px] mx-auto px-6 lg:px-20 mb-16 text-center relative z-10">
                <span className="inline-block text-primary font-bold tracking-widest text-xs uppercase mb-4">
                    Clinical Directory
                </span>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-charcoal dark:text-white mb-6">
                    Evidence-Based <span className="text-primary italic">Therapies</span>
                </h1>
                <div className="max-w-3xl mx-auto rounded-2xl p-8 bg-[#404F3D] shadow-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mt-16 blur-2xl"></div>
                    <p className="text-lg text-white leading-relaxed font-medium relative z-10">
                        Select from our comprehensive range of <strong className="text-white font-bold uppercase tracking-wide text-sm mx-1">strictly treatment-based</strong> therapies.
                        Each protocol is uniquely adapted to your specific biomechanical needs and clinical goals to ensure optimal functional restoration.
                        We do not offer standard relaxation spa massages — our focus is entirely on clinical outcomes and pain relief.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-[1440px] mx-auto px-6 lg:px-20 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} id={service.name.toLowerCase().replace(/\s+/g, '-')}>
                            <ServiceCard {...service} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Enhancements Section */}
            <section className="max-w-[1440px] mx-auto px-6 lg:px-20">
                <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-charcoal/5">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">Clinical Enhancements</h2>
                        <p className="text-charcoal/70 dark:text-slate-300 text-sm">
                            Note: Enhancements cannot be booked online but can be requested via text, email, or in person prior to your treatment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        {/* Enhancement 1 */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-charcoal/10 dark:border-white/10 pb-2">
                                <h4 className="font-bold text-lg text-charcoal dark:text-white">Aromatherapy</h4>
                                <span className="text-primary font-bold">+$20</span>
                            </div>
                            <p className="text-sm text-charcoal/70 dark:text-slate-400 leading-relaxed">
                                Utilizes concentrated essential oils mixed with organic jojoba carrier oil to directly impact the limbic system. Induces profound parasympathetic relaxation or boosts mental clarity.
                            </p>
                        </div>

                        {/* Enhancement 2 */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-charcoal/10 dark:border-white/10 pb-2">
                                <h4 className="font-bold text-lg text-charcoal dark:text-white">Topical Analgesics</h4>
                                <span className="text-primary font-bold">+$20</span>
                            </div>
                            <p className="text-sm text-charcoal/70 dark:text-slate-400 leading-relaxed">
                                Medical-grade pain relief gels (Biofreeze, Wood Lock, Prossage) applied to sharply reduce localized muscle/joint inflammation and dramatically increase local circulation.
                            </p>
                        </div>

                        {/* Enhancement 3 */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center border-b border-charcoal/10 dark:border-white/10 pb-2">
                                <h4 className="font-bold text-lg text-charcoal dark:text-white">Hot Towel Therapy</h4>
                                <span className="text-primary font-bold">Complimentary</span>
                            </div>
                            <p className="text-sm text-charcoal/70 dark:text-slate-400 leading-relaxed">
                                Damp, highly heated towels placed strategically on the dermis to instantly vasodilate capillaries, promote deeper circulation, and melt superficial fascial tension.
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#404F3D] rounded-lg p-6 text-center shadow-md">
                        <p className="text-white font-medium">
                            <strong className="text-white font-bold">Frequency Bonus Plan:</strong> If you visit us more than once within a 30-day period, you receive a free clinical enhancement of your choice.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ServicesPage;
