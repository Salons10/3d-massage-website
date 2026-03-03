import React from 'react';

const Footer = () => {
    return (
        <>
            {/* Location & Maps */}
            <section className="py-24 bg-background-light dark:bg-background-dark/50">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
                    <div className="space-y-8 flex flex-col justify-center">
                        <div>
                            <span className="text-primary font-bold tracking-widest text-xs uppercase block mb-4">
                                Clinical Practice
                            </span>
                            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-charcoal dark:text-white">
                                Specialized Treatment Facility in Katy
                            </h2>
                            <p className="text-lg text-charcoal/70 dark:text-slate-300 leading-relaxed max-w-lg font-medium">
                                Our modern space is designed to support the clinical process while maintaining a welcoming, premium atmosphere. Accessible parking available right at the entrance.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-charcoal/5 dark:border-white/5 space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined">location_on</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1 text-charcoal dark:text-white">Mason Road Studio</h4>
                                    <p className="text-charcoal/70 dark:text-slate-400 font-medium mb-4">2039 N. Mason RD Suite 602<br />Katy, TX 77449</p>

                                    <h4 className="font-bold text-xl mb-1 text-charcoal dark:text-white">Commercial Center Clinic</h4>
                                    <p className="text-charcoal/70 dark:text-slate-400 font-medium">2643 Commercial Center Blvd B340<br />Katy, TX 77494</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined">schedule</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1 text-charcoal dark:text-white">Active Hours</h4>
                                    <p className="text-charcoal/70 dark:text-slate-400 font-medium">Mon-Sun: 9:00 AM - 9:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group min-h-[500px]">
                        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-forest-green transform transition group-hover:scale-[1.01] duration-500">
                            <iframe
                                title="Google Maps Location of 3D Massage Katy TX"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.5986897931343!2d-95.74805762335471!3d29.84700097496034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640d12e8c257b47%3A0x8ac7c3a0bcb54366!2s2039%20N%20Mason%20Rd%20%23602%2C%20Katy%2C%20TX%2077449!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Actual Footer */}
            <footer className="bg-charcoal text-white/60 py-20 px-6 lg:px-20">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
                    {/* Brand & Contact Info Column */}
                    <div className="md:col-span-12 lg:col-span-4">
                        <div className="flex items-center gap-3 mb-8">
                            <img src="/E79D5A02-F42A-438F-B5EC-A88EE1D5EA4F.png" alt="3D Massage Logo" className="h-10 w-auto brightness-0 invert" />
                        </div>
                        <p className="text-sm leading-relaxed mb-8 max-w-sm">
                            Premium evidence-based clinical massage therapy serving the Katy, TX community with targeted care for chronic pain and physical rehabilitation.
                        </p>
                        <ul className="space-y-4 text-sm font-medium mb-8">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <div>
                                    <span className="block mb-1 text-white font-bold">Mason Road:</span>
                                    <span className="block mb-3">2039 N. Mason RD Suite 602<br />Katy, TX 77449</span>
                                    <span className="block mb-1 text-white font-bold">Commercial Center:</span>
                                    <span className="block mb-2">2643 Commercial Center Blvd B340<br />Katy, TX 77494</span>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">call</span>
                                <span>(346) 218-9704</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">mail</span>
                                <span>max@3dmassagekaty.com</span>
                            </li>
                        </ul>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                                <span className="material-symbols-outlined text-xl">social_leaderboard</span>
                            </a>
                            <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                                <span className="material-symbols-outlined text-xl">photo_camera</span>
                            </a>
                        </div>
                    </div>

                    {/* Pages Column */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Pages</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><a className="hover:text-primary transition-colors" href="/">Home</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services">Services</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/booking">Booking</a></li>
                        </ul>
                    </div>

                    {/* Services Column */}
                    <div className="md:col-span-8 lg:col-span-5">
                        <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Clinical Services</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm font-medium">
                            <li><a className="hover:text-primary transition-colors" href="/services#manual-lymphatic-drainage">Manual Lymphatic Drainage</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#medical-massage">Medical Massage</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#russian-sports-massage">Russian Sports Massage</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#trigger-point-therapy">Trigger Point Therapy</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#deep-tissue-massage">Deep Tissue Massage</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#swedish-relaxation-massage">Swedish Relaxation Massage</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#reflexology">Reflexology</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#hot-stones-massage">Hot Stones Massage</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#prenatal-massage">Prenatal Massage</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#craniosacral-therapy">Craniosacral Therapy</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#shiatsu">Shiatsu</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#assisted-clinical-stretching">Assisted Clinical Stretching</a></li>
                            <li><a className="hover:text-primary transition-colors" href="/services#cupping-therapy">Cupping Therapy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-[1440px] mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>© 2026 3D Massage. All Rights Reserved. Not medical advice.</p>
                    <div className="flex gap-6 mt-4 md:mt-0 font-medium">
                        <a className="hover:text-white" href="#">Privacy Policy</a>
                        <a className="hover:text-white" href="#">Patient Consent</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
