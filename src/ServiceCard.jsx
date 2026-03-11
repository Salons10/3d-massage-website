import React, { useState } from 'react';

const ServiceCard = ({ id, name, description, purpose, procedure, imageUrl }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div 
            className={`flip-card h-full group cursor-pointer ${isFlipped ? 'mobile-flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className="flip-card-inner">
                {/* Front Face */}
                <div className="flip-card-front bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-charcoal/5 dark:border-white/5 overflow-hidden flex flex-col h-full transform transition duration-300 group-hover:shadow-2xl">
                    <div className="aspect-[4/3] relative overflow-hidden bg-charcoal shrink-0">
                        <img
                            src={imageUrl}
                            alt={`${name} therapy session`}
                            className="w-full h-full object-cover opacity-90 transition-transform duration-700"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 pt-12">
                            <h3 className="text-2xl font-bold text-white mb-1 tracking-tight drop-shadow-md">{name}</h3>
                        </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col bg-background-light">
                        <p className="text-charcoal/80 text-sm leading-relaxed font-medium">
                            {description}
                        </p>
                        
                        <div className="mt-auto pt-4 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider opacity-60 md:hidden">
                            <span>Tap for Clinical Details</span>
                            <span className="material-symbols-outlined text-[16px] animate-pulse">flip_to_back</span>
                        </div>
                    </div>
                </div>

                {/* Back Face */}
                <div className="flip-card-back bg-primary text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-primary-mid flex flex-col justify-center gap-6 h-full overflow-y-auto">
                    <div>
                        <span className="text-xs uppercase tracking-widest font-bold text-accent block mb-2">Clinical Purpose</span>
                        <p className="text-white/90 text-sm leading-relaxed">{purpose}</p>
                    </div>
                    <div>
                        <span className="text-xs uppercase tracking-widest font-bold text-accent block mb-2">Methodology</span>
                        <p className="text-white/90 text-sm leading-relaxed">{procedure}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
