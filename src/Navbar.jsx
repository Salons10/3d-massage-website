import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Only homepage starts transparent. Inner pages are always solid.
    const isTransparent = location.pathname === '/' && !isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${!isTransparent ? 'bg-background-light/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex-1 flex items-center justify-start">
                    <Link to="/" className="group flex items-center gap-3">
                        <img
                            src="/E79D5A02-F42A-438F-B5EC-A88EE1D5EA4F.png"
                            alt="3D Massage Logo"
                            className={`h-12 md:h-14 w-auto transition-all duration-300 ${isTransparent ? 'brightness-[20] invert contrast-0' : ''}`}
                        />
                    </Link>
                </div>

                {/* Center Nav Links */}
                <div className="hidden lg:flex flex-[2] items-center justify-center gap-12">
                    <Link className={`text-xs md:text-sm font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity ${isTransparent ? 'text-white' : 'text-charcoal'}`} to="/">Home</Link>
                    <Link className={`text-xs md:text-sm font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity ${isTransparent ? 'text-white' : 'text-charcoal'}`} to="/services">Services</Link>
                </div>

                {/* Right Action Icons/Buttons */}
                <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4">
                    <Link to="/booking" className={`hidden sm:flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg ${isTransparent ? 'bg-white text-charcoal hover:bg-white/90 shadow-black/10' : 'bg-primary text-white hover:bg-forest-green shadow-primary/20 hover:-translate-y-0.5'}`}>
                        <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                        Book Now
                    </Link>
                    <a href="tel:346-218-9704" className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${isTransparent ? 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm' : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'}`}>
                        <span className="material-symbols-outlined text-[20px]">call</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
