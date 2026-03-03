import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Button5 = ({
  text = "Our Work",
  className,
  asLink = false,
  to = "#"
}) => {
  const ButtonContent = () => (
    <>
      <span
        className='translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block font-medium tracking-widest uppercase'>
        {text}
      </span>
      <div
        className='flex gap-2 text-white bg-[#404F3D] z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-[100px] font-medium tracking-widest uppercase'>
        <span>{text}</span>
      </div>
    </>
  );

  const baseClasses = "group relative flex items-center justify-center p-2 w-full max-w-5xl mx-auto h-[68px] border-none bg-white rounded-[100px] overflow-hidden text-charcoal text-center text-sm md:text-base cursor-pointer shadow-2xl active:scale-[0.98] transition-all duration-300";

  if (asLink) {
    return (
      <Link to={to} className={cn(baseClasses, className)}>
        <ButtonContent />
      </Link>
    );
  }

  return (
    <button className={cn(baseClasses, className)}>
      <ButtonContent />
    </button>
  );
};