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
import Contact from './Contact';

const Home = () => (
  <>
    <Hero />
    <Therapist />
    <Services />
    <Testimonials />
    <ValueProps />
    <Booking />
    <Contact />
  </>
);

function App() {
  return (
    /* FIXED: 
       1. Added 'flex flex-col' to create a vertical stack.
       2. Removed 'pb-20' which was creating that white gap on mobile.
       3. 'min-h-screen' now works correctly with 'flex-grow' to push the footer down.
    */
    <div className="bg-background-light text-charcoal antialiased min-h-screen flex flex-col relative">
      <Navbar />
      <ScrollToTop />
      
      {/* 'flex-grow' tells the main content to take up all available space, pushing Footer to bottom */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;