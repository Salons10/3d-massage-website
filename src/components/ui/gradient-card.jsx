import React from "react";
import { Link } from "react-router-dom";

export const GradientCard = ({ title, description, imageUrl, linkTo = "#" }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-charcoal/5 dark:border-white/5 overflow-hidden flex flex-col transform transition duration-300 hover:shadow-2xl hover:-translate-y-1 h-full max-w-sm mx-auto w-full">
      {/* Aspect square for the image area */}
      <div className="aspect-square relative overflow-hidden bg-charcoal">
        <img
          src={imageUrl}
          alt={`${title} session`}
          className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-6 pt-16">
          <h3 className="text-2xl font-bold text-white mb-1 tracking-tight drop-shadow-md">
            {title}
          </h3>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col bg-background-light">
        <p className="text-charcoal/80 text-sm leading-relaxed font-medium mb-6">
          {description}
        </p>

        <div className="mt-auto pt-4 border-t border-charcoal/10">
          <Link
            to={linkTo}
            className="inline-flex items-center text-accent text-sm font-bold uppercase tracking-widest hover:text-primary-mid transition-colors group"
          >
            Learn More
            <span className="material-symbols-outlined ml-1 text-lg group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};