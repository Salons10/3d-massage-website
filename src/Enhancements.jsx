import React from 'react';

const Enhancements = () => {
    return (
        <section className="pt-8 pb-12 px-6 lg:px-20 max-w-[1440px] mx-auto">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-charcoal/5">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-charcoal dark:text-white mb-4">Add-On Enhancements</h2>
                    <p className="text-charcoal/70 dark:text-slate-300 text-sm">
                        Note: Enhancements cannot be booked online but can be requested via text, email, or in person prior to your treatment.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
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
                            <h4 className="font-bold text-lg text-charcoal dark:text-white">Topical Analgesics</h4>
                            <span className="text-accent font-bold">+$20</span>
                        </div>
                        <p className="text-sm text-charcoal/70 dark:text-slate-400 leading-relaxed">
                            Professional-grade pain relief gels (Biofreeze, Wood Lock, Prossage) applied to sore muscles and joints to reduce inflammation and improve circulation.
                        </p>
                    </div>

                    {/* Enhancement 3 */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-charcoal/10 dark:border-white/10 pb-2">
                            <h4 className="font-bold text-lg text-charcoal dark:text-white">Hot Towel Therapy</h4>
                            <span className="text-accent font-bold">Complimentary</span>
                        </div>
                        <p className="text-sm text-charcoal/70 dark:text-slate-400 leading-relaxed">
                            Warm, damp towels placed on tight areas to improve circulation, ease tension, and help your muscles relax more deeply during treatment.
                        </p>
                    </div>
                </div>

                <div className="bg-primary rounded-lg p-6 text-center shadow-md">
                    <p className="text-white font-medium">
                        <strong className="text-white font-bold">Frequency Bonus Plan:</strong> Visit us more than once within 30 days and get a free enhancement of your choice.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Enhancements;
