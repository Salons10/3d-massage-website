import React from 'react';

const ValueProps = () => {
    const cards = [
        {
            icon: 'assignment',
            title: 'Assessment',
            desc: "We start by understanding your pain, where it is, what causes it, and how it's affecting your daily life. No guesswork."
        },
        {
            icon: 'school',
            title: 'Targeted Treatment',
            desc: "Using the right massage techniques for your situation, from deep tissue and trigger point work to stretching and fascial release."
        },
        {
            icon: 'query_stats',
            title: 'Measurable Progress',
            desc: "We track your improvement session to session: better range of motion, less pain, more mobility. You'll feel the difference."
        },
        {
            icon: 'monitoring',
            title: 'Long-Term Results',
            desc: "We give you stretches and self-care tips to keep your body feeling great between sessions, so the relief actually lasts."
        }
    ];

    return (
        <section className="pt-24 pb-12 px-6 lg:px-20 max-w-[1440px] mx-auto">
            <div className="mb-12 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-primary dark:text-white">How It Works</h2>
            </div>

            {/* RIBBON CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 max-w-[90rem] mx-auto px-2 mt-12 pb-16">
                {cards.map((card, index) => {
                    // Determine conditional border radius for the top corners based on index
                    let borderRadiusClass = "rounded-t-md"; // Default small radius
                    if (index === 0) {
                        borderRadiusClass = "rounded-tl-[4rem] rounded-tr-md"; // First card
                    } 

                    return (
                        <div
                            key={index}
                            className={`group relative w-full mx-auto bg-secondary/10 dark:bg-secondary/20 shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-2 border-white dark:border-slate-700 ${borderRadiusClass} pb-10 pt-12`}
                        >
                            {/* ICON: Absolutely positioned to match the exact height and top offset of the ribbon */}
                            <div className="absolute inset-x-0 top-[32px] h-[30px] flex items-center justify-center pointer-events-none z-10">
                                <span className="material-symbols-outlined text-4xl text-primary/80 dark:text-secondary">
                                    {card.icon}
                                </span>
                            </div>

                            {/* The Top Right Fold/Ribbon detail */}
                            {/* CHANGED: right-[-2.5px] is now right-0 to keep it inside the border */}
                            <div className="absolute right-0 top-[32px] h-[30px] w-[90px] md:w-[120px] pointer-events-none flex items-center">
                                {/* The left slanted angle */}
                                <div
                                    className="h-full w-[15px] bg-accent"
                                    style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
                                ></div>
                                {/* The main body of the ribbon */}
                                <div
                                    className="h-full flex-grow bg-accent -ml-[1px]"
                                ></div>
                            </div>

                            {/* Card Body - Added min-height to the H3 so single-line titles match the height of two-line titles */}
                            <div className="px-8 pb-4 pt-12 mx-auto text-center flex flex-col items-center min-h-[220px] md:min-h-[260px]">
                                <h3 className="font-extrabold text-[#121513] dark:text-white text-xl md:text-2xl mb-4 min-h-[3.5rem] md:min-h-[4rem] flex items-center justify-center">
                                    {card.title}
                                </h3>
                                <p className="text-[#303830] dark:text-slate-300 text-base font-medium leading-relaxed">
                                    {card.desc}
                                </p>
                            </div>

                            {/* The Bottom Ribbon Wrapper */}
                            <div className="absolute top-[100%] left-[-5%] w-[110%] h-[60px] bg-primary grid place-items-center rounded-b-2xl shadow-xl">

                                {/* Left ribbon fold shadow */}
                                <div className="absolute w-[20px] aspect-square bottom-full left-0 -z-10 bg-primary-mid origin-bottom-left rotate-45"></div>
                                {/* Right ribbon fold shadow */}
                                <div className="absolute w-[20px] aspect-square bottom-full right-0 -z-10 bg-primary-mid origin-bottom-right -rotate-45"></div>

                                {/* The Circular Label Badge */}
                                <span className="relative block w-[80px] md:w-[96px] aspect-square bg-white dark:bg-slate-800 rounded-full border-[8px] md:border-[10px] border-primary -translate-y-1/2 grid place-items-center font-black text-2xl md:text-3xl text-primary dark:text-white leading-none z-10 shadow-sm transition-transform duration-300 group-hover:scale-110">
                                    0{index + 1}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ValueProps;