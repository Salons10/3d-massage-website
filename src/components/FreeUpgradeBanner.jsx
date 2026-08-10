import { useState, useEffect, useRef } from 'react';
import { WIX_BOOKING_URL } from '../lib/wixClient';

export const SHOW_UPGRADE_BANNER = true;

const OFFER_END = new Date('2026-09-10T23:59:59');

const UPGRADES = ['Aromatherapy', 'Pain Relief Balm', 'Hot Stones'];

function Chip({ label, className }) {
  return (
    <span
      className={`bg-white/10 border border-[#bcc9a4]/55 text-[#dfe6d2] font-bold rounded-full ${className}`}
    >
      {label}
    </span>
  );
}

function Deadline({ className }) {
  return (
    <span
      className={`bg-[#a3b087]/20 border border-[#a3b087]/45 text-[#cdd8b8] font-bold rounded-md whitespace-nowrap ${className}`}
    >
      Offer ends Sept 10
    </span>
  );
}

function BookNow({ className }) {
  return (
    <a
      href={WIX_BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block bg-accent text-primary font-black uppercase rounded-full text-center hover:brightness-105 active:scale-[0.98] transition-all duration-300 ${className}`}
    >
      Book Now
    </a>
  );
}

export default function FreeUpgradeBanner() {
  const [visible, setVisible] = useState(true);
  const bannerRef = useRef(null);
  const [expired] = useState(() => Date.now() > OFFER_END.getTime());

  // The navbar is fixed and reads `top: var(--banner-h)`. This banner sits in
  // normal document flow, so we publish the height that's *still on screen* —
  // the navbar rides down with the banner, then locks to the top once it's
  // scrolled past.
  useEffect(() => {
    const el = bannerRef.current;
    if (!el || !visible || expired) {
      document.documentElement.style.setProperty('--banner-h', '0px');
      return;
    }

    let height = el.offsetHeight;
    let ticking = false;

    const publish = () => {
      const remaining = Math.max(0, height - window.scrollY);
      document.documentElement.style.setProperty('--banner-h', `${remaining}px`);
    };

    // Batch scroll-driven writes into one per frame so the navbar tracks
    // scroll 1:1 instead of falling behind on rapid scroll events.
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        publish();
        ticking = false;
      });
    };

    const observer = new ResizeObserver(([entry]) => {
      height = entry.contentRect.height;
      publish();
    });
    observer.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    publish();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      document.documentElement.style.setProperty('--banner-h', '0px');
    };
  }, [visible, expired]);

  if (!visible || expired) return null;

  return (
    <div ref={bannerRef} className="relative w-full bg-primary text-white border-b-2 border-accent">
      <button
        onClick={() => setVisible(false)}
        aria-label="Close banner"
        className="absolute top-2.5 right-3 md:top-3.5 md:right-5 text-white opacity-45 hover:opacity-100 transition-opacity text-sm md:text-[15px] leading-none p-1"
      >
        ✕
      </button>

      {/* Desktop */}
      <div className="hidden md:block px-16 pt-6 pb-6 text-center">
        <p className="text-[27px] font-black leading-[1.18] m-0">
          Your Next Session Comes With a <span className="text-[#bcc9a4]">Free Upgrade</span>
        </p>

        <div className="flex justify-center gap-2.5 mt-3">
          {UPGRADES.map((u) => (
            <Chip key={u} label={u} className="text-sm px-[18px] py-1.5" />
          ))}
        </div>

        <p className="text-[12.5px] text-white/70 mt-3 mb-0">
          One per client · Just let Max know when you come in
        </p>

        <div className="flex items-center justify-center gap-[18px] mt-4">
          <BookNow className="text-[12.5px] tracking-[0.16em] px-10 py-3.5" />
          <Deadline className="text-[12.5px] px-3 py-1" />
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 pt-4 pb-[15px] text-center">
        {/* px-3 keeps the headline clear of the corner-pinned ✕ on both sides,
            so it stays optically centered. */}
        <p className="text-[17px] font-black leading-[1.25] m-0 px-3">
          Your Next Session Comes With a <span className="text-[#bcc9a4]">Free Upgrade</span>
        </p>

        <div className="flex flex-wrap justify-center gap-1.5 mt-2.5">
          {UPGRADES.map((u) => (
            <Chip key={u} label={u} className="text-[11px] px-[11px] py-1" />
          ))}
        </div>

        <p className="text-[10px] leading-[1.35] text-white/70 mt-2 mb-0">
          One per client · Just let Max know when you come in
        </p>

        <Deadline className="inline-block text-[10.5px] px-2.5 py-0.5 mt-2" />

        <BookNow className="block w-full text-[11px] tracking-[0.14em] py-[11px] mt-2.5" />
      </div>
    </div>
  );
}
