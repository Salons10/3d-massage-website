import React, { useState, useRef, useEffect } from 'react';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const recaptchaEnabled =
  RECAPTCHA_SITE_KEY && !RECAPTCHA_SITE_KEY.startsWith('your_');

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState(null);

    const recaptchaContainerRef = useRef(null);
    const recaptchaWidgetId = useRef(null);

    useEffect(() => {
        if (!recaptchaEnabled) return;

        const renderWidget = () => {
            if (
                window.grecaptcha &&
                recaptchaContainerRef.current &&
                recaptchaWidgetId.current === null
            ) {
                recaptchaWidgetId.current = window.grecaptcha.render(
                    recaptchaContainerRef.current,
                    {
                        sitekey: RECAPTCHA_SITE_KEY,
                        callback: (token) => setRecaptchaToken(token),
                        'expired-callback': () => setRecaptchaToken(null),
                        'error-callback': () => setRecaptchaToken(null),
                        theme: 'light',
                    }
                );
            }
        };

        // If grecaptcha is already loaded (e.g. hot reload), render immediately
        if (window.grecaptcha && window.grecaptcha.render) {
            renderWidget();
        } else {
            // Otherwise wait for the onload callback set by the script tag
            window.onRecaptchaLoad = renderWidget;
        }

        return () => {
            // Reset so re-mounting creates a fresh widget
            recaptchaWidgetId.current = null;
        };
    }, []);

    const resetRecaptcha = () => {
        if (recaptchaEnabled && recaptchaWidgetId.current !== null && window.grecaptcha) {
            window.grecaptcha.reset(recaptchaWidgetId.current);
        }
        setRecaptchaToken(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (recaptchaEnabled && !recaptchaToken) {
            setStatus('Error: Please complete the reCAPTCHA before sending.');
            return;
        }

        setIsSubmitting(true);
        setStatus('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, recaptchaToken }),
            });

            if (response.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
                resetRecaptcha();
            } else {
                const data = await response.json();
                setStatus(`Error: ${data.message || 'Something went wrong'}`);
                resetRecaptcha();
            }
        } catch {
            setStatus('Network error. Please try again later.');
            resetRecaptcha();
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus(''), 6000);
        }
    };

    const isError = status.includes('Error') || status.includes('try again') || status.includes('failed');

    return (
        <section id="contact" className="pt-12 pb-24 px-6 lg:px-20 max-w-[1440px] mx-auto bg-background-light relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                {/* Left: Contact Form */}
                <div className="flex flex-col">
                    <span className="inline-block text-accent font-bold tracking-widest text-xs uppercase mb-4">
                        Get In Touch
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-charcoal dark:text-white tracking-tight">Contact Us</h2>
                    <p className="text-charcoal/70 dark:text-slate-400 leading-relaxed mb-8">
                        Have questions about a specific therapy or treatment? Send us a message and we'll get back to you as soon as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-bold text-charcoal uppercase tracking-widest">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full bg-charcoal/5 border border-charcoal/10 rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-bold text-charcoal uppercase tracking-widest">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full bg-charcoal/5 border border-charcoal/10 rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-bold text-charcoal uppercase tracking-widest">Message</label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                rows="4"
                                className="w-full bg-charcoal/5 border border-charcoal/10 rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        {/* reCAPTCHA widget */}
                        {recaptchaEnabled && (
                            <div>
                                <div ref={recaptchaContainerRef}></div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`mt-2 bg-primary hover:bg-primary-mid text-white font-bold tracking-[0.15em] uppercase text-sm py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl self-start w-full sm:w-auto ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        {status && (
                            <p className={`text-sm mt-2 font-bold ${isError ? 'text-red-500' : 'text-accent'}`}>
                                {status}
                            </p>
                        )}
                    </form>
                </div>

                {/* Right: Map */}
                <div className="flex flex-col h-full min-h-[400px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-xl border border-charcoal/10 bg-charcoal/5">
                    <iframe
                        src="https://maps.google.com/maps?q=2039%20N.%20Mason%20Rd%20Suite%20602%20Katy%2C%20TX%2077449&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-full min-h-[400px] border-0"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="3D Massage Location"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default Contact;
