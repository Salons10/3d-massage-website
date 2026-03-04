import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const TestimonialCard = ({ title, description, icon, linkTo = "#" }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePosition({ x, y });

      const rotateX = -(y / rect.height) * 5;
      const rotateY = (x / rect.width) * 5;

      setRotation({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <motion.div
        ref={cardRef}
        className="relative rounded-[32px] overflow-hidden w-full h-full min-h-[300px]"
        style={{
          transformStyle: "preserve-3d",
          backgroundColor: "#2c3b26", // Updated to a deep green fallback
          boxShadow: "0 -10px 100px 10px rgba(64, 79, 61, 0.15), 0 0 10px 0 rgba(0, 0, 0, 0.5)",
        }}
        initial={{ y: 0 }}
        animate={{
          y: isHovered ? -5 : 0,
          rotateX: rotation.x,
          rotateY: rotation.y,
          perspective: 1000,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Base Gradient: Changed from black to Primary Green fading to deep forest green */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ background: "linear-gradient(180deg, #404F3D 0%, #1b2417 90%)" }}
          animate={{ z: -1 }}
        />

        <motion.div
          className="absolute inset-0 opacity-30 mix-blend-overlay z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
          animate={{ z: -0.5 }}
        />

        {/* Primary Green Glows: Expanded to full height and increased intensity */}
        <motion.div
          className="absolute inset-0 z-20"
          style={{
            background: `
              radial-gradient(ellipse at bottom right, rgba(64, 79, 61, 0.95) 0%, rgba(49, 74, 41, 0) 75%),
              radial-gradient(ellipse at bottom left, rgba(49, 74, 41, 0.95) 0%, rgba(27, 36, 23, 0) 75%)
            `,
            filter: "blur(40px)",
          }}
          animate={{
            opacity: isHovered ? 1 : 0.85,
            y: isHovered ? rotation.x * 0.5 : 0,
            z: 0
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        <motion.div
          className="absolute inset-0 z-21"
          style={{
            background: `radial-gradient(circle at bottom center, rgba(64, 79, 61, 1) 0%, rgba(27, 36, 23, 0) 70%)`,
            filter: "blur(45px)",
          }}
          animate={{
            opacity: isHovered ? 0.95 : 0.85,
            y: isHovered ? `calc(5% + ${rotation.x * 0.3}px)` : "5%",
            z: 0
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Bottom border glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-25"
          style={{
            background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.05) 100%)",
          }}
          animate={{
            boxShadow: isHovered
              ? "0 0 20px 4px rgba(64, 79, 61, 0.9), 0 0 30px 6px rgba(49, 74, 41, 0.7)"
              : "0 0 15px 3px rgba(64, 79, 61, 0.8), 0 0 25px 5px rgba(49, 74, 41, 0.6)",
            opacity: isHovered ? 1 : 0.9,
            z: 0.5
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Card content */}
        <motion.div
          className="relative flex flex-col h-full p-6 z-40 justify-between"
          style={{ 
            transform: "translateZ(20px)", /* Gives it a static 3D pop without blurring */
            WebkitFontSmoothing: "antialiased" /* Forces sharper font rendering */
          }}
        >
          {/* Stars */}
          <div className="flex justify-center items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined text-yellow-400 text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            ))}
          </div>

          {/* Text Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.p
              className="text-lg font-medium text-white italic mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 0.9,
                y: 0,
                transition: { duration: 0.8, delay: 0.2 }
              }}
            >
              "{description}"
            </motion.p>

            <motion.h3
              className="text-base font-bold text-[#D9CDBF] uppercase tracking-widest mt-auto mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.4 }
              }}
            >
              {title}
            </motion.h3>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};