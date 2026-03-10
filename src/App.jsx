import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import Therapist from './Therapist';
import Testimonials from './Testimonials';
import ValueProps from './ValueProps';
import Booking from './Booking';
import Footer from './Footer';
import ServicesPage from './ServicesPage';
import ScrollToTop from './ScrollToTop';

// Home component: new section order per user request
const Home = () => (
  <>
    <Hero />
    <Therapist />
    <Services />
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
