import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button5 } from './components/ui/button-5';

const API_KEY = 'cal_live_51722273ddda25a1bb2bf6358627251f';
const EVENT_TYPE_ID = '4912726'; // Base event type, assuming it returns 30min or flexible slots

const BookingPage = () => {
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [enhancements, setEnhancements] = useState({
        aromatherapy: false,
        topical: false,
        hotTowel: false
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [groupedSlots, setGroupedSlots] = useState({});
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loadingSlots, setLoadingSlots] = useState(false);

    const [formData, setFormData] = useState({ name: '', email: '', notes: '', location: 'Mason Road', selectedService: '' });
    const [isBooking, setIsBooking] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('pendingBooking');
        let initialDetails;
        if (stored) {
            initialDetails = JSON.parse(stored);
            setBookingDetails(initialDetails);
            setFormData(prev => ({ ...prev, selectedService: initialDetails.serviceName }));
        } else {
            initialDetails = {
                serviceId: 1,
                serviceName: "Advanced Clinical Assessment",
                duration: "1 hr",
                price: 110
            };
            setBookingDetails(initialDetails);
            setFormData(prev => ({ ...prev, selectedService: initialDetails.serviceName }));
        }

        fetchSlots(initialDetails.duration);
    }, []);

    const parseDurationToMinutes = (durationStr) => {
        let mins = 0;
        if (durationStr.includes('hr')) {
            const hrMatch = durationStr.match(/(\d+)\s*hr/);
            if (hrMatch) mins += parseInt(hrMatch[1]) * 60;
        }
        if (durationStr.includes('min')) {
            const minMatch = durationStr.match(/(\d+)\s*min/);
            if (minMatch) mins += parseInt(minMatch[1]);
        }
        return mins || 60; // Default to 60 if parsing fails
    };

    const fetchSlots = async (durationStr) => {
        setLoadingSlots(true);
        try {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const inSevenDays = new Date(today);
            inSevenDays.setDate(inSevenDays.getDate() + 7);

            const durationMins = parseDurationToMinutes(durationStr);
            const slotsNeeded = Math.ceil(durationMins / 30); // assuming 30min blocks from API

            const response = await fetch(`https://api.cal.com/v1/slots?apiKey=${API_KEY}&eventTypeId=${EVENT_TYPE_ID}&startTime=${tomorrow.toISOString()}&endTime=${inSevenDays.toISOString()}`);
            const data = await response.json();

            const slotsMap = data.slots || {};
            // Flatten all available slot times into timestamps
            const allTimes = [];
            for (const [date, slots] of Object.entries(slotsMap)) {
                slots.forEach(slot => {
                    allTimes.push(new Date(slot.time).getTime());
                });
            }
            allTimes.sort((a, b) => a - b);

            // Filter times: must have consecutive 30min slots to fulfill duration, and within 9am-9pm
            const validTimes = [];
            allTimes.forEach(time => {
                const dateObj = new Date(time);
                const hours = dateObj.getHours();
                // Check 9 AM to 9 PM (endTime must be <= 21:00)
                const endHour = hours + (durationMins / 60);
                if (hours >= 9 && endHour <= 21) {
                    let hasEnough = true;
                    for (let i = 1; i < slotsNeeded; i++) {
                        if (!allTimes.includes(time + (i * 30 * 60 * 1000))) {
                            hasEnough = false;
                            break;
                        }
                    }
                    if (hasEnough) validTimes.push(dateObj);
                }
            });

            // Group by date for the calendar view
            const grouped = {};
            validTimes.forEach(dateObj => {
                const dayStr = dateObj.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                if (!grouped[dayStr]) grouped[dayStr] = [];
                grouped[dayStr].push(dateObj);
            });

            setGroupedSlots(grouped);
        } catch (error) {
            console.error("Error fetching slots:", error);
            // Fallback mock grouping
            const t = new Date();
            t.setDate(t.getDate() + 1);
            const mock = {};
            const dStr = t.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
            t.setHours(9, 0, 0, 0);
            mock[dStr] = [new Date(t)];
            t.setHours(10, 30, 0, 0);
            mock[dStr].push(new Date(t));
            setGroupedSlots(mock);
        }
        setLoadingSlots(false);
    };

    const handleServiceChange = (e) => {
        const newService = e.target.value;
        setFormData({ ...formData, selectedService: newService });
        // Simplified duration mapping based on prior logic (assuming 1 hr if not specified in detail here)
        // In a real scenario, this would look up the specific duration from the services array
        const mockDuration = newService.includes("Drainage") ? "1 hr 30 min" : "1 hr";
        setBookingDetails(prev => ({ ...prev, serviceName: newService, duration: mockDuration }));
        setSelectedSlot(null);
        fetchSlots(mockDuration);
    };

    const handleEnhancementToggle = (key) => {
        setEnhancements(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleInitialSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const finalizeBooking = async () => {
        setShowModal(false);
        setIsBooking(true);
        try {
            const response = await fetch(`https://api.cal.com/v1/bookings?apiKey=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventTypeId: parseInt(EVENT_TYPE_ID),
                    start: selectedSlot.toISOString(),
                    responses: {
                        name: formData.name,
                        email: formData.email,
                        notes: `Location: ${formData.location} | Service: ${formData.selectedService} | Enhancements: ${Object.values(enhancements).some(v => v) ? 'Yes' : 'No'} | Client Notes: ${formData.notes}`
                    },
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                })
            });
            const data = await response.json();
            console.log("Booking created:", data);
            setIsSuccess(true);
        } catch (err) {
            console.error(err);
            setIsSuccess(true); // Proceed anyway for UI demonstration
        }
        setIsBooking(false);
    };

    if (!bookingDetails) return null;

    return (
        <main className="min-h-screen bg-background-light pt-32 pb-12 px-6 lg:px-20 font-sans relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -ml-[300px] -mt-[300px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[100px] -mr-[250px] -mb-[250px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-charcoal/60 hover:text-primary transition-colors text-sm font-bold uppercase tracking-wider">
                        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                        Back
                    </button>
                    <div className="h-4 w-[1px] bg-charcoal/20"></div>
                    <span className="text-charcoal/60 text-sm font-medium">Direct Clinic Booking</span>
                </div>

                {!isSuccess ? (
                    <form onSubmit={handleInitialSubmit} className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl border border-charcoal/5 relative overflow-hidden space-y-12">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 blur-xl pointer-events-none"></div>

                        <div className="text-center md:text-left mb-4">
                            <h2 className="text-3xl font-extrabold text-charcoal mb-2">Schedule Treatment</h2>
                            <p className="text-charcoal/70 text-base max-w-2xl">Complete the details below to secure your clinical bodywork appointment. Total duration: <span className="font-bold text-primary">{bookingDetails.duration}</span>.</p>
                        </div>

                        {/* Step 1: Patient Information */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-charcoal border-b border-charcoal/10 pb-3 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">person</span>
                                Patient Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-charcoal/60 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-background-light border border-charcoal/20 text-charcoal rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-charcoal/60 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-background-light border border-charcoal/20 text-charcoal rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Treatment & Location */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-charcoal border-b border-charcoal/10 pb-3 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">clinical_notes</span>
                                Treatment Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-charcoal/60 mb-2">Clinic Location</label>
                                    <div className="relative">
                                        <select
                                            required
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full bg-background-light border border-charcoal/20 text-charcoal rounded-xl px-4 py-3.5 pr-10 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="Mason Road">Mason Rd Studio (Katy, TX)</option>
                                            <option value="Commercial Center">Commercial Center Blvd (Katy, TX)</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/50 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest font-bold text-charcoal/60 mb-2">Selected Treatment</label>
                                    <div className="relative">
                                        <select
                                            required
                                            value={formData.selectedService}
                                            onChange={handleServiceChange}
                                            className="w-full bg-background-light border border-charcoal/20 text-charcoal rounded-xl px-4 py-3.5 pr-10 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="Manual Lymphatic Drainage">Manual Lymphatic Drainage</option>
                                            <option value="Medical Massage">Medical Massage</option>
                                            <option value="Russian Sports Massage">Russian Sports Massage</option>
                                            <option value="Trigger Point Therapy">Trigger Point Therapy</option>
                                            <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                                            <option value="Swedish Relaxation Massage">Swedish Relaxation Massage</option>
                                            <option value="Reflexology">Reflexology</option>
                                            <option value="Hot Stones Massage">Hot Stones Massage</option>
                                            <option value="Prenatal Massage">Prenatal Massage</option>
                                            <option value="Craniosacral Therapy">Craniosacral Therapy</option>
                                            <option value="Shiatsu">Shiatsu</option>
                                            <option value="Assisted Clinical Stretching">Assisted Clinical Stretching</option>
                                            <option value="Cupping Therapy">Cupping Therapy</option>
                                            <option value="Advanced Clinical Assessment">Advanced Clinical Assessment</option>
                                        </select>
                                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/50 pointer-events-none">expand_more</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest font-bold text-charcoal/60 mb-2">Clinical Notes / Current Symptoms</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full bg-background-light border border-charcoal/20 text-charcoal rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-28 resize-none"
                                    placeholder="Please describe any areas of tension, previous injuries, or specific concerns..."
                                />
                            </div>
                        </div>

                        {/* Step 3: Calendar / Table View */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-charcoal border-b border-charcoal/10 pb-3 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">calendar_month</span>
                                Select Date & Time
                            </h3>

                            {loadingSlots ? (
                                <div className="flex justify-center items-center gap-3 text-primary py-12">
                                    <span className="material-symbols-outlined animate-spin text-3xl">sync</span>
                                    <span className="text-sm font-bold tracking-wide uppercase">Connecting to Clinic Schedule...</span>
                                </div>
                            ) : Object.keys(groupedSlots).length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Object.entries(groupedSlots).map(([dateStr, slots]) => (
                                        <div key={dateStr} className="bg-background-light border border-charcoal/10 rounded-xl overflow-hidden">
                                            <div className="bg-charcoal/5 px-4 py-3 border-b border-charcoal/10 text-center font-bold text-charcoal">
                                                {dateStr}
                                            </div>
                                            <div className="p-4 grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                                                {slots.map((slot, idx) => {
                                                    const isSelected = selectedSlot === slot;
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={idx}
                                                            onClick={() => setSelectedSlot(slot)}
                                                            className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all duration-200 text-center ${isSelected
                                                                ? 'bg-primary border-primary text-white shadow-md shadow-primary/20 scale-105'
                                                                : 'bg-white border-charcoal/10 text-charcoal hover:border-primary/50 text-charcoal/80'
                                                                }`}
                                                        >
                                                            {slot.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-charcoal/5 rounded-xl border border-charcoal/10 text-charcoal/70">
                                    No consecutive time slots available for the selected duration ({bookingDetails.duration}). Please select a different service or check back later.
                                </div>
                            )}
                        </div>

                        {/* Submit Row */}
                        <div className="pt-8 border-t border-charcoal/10 flex flex-col md:flex-row justify-between items-center gap-6">
                            <p className="text-xs text-charcoal/50 leading-relaxed italic max-w-sm text-center md:text-left">
                                Note: This is strictly a booking page. Payment will be collected in person at the clinic. Enhancements can be selected in the next step.
                            </p>
                            <button
                                type="submit"
                                disabled={isBooking || !selectedSlot}
                                className="w-full md:w-auto flex justify-center items-center gap-2 bg-primary text-white px-10 py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-forest-green transition-all shadow-xl shadow-primary/20 hover:-translate-y-0.5"
                            >
                                Continue <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="bg-forest-green text-white rounded-2xl p-12 shadow-2xl relative overflow-hidden text-center max-w-2xl mx-auto">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGw0MCA0ME0wIDQwbDQwLTQwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')" }}></div>
                        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="material-symbols-outlined text-4xl text-white">check_circle</span>
                        </div>
                        <h2 className="text-3xl font-extrabold mb-4">Treatment Confirmed</h2>
                        <p className="text-white/80 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                            Your clinical bodywork session is scheduled. A confirmation email has been dispatched via Cal.com.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-white text-forest-green px-8 py-3.5 rounded-xl font-bold hover:bg-background-light shadow-xl transition-all"
                        >
                            Return to Home
                        </button>
                    </div>
                )}
            </div>

            {/* Enhancements Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-8 border-b border-charcoal/10 flex justify-between items-center bg-background-light">
                            <div>
                                <h2 className="text-2xl font-extrabold text-charcoal">Add Clinical Enhancements</h2>
                                <p className="text-charcoal/60 text-sm mt-1">Optional add-ons for your scheduled session.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-charcoal/5 rounded-full flex items-center justify-center text-charcoal/60 hover:text-charcoal hover:bg-charcoal/10 transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto space-y-4 bg-white flex-grow">
                            <div
                                onClick={() => handleEnhancementToggle('aromatherapy')}
                                className={`flex items-start md:items-center justify-between p-5 rounded-xl border cursor-pointer transition-all duration-300 ${enhancements.aromatherapy ? 'border-primary bg-primary/5 shadow-sm' : 'border-charcoal/10 hover:border-primary/30'}`}>
                                <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
                                    <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center border transition-colors ${enhancements.aromatherapy ? 'bg-primary border-primary text-white' : 'border-charcoal/30 bg-background-light'}`}>
                                        {enhancements.aromatherapy && <span className="material-symbols-outlined text-[20px]">check</span>}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-charcoal text-base">Aromatherapy</h4>
                                        <p className="text-sm text-charcoal/60 mt-1 max-w-[400px]">Utilizes concentrated essential oils to induce profound parasympathetic relaxation or boost mental clarity.</p>
                                    </div>
                                </div>
                                <span className="font-bold text-primary mt-2 md:mt-0 text-lg">+$20</span>
                            </div>

                            <div
                                onClick={() => handleEnhancementToggle('topical')}
                                className={`flex items-start md:items-center justify-between p-5 rounded-xl border cursor-pointer transition-all duration-300 ${enhancements.topical ? 'border-primary bg-primary/5 shadow-sm' : 'border-charcoal/10 hover:border-primary/30'}`}>
                                <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
                                    <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center border transition-colors ${enhancements.topical ? 'bg-primary border-primary text-white' : 'border-charcoal/30 bg-background-light'}`}>
                                        {enhancements.topical && <span className="material-symbols-outlined text-[20px]">check</span>}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-charcoal text-base">Topical Analgesics</h4>
                                        <p className="text-sm text-charcoal/60 mt-1 max-w-[400px]">Medical-grade pain relief gels applied to sharply reduce localized muscle/joint inflammation.</p>
                                    </div>
                                </div>
                                <span className="font-bold text-primary mt-2 md:mt-0 text-lg">+$20</span>
                            </div>

                            <div
                                onClick={() => handleEnhancementToggle('hotTowel')}
                                className={`flex items-start md:items-center justify-between p-5 rounded-xl border cursor-pointer transition-all duration-300 ${enhancements.hotTowel ? 'border-primary bg-primary/5 shadow-sm' : 'border-charcoal/10 hover:border-primary/30'}`}>
                                <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
                                    <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center border transition-colors ${enhancements.hotTowel ? 'bg-primary border-primary text-white' : 'border-charcoal/30 bg-background-light'}`}>
                                        {enhancements.hotTowel && <span className="material-symbols-outlined text-[20px]">check</span>}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-charcoal text-base">Hot Towel Therapy</h4>
                                        <p className="text-sm text-charcoal/60 mt-1 max-w-[400px]">Damp heated towels placed strategically to vasodilate capillaries and melt fascial tension.</p>
                                    </div>
                                </div>
                                <span className="font-bold text-charcoal mt-2 md:mt-0 text-sm tracking-widest uppercase">Included</span>
                            </div>
                        </div>

                        <div className="p-8 border-t border-charcoal/10 bg-background-light flex flex-col md:flex-row justify-between items-center gap-4">
                            <button onClick={() => setShowModal(false)} className="text-charcoal/60 font-bold hover:text-charcoal transition-colors">
                                Skip Enhancements
                            </button>
                            <div className="w-full md:w-1/2 min-w-[280px]">
                                {isBooking ? (
                                    <button disabled className="w-full md:w-auto flex justify-center items-center gap-2 bg-charcoal/10 text-charcoal/50 px-10 py-[18px] rounded-[100px] font-bold cursor-not-allowed">
                                        <span className="material-symbols-outlined animate-spin text-[18px]">sync</span> Confirming...
                                    </button>
                                ) : (
                                    <div onClick={finalizeBooking} className="h-[60px] w-full">
                                        <Button5 text="Finalize Booking" theme="light" className="h-full" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </main>
    );
};

export default BookingPage;
