import React from 'react';

const ShapeDivider = ({ position = 'bottom', color = 'var(--color-background-light)', darkColor = 'var(--color-background-dark)', flip = false, className = '' }) => {

    const positionClass = position === 'top' ? 'top-0 left-0' : 'bottom-0 left-0';
    const flipClass = flip ? 'scale-x-[-1]' : '';
    const rotationClass = position === 'top' ? 'rotate-180' : '';

    return (
        <div className={`absolute w-full overflow-hidden leading-[0] z-20 ${positionClass} ${rotationClass} ${className}`}>
            <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className={`relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px] ${flipClass}`}
            >
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    className="transition-colors duration-300"
                    shapeRendering="geometricPrecision"
                    style={{ fill: color }}
                ></path>
            </svg>
        </div>
    );
};

export default ShapeDivider;