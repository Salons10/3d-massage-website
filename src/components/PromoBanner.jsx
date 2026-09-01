import { useState, useEffect, useRef } from 'react';
import { WIX_BOOKING_URL } from '../lib/wixClient';

export const SHOW_PROMO_BANNER = true;

const PRIMARY_OFFER_END = new Date('2026-09-30T23:59:59');
const UPGRADE_OFFER_END = new Date('2026-09-10T23:59:59');

function Deadline({ children, className }) {
  return (
    <span
      className={`bg-accent/20 border border-accent/45 text-[#cdd8b8] font-bold rounded-md whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}

function CodeChip({ className }) {
  return (
    <span
      className={`inline-block border border-dashed border-accent/60 text-[#dfe6d2] font-bold tracking-[0.08em] rounded-md whitespace-nowrap ${className}`}
    >
      NEWCLIENT15
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

function UpgradeFootnote({ className }) {
  return (
    <p className={`text-white/60 m-0 leading-snug ${className}`}>
      Already a client? Your next session also comes with a{' '}
      <span className="text-[#bcc9a4] font-bold">free upgrade</span> — Aromatherapy, Pain Relief Balm,
      or Hot Stones. One per client · Ends Sept 10.
    </p>
  );
}

export default function PromoBanner() {
  const [visible, setVisible] = useState(true);
  const bannerRef = useRef(null);
  // Fixed at mount so the banner's own height doesn't change mid-session as
  // midnight passes — each offer just won't appear on the next page load.
  const [primaryExpired] = useState(() => Date.now() > PRIMARY_OFFER_END.getTime());
  const [upgradeExpired] = useState(() => Date.now() > UPGRADE_OFFER_END.getTime());

  // The navbar is fixed and reads `top: var(--banner-h)`. This banner sits in
  // normal document flow, so we publish the height that's *still on screen* —
  // the navbar rides down with the banner, then locks to the top once it's
  // scrolled past.
  useEffect(() => {
    const el = bannerRef.current;
    if (!el || !visible || primaryExpired) {
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
  }, [visible, primaryExpired]);

  // Once the primary offer ends, the whole banner retires — a follow-up-only
  // banner isn't worth the screen space. Until then, the upgrade footnote
  // quietly drops off on its own after Sept 10.
  if (!visible || primaryExpired) return null;

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
      <div className="hidden md:block px-16 pt-6 pb-5 text-center">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#bcc9a4] m-0">
          New to 3D Massage?
        </p>

        <p className="text-[27px] font-black leading-[1.18] mt-1.5 mb-0">
          Get <span className="text-[#bcc9a4]">$15 Off</span> Your First Session
        </p>

        <p className="text-[13px] text-white/75 mt-2.5 mb-0 flex items-center justify-center gap-2 flex-wrap">
          Use code <CodeChip className="text-[11.5px] px-2.5 py-0.5" /> when you book online
        </p>

        <div className="flex items-center justify-center gap-[18px] mt-4">
          <BookNow className="text-[12.5px] tracking-[0.16em] px-10 py-3.5" />
          <Deadline className="text-[12.5px] px-3 py-1">Offer ends Sept 30</Deadline>
        </div>

        {!upgradeExpired && (
          <div className="mt-5 pt-4 border-t border-white/15 max-w-xl mx-auto">
            <UpgradeFootnote className="text-[12px]" />
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 pt-4 pb-4 text-center">
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#bcc9a4] m-0">
          New to 3D Massage?
        </p>

        <p className="text-[17px] font-black leading-[1.25] mt-1 mb-0 px-3">
          Get <span className="text-[#bcc9a4]">$15 Off</span> Your First Session
        </p>

        <p className="text-[11px] text-white/75 mt-2 mb-0 flex items-center justify-center gap-1.5 flex-wrap">
          Use code <CodeChip className="text-[10px] px-2 py-0.5" /> when booking
        </p>

        <Deadline className="inline-block text-[10.5px] px-2.5 py-0.5 mt-2.5">
          Offer ends Sept 30
        </Deadline>

        <BookNow className="block w-full text-[11px] tracking-[0.14em] py-[11px] mt-2.5" />

        {!upgradeExpired && (
          <div className="mt-4 pt-3 border-t border-white/15">
            <UpgradeFootnote className="text-[10px]" />
          </div>
        )}
      </div>
    </div>
  );
}
