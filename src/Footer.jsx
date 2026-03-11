import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-charcoal dark:bg-slate-900 text-white/60 py-12 px-6 lg:px-20 relative border-t border-white/10 dark:border-white/5 w-full">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                
                {/* Left Column: Brand & Socials */}
                <div className="flex flex-col">
                    {/* Fixed height container to establish our baseline */}
                    <div className="h-14 flex items-end mb-6">
                        <img src="/dark-blue-logo.png" alt="3D Massage Logo" className="h-full w-auto brightness-0 invert" />
                    </div>
                    <p className="text-white text-sm leading-relaxed mb-6 max-w-sm">
                        Massage therapy in Katy, TX, specializing in deep tissue, sports massage, lymphatic drainage, and targeted pain relief. Over 10 years of experience helping clients move and feel better.
                    </p>
                    <div className="flex gap-4">
                        <a className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center hover:bg-accent hover:text-white transition-all group" href="https://www.facebook.com/profile.php?id=100084530389492" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg className="w-5 h-5 fill-current opacity-100 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Middle Column: Services */}
                <div className="flex flex-col md:items-center">
                    <div className="w-full md:w-auto">
                        {/* Header container matching the logo's height and margin */}
                        <div className="h-14 flex items-end mb-6">
                            <h4 className="text-accent font-bold uppercase tracking-widest text-[14px] leading-none mb-1">Services</h4>
                        </div>
                        
                        {/* Grid for lists placed under the single header */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-16 w-full">
                            {/* Services Column 1 */}
                            <ul className="space-y-3 text-sm font-medium text-white leading-relaxed">
                                <li><a className="hover:text-primary transition-colors" href="/services#manual-lymphatic-drainage">Manual Lymphatic Drainage</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#medical-massage">Medical Massage</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#russian-sports-massage">Russian Sports Massage</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#trigger-point-therapy">Trigger Point Therapy</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#deep-tissue-massage">Deep Tissue Massage</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#swedish-relaxation-massage">Swedish Relaxation Massage</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#reflexology">Reflexology</a></li>
                            </ul>

                            {/* Services Column 2 */}
                            <ul className="space-y-3 text-sm font-medium text-white leading-relaxed">
                                <li><a className="hover:text-primary transition-colors" href="/services#hot-stones-massage">Hot Stones Massage</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#prenatal-massage">Prenatal Massage</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#craniosacral-therapy">Craniosacral Therapy</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#shiatsu">Shiatsu</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#assisted-clinical-stretching">Assisted Clinical Stretching</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#cupping-therapy">Cupping Therapy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Info */}
                <div className="flex flex-col md:items-end md:text-right">
                    {/* Header container matching the logo's height and margin */}
                    <div className="h-14 flex items-end mb-6">
                        <h4 className="text-accent font-bold uppercase tracking-widest text-[14px] leading-none mb-1">Contact Information</h4>
                    </div>
                    
                    <ul className="space-y-4 text-sm font-medium text-white leading-relaxed">
                        <li className="flex items-start gap-3 md:flex-row-reverse">
                            <span className="material-symbols-outlined text-accent">location_on</span>
                            <div>
                                <span className="block mb-1 text-white font-bold">Mason Road Studio</span>
                                <span>2039 North Mason Road Suite 602<br />Katy, TX 77449</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-3 md:flex-row-reverse">
                            <span className="material-symbols-outlined text-accent">call</span>
                            <a href="tel:346-218-9704" className="hover:text-white transition-colors">(346) 218-9704</a>
                        </li>
                        <li className="flex items-center gap-3 md:flex-row-reverse">
                            <span className="material-symbols-outlined text-accent">mail</span>
                            <a href="mailto:max@3dmassagekaty.com" className="hover:text-white transition-colors">max@3dmassagekaty.com</a>
                        </li>
                        <li className="flex items-center gap-3 md:flex-row-reverse">
                            <span className="material-symbols-outlined text-accent">schedule</span>
                            <span>Mon-Sun 9:00 AM - 9:00 PM</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs relative z-10 text-white/60">
                <p>© 2026 3D Massage. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;