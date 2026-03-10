import React from "react";

export const TestimonialCard = ({ title, description }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-sm mx-auto">
      <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8 relative flex-grow flex flex-col items-start mb-6 w-full text-left">
        <div className="flex gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="material-symbols-outlined text-[#213448] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          ))}
        </div>
        <p className="text-charcoal/90 text-[15px] leading-relaxed flex-grow font-medium">
          {description}
        </p>

        {/* The little tail for the speech bubble */}
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: '40px',
          width: '0',
          height: '0',
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
          borderTop: '16px solid white',
          filter: 'drop-shadow(0px 8px 6px rgba(0,0,0,0.03))'
        }}></div>
      </div>

      <div className="flex items-center gap-3 pl-8 text-left">
        <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-charcoal font-bold text-lg overflow-hidden border border-charcoal/10">
          {/* Use fallback initial if we don't have an image avatar */}
          {title.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[15px] text-charcoal">{title}</span>
          <span className="text-xs text-charcoal/50 font-medium tracking-wide">Verified Patient</span>
        </div>
      </div>
    </div>
  );
};