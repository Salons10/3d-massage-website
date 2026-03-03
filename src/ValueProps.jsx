import React from 'react';

const ValueProps = () => {
    return (
        <section className="py-24 px-6 lg:px-20 max-w-[1440px] mx-auto">
            <div className="mb-16 text-center">
                <h2 className="text-3xl font-bold mb-4">The Clinical Patient Journey</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 text-primary bg-primary/10 p-4 rounded-full">
                        <span className="material-symbols-outlined text-4xl">assignment</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Clinical Assessment</h4>
                    <p className="text-charcoal/70 dark:text-slate-400 text-sm font-medium">
                        We begin with a thorough postural and biomechanical evaluation to pinpoint the exact source of your pain.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 text-primary bg-primary/10 p-4 rounded-full">
                        <span className="material-symbols-outlined text-4xl">school</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Targeted Treatment</h4>
                    <p className="text-charcoal/70 dark:text-slate-400 text-sm font-medium">
                        Application of evidence-based, specialized therapies designed to release adhesions and reset neuromuscular pathways.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 text-primary bg-primary/10 p-4 rounded-full">
                        <span className="material-symbols-outlined text-4xl">query_stats</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Measurable Progress</h4>
                    <p className="text-charcoal/70 dark:text-slate-400 text-sm font-medium">
                        We track recovery metrics across sessions, ensuring consistent improvement in functional mobility and pain reduction.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 text-primary bg-primary/10 p-4 rounded-full">
                        <span className="material-symbols-outlined text-4xl">monitoring</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3">Long-Term Optimization</h4>
                    <p className="text-charcoal/70 dark:text-slate-400 text-sm font-medium">
                        Empowering you with self-care protocols and maintenance strategies to sustain optimal biomechanical health.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ValueProps;
