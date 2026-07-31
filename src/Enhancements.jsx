import React from 'react';

const Enhancements = () => {
    return (
        <section className="pt-8 pb-12 px-6 lg:px-20 max-w-[1440px] mx-auto">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-charcoal/5">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-charcoal dark:text-white">Add-On Enhancements</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Enhancement 1 */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-charcoal/10 dark:border-white/10 pb-2">
                            <h4 className="font-bold text-lg text-charcoal dark:text-white">Aromatherapy</h4>
                            <span className="text-accent font-bold">+$20</span>
                        </div>
                        <p className="text-sm text-charcoal/70 dark:text-slate-400 leading-relaxed">
                            Essential oils blended with organic jojoba oil. Choose a calming blend to melt stress or an energizing one to sharpen focus.
                        </p>
                    </div>

                    {/* Enhancement 2 */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-charcoal/10 dark:border-white/10 pb-2">
                            <h4 className="font-bold text-lg text-charcoal dark:text-white">Pain Relief Balm/Gel/Oil</h4>
                            <span className="text-accent font-bold">+$20</span>
                        </div>
                        <p className="text-sm text-charcoal/70 dark:text-slate-400 leading-relaxed">
                            Professional-grade pain relief gels (Biofreeze, Wood Lock, Prossage) applied to sore muscles and joints to reduce inflammation and improve circulation.
                        </p>
                    </div>

                    {/* Enhancement 3 */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-charcoal/10 dark:border-white/10 pb-2">
                            <h4 className="font-bold text-lg text-charcoal dark:text-white">Hot Stones</h4>
                            <span className="text-accent font-bold">+$20</span>
                        </div>
                        <p className="text-sm text-charcoal/70 dark:text-slate-400 leading-relaxed">
                            Smooth, heated stones placed on key areas and glided over muscles to deeply ease tension, promote circulation, and induce relaxation.
                        </p>
                    </div>

                    {/* Enhancement 4 */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-charcoal/10 dark:border-white/10 pb-2">
                            <h4 className="font-bold text-lg text-charcoal dark:text-white">Soft Cupping</h4>
                            <span className="text-accent font-bold">+$30</span>
                        </div>
                        <p className="text-sm text-charcoal/70 dark:text-slate-400 leading-relaxed">
                            Gentle silicone cups glided over target areas to release tight fascia, boost circulation, and soothe muscle tension with light, therapeutic suction.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Enhancements;
