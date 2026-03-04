import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const GradientCard = ({ title, description, icon, linkTo = "#" }) => {
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
        // Changed height from fixed h-[450px] to responsive h-full min-h-[360px]
        className="relative rounded-[32px] overflow-hidden w-full h-full min-h-[360px]"
        style={{
          transformStyle: "preserve-3d",
          backgroundColor: "#2c3b26", 
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
        <motion.div
          className="absolute inset-0 z-35 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
            backdropFilter: "blur(2px)",
          }}
          animate={{
            opacity: isHovered ? 0.7 : 0.5,
            rotateX: -rotation.x * 0.2,
            rotateY: -rotation.y * 0.2,
            z: 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

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

        {/* Card content - Added anti-aliasing and 3D pop, reduced padding */}
        <motion.div
          className="relative flex flex-col h-full px-6 pt-6 pb-5 z-40"
          style={{ 
            transform: "translateZ(20px)", 
            WebkitFontSmoothing: "antialiased" 
          }}
        >
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-6 text-white"
            style={{
              background: "linear-gradient(225deg, #404F3D 0%, #314a29 100%)",
              position: "relative",
              overflow: "hidden"
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              boxShadow: isHovered
                ? "0 8px 16px -2px rgba(0, 0, 0, 0.4), inset 2px 2px 5px rgba(255, 255, 255, 0.2)"
                : "0 6px 12px -2px rgba(0, 0, 0, 0.3), inset 1px 1px 3px rgba(255, 255, 255, 0.15)",
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="absolute top-0 left-0 w-2/3 h-2/3 opacity-40 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.5),transparent_80%)] pointer-events-none blur-[10px]" />
            <div className="flex items-center justify-center w-full h-full relative z-10 text-xl">
              {icon}
            </div>
          </motion.div>

          <div className="mb-auto">
            <motion.h3
              className="text-2xl font-bold text-white mb-3"
              style={{ letterSpacing: "-0.01em", lineHeight: 1.2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                textShadow: isHovered ? "0 2px 4px rgba(0,0,0,0.5)" : "none",
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.2 }
              }}
            >
              {title}
            </motion.h3>

            <motion.p
              className="text-base mb-6 text-gray-200"
              style={{ lineHeight: 1.6 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 0.9,
                y: 0,
                transition: { duration: 0.8, delay: 0.4 }
              }}
            >
              {description}
            </motion.p>

            {linkTo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 0.9,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.6 }
                }}
                whileHover={{ filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))" }}
              >
                <Link
                  to={linkTo}
                  className="inline-flex items-center text-white text-sm font-bold uppercase tracking-widest group"
                >
                  Learn More
                  <motion.svg
                    className="ml-2 w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <path
                      d="M1 8H15M15 8L8 1M15 8L8 15"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};