import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Calendar as CalendarIcon, Phone as PhoneIcon } from 'lucide-react';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Therapist from './Therapist';
import Testimonials from './Testimonials';
import ValueProps from './ValueProps';
import Booking from './Booking';
import Footer from './Footer';
import ServicesPage from './ServicesPage';
import BookingPage from './BookingPage';
import ScrollToTop from './ScrollToTop';
import { AnimatedTabBar } from './components/ui/animated-tab-bar';

// Home component housing the original landing page vertically stacked
const Home = () => (
  <>
    <Hero />
    <Services />
    <Therapist />
    <Testimonials />
    <ValueProps />
    <Booking />
  </>
);

const tabItems = [
  {
    color: "#404F3D", // Primary Green
    icon: <HomeIcon className="w-5 h-5" />,
    path: "/"
  },
  {
    color: "#404F3D",
    icon: <span className="material-symbols-outlined text-[20px]">spa</span>,
    path: "/services"
  },
  {
    color: "#404F3D",
    icon: <CalendarIcon className="w-5 h-5" />,
    path: "/booking"
  },
  {
    color: "#404F3D",
    icon: <PhoneIcon className="w-5 h-5" />,
    path: "tel:+1234567890" // Placeholder phone
  }
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  // Sync tab state with current route
  useEffect(() => {
    const currentIndex = tabItems.findIndex(item => item.path === location.pathname);
    if (currentIndex !== -1) {
      setActiveTab(currentIndex);
    }
  }, [location.pathname]);

  const handleTabChange = (index) => {
    setActiveTab(index);
    const path = tabItems[index].path;
    if (path.startsWith('tel:')) {
      window.location.href = path;
    } else {
      navigate(path);
    }
  };

  return (
    <div className="bg-background-light text-charcoal antialiased min-h-screen relative pb-20 md:pb-0">
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
      <Footer />

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-slate-900 border-t border-charcoal/10 dark:border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe-bottom">
        <AnimatedTabBar
          items={tabItems}
          defaultIndex={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
}

export default App;
