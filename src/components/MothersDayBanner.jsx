import { useState, useEffect, useRef } from 'react';

export const SHOW_MOTHERS_DAY_BANNER = true;

const MOTHERS_DAY = new Date('2026-05-10T23:59:59');

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function getTimeLeft(target) {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function CountdownBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white border border-[#f8b4c4] rounded px-3 py-2 min-w-[46px]">
      <span className="text-base font-extrabold text-[#b5294e] leading-none">{pad(value)}</span>
      <span className="text-[10px] text-[#9e6070] uppercase leading-none mt-0.5">{label}</span>
    </div>
  );
}

export default function MothersDayBanner() {
  const [visible, setVisible] = useState(true);
  const bannerRef = useRef(null);
  const { days, hours, minutes, seconds, expired } = useCountdown(MOTHERS_DAY);

  useEffect(() => {
    const el = bannerRef.current;
    if (!el || !visible || expired) {
      document.documentElement.style.setProperty('--banner-h', '0px');
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty('--banner-h', `${entry.contentRect.height}px`);
    });
    observer.observe(el);
    document.documentElement.style.setProperty('--banner-h', `${el.offsetHeight}px`);
    return () => {
      observer.disconnect();
      document.documentElement.style.setProperty('--banner-h', '0px');
    };
  }, [visible, expired]);

  if (!visible || expired) return null;

  const dismiss = () => setVisible(false);

  const countdown = (
    <div className="flex items-center gap-1">
      {days > 0 && <CountdownBlock value={days} label="Days" />}
      <CountdownBlock value={hours} label="Hrs" />
      <CountdownBlock value={minutes} label="Min" />
      <CountdownBlock value={seconds} label="Sec" />
    </div>
  );

  return (
    <div
      ref={bannerRef}
      className="fixed top-0 left-0 w-full z-[60] bg-gradient-to-r from-[#fce4ec] to-[#fff0f3]"
    >
      {/* Desktop layout */}
      <div className="hidden md:block py-3">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌸</span>
            <div>
              <p className="text-sm font-bold tracking-wide text-[#b5294e] uppercase leading-none">
                Mother's Day — May 10
              </p>
              <p className="text-xs text-[#7a3b50] leading-none mt-0.5">
                The perfect gift for Mom · 3D Massage Gift Cards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {days > 0 && <CountdownBlock value={days} label="Days" />}
              <CountdownBlock value={hours} label="Hrs" />
              <CountdownBlock value={minutes} label="Min" />
              <CountdownBlock value={seconds} label="Sec" />
            </div>
            <a
              href="https://booking.3dmassagekaty.com/gift-card"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#213448] text-white text-xs font-bold px-5 py-2 rounded-md whitespace-nowrap hover:opacity-90 transition-opacity"
            >
              Get Gift Card
            </a>
            <button
              onClick={dismiss}
              aria-label="Close banner"
              className="text-[#b5294e] opacity-50 hover:opacity-100 transition-opacity text-sm leading-none p-1"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col px-4 pt-2 pb-2.5 gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🌸</span>
            <div>
              <p className="text-[10px] font-bold tracking-wide text-[#b5294e] uppercase leading-none">
                Mother's Day — May 10
              </p>
              <p className="text-[9px] text-[#7a3b50] leading-none mt-0.5">
                3D Massage Gift Cards
              </p>
            </div>
          </div>
          {countdown}
        </div>
        <div className="flex justify-center">
          <a
            href="https://booking.3dmassagekaty.com/gift-card"
            className="bg-[#213448] text-white text-[10px] font-bold px-8 py-1.5 rounded-md hover:opacity-90 transition-opacity"
          >
            Get Gift Card
          </a>
        </div>
      </div>
    </div>
  );
}
