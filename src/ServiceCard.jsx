import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button5 } from './components/ui/button-5';

const ServiceCard = ({ id, name, description, purpose, procedure, pricingOptions, imageUrl }) => {
    const [selectedDurationIndex, setSelectedDurationIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const selectedOption = pricingOptions[selectedDurationIndex];

    const handleBookNow = () => {
        // Save the selected booking details to localStorage to be read by the BookingPage
        const bookingData = {
            serviceId: id,
            serviceName: name,
            duration: selectedOption.duration,
            price: selectedOption.price,
        };
        localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
        navigate('/booking');
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-charcoal/5 dark:border-white/5 overflow-hidden flex flex-col transform transition duration-300 hover:shadow-2xl hover:-translate-y-1">
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

            <div className="p-4 pb-2 flex-grow flex flex-col bg-background-light h-full">
                <div className="flex-grow">
                    <p className="text-charcoal/80 text-sm italic mb-2 leading-relaxed font-medium">
                        {description}
                    </p>
                </div>

                {/* Bottom aligned content container */}
                <div className="mt-auto flex flex-col justify-end">
                    {/* Dropdown / Accordion for Clinical Purpose & Methodology */}
                    <div className="mb-3 border border-charcoal/10 rounded-xl overflow-hidden bg-white">
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

                    {/* Duration/Pricing Pills */}
                    <div>
                        <span className="text-xs uppercase tracking-widest font-bold text-charcoal/50 dark:text-slate-500 block mb-3">Select Duration</span>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {pricingOptions.map((opt, index) => {
                                const isSelected = index === selectedDurationIndex;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedDurationIndex(index)}
                                        className={`flex-1 min-w-[30%] py-2.5 px-3 rounded-full text-sm font-bold border transition-all duration-200 ring-offset-2 ${isSelected
                                            ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 scale-105'
                                            : 'bg-transparent border-primary/50 text-primary hover:border-primary hover:ring-2 hover:ring-primary/50'
                                            }`}
                                    >
                                        {opt.duration}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Selected Price Highlight and Book Button */}
                        <div className="flex items-center justify-between pt-4 border-t border-charcoal/10 dark:border-white/10">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-charcoal/50 dark:text-slate-500 uppercase tracking-wider">Session Price</span>
                                <span className="text-2xl font-extrabold text-charcoal dark:text-white">${selectedOption.price}</span>
                            </div>
                            <div onClick={handleBookNow} className="w-1/2 min-w-[160px]">
                                <Button5 text="Book Now" theme="dark" className="h-[48px] text-sm !border !border-charcoal/10 !shadow-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
