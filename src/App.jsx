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
import ScrollToTop from './ScrollToTop';// Home component housing the original landing page vertically stacked
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

function App() {
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
    </div>
  );
}

export default App;
