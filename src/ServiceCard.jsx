import React, { useState } from 'react';

const ServiceCard = ({ id, name, description, purpose, procedure, imageUrl }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-charcoal/5 dark:border-white/5 overflow-hidden flex flex-col transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
            <div className="aspect-[4/3] relative overflow-hidden bg-charcoal">
                <img
                    src={imageUrl}
                    alt={`${name} therapy session`}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 pt-12">
                    <h3 className="text-2xl font-bold text-white mb-1 tracking-tight drop-shadow-md">{name}</h3>
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col bg-background-light">
                <p className="text-charcoal/80 text-sm italic leading-relaxed font-medium mb-4">
                    {description}
                </p>

                {/* Clinical Details Accordion */}
                <div className="mt-auto border border-charcoal/10 rounded-xl overflow-hidden bg-white">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-charcoal/5 transition-colors"
                    >
                        <span className="font-bold text-sm text-charcoal dark:text-white uppercase tracking-wider">Clinical Details</span>
                        <span className={`material-symbols-outlined transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : 'text-charcoal/50 dark:text-white/50'}`}>
                            expand_more
                        </span>
                    </button>
                    {isExpanded && (
                        <div className="p-3 border-t border-charcoal/10 space-y-3 bg-charcoal/5">
                            <div>
                                <span className="text-xs uppercase tracking-widest font-bold text-primary block mb-2">Clinical Purpose</span>
                                <p className="text-charcoal/80 dark:text-slate-300 text-sm leading-relaxed">{purpose}</p>
                            </div>
                            <div>
                                <span className="text-xs uppercase tracking-widest font-bold text-primary block mb-2">Methodology</span>
                                <p className="text-charcoal/80 dark:text-slate-300 text-sm leading-relaxed">{procedure}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
