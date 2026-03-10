import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-charcoal dark:bg-slate-900 text-white/60 py-12 px-6 lg:px-20 relative overflow-hidden border-t border-white/10 dark:border-white/5">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                {/* Left Column: Brand & Socials */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <img src="/dark-blue-logo.png" alt="3D Massage Logo" className="h-14 w-auto brightness-0 invert" />
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

                {/* Middle Column: Links (Centered) */}
                <div className="flex flex-col md:items-center md:pt-[80px]">
                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Pages</h4>
                            <ul className="space-y-3 text-sm font-medium">
                                <li><a className="hover:text-primary transition-colors" href="/">Home</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services">Services</a></li>
                                <li><a className="hover:text-primary transition-colors" href="https://saalonso811.wixsite.com/my-site-1/book-online" target="_blank" rel="noopener noreferrer">Booking</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Services</h4>
                            <ul className="space-y-3 text-sm font-medium">
                                <li><a className="hover:text-primary transition-colors" href="/services#manual-lymphatic-drainage">Manual Lymphatic Drainage</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#medical-massage">Medical Massage</a></li>
                                <li><a className="hover:text-primary transition-colors" href="/services#russian-sports-massage">Russian Sports Massage</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Info */}
                <div className="flex flex-col md:items-end md:text-right md:pt-[80px]">
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Contact Information</h4>
                    <ul className="space-y-4 text-sm font-medium">
                        <li className="flex items-start gap-3 md:flex-row-reverse">
                            <span className="material-symbols-outlined text-accent">location_on</span>
                            <div>
                                <span className="block mb-1 text-white font-bold">Mason Road Studio:</span>
                                <span>2039 N. Mason RD Suite 602<br />Katy, TX 77449</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-3 md:flex-row-reverse">
                            <span className="material-symbols-outlined text-accent">call</span>
                            <span>(346) 218-9704</span>
                        </li>
                        <li className="flex items-center gap-3 md:flex-row-reverse">
                            <span className="material-symbols-outlined text-accent">mail</span>
                            <span>max@3dmassagekaty.com</span>
                        </li>
                        <li className="flex items-center gap-3 md:flex-row-reverse">
                            <span className="material-symbols-outlined text-accent">schedule</span>
                            <span>Mon-Sun: 9:00 AM - 9:00 PM</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs relative z-10">
                <p>© 2026 3D Massage. All Rights Reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0 font-medium">
                    <a className="hover:text-white" href="#">Privacy Policy</a>
                    <a className="hover:text-white" href="#">Patient Consent</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
