import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Button5 = ({
  text = "Our Work",
  className,
  asLink = false,
  to = "#",
  href, // external URL opens in new tab
  theme = "dark", // "dark" (bg-white/text-charcoal) or "light" (bg-secondary/text-white)
  size = "default", // "default" or "sm"
  hasWhiteOutline = false,
  onClick,
}) => {
  const isDark = theme === "dark";

  // Base background and text colors based on the theme
  const baseBg = isDark ? "bg-white text-charcoal" : "bg-secondary text-white";

  // Hover container behavior based on theme
  let hoverContainerBg = isDark
    ? "bg-secondary text-charcoal"
    : "bg-white text-secondary rounded-[100px] border-2 border-secondary box-border";

  if (isDark && hasWhiteOutline) {
    hoverContainerBg += " border border-white box-border";
  }

  const ButtonContent = () => (
    <>
      <span
        className='translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block font-medium tracking-widest uppercase'>
        {text}
      </span>
      <div
        className={`flex gap-2 z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-medium tracking-widest uppercase ${hoverContainerBg} ${isDark ? 'rounded-[100px]' : ''}`}>
        <span>{text}</span>
      </div>
    </>
  );

  // 1. Set equal padding on all sides (p-3.5 or p-4 works great here)
  const paddingClass = size === "sm" ? "p-4" : "p-2"; 
  const heightClass = size === "sm" ? "h-auto min-h-[44px]" : "h-[68px]";
  
  // 2. REMOVED the rogue "px-2" that was overriding our layout
  const textSizeClass = size === "sm" ? "text-xs" : "text-sm md:text-base"; 

  const baseClasses = `group relative flex items-center justify-center ${paddingClass} w-full max-w-5xl mx-auto ${heightClass} border border-transparent rounded-[100px] overflow-hidden text-center ${textSizeClass} cursor-pointer shadow-2xl active:scale-[0.98] transition-all duration-300 ${baseBg}`;

  if (asLink) {
    return (
      <Link to={to} className={cn(baseClasses, className)}>
        <ButtonContent />
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cn(baseClasses, className)}>
      <ButtonContent />
    </button>
  );
};