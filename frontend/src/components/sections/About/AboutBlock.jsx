import React from "react";

// Pointing hand icon matching the style
const PointerIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-primary mt-1 shrink-0">
        <path d="M4 11h2V9h2V7h4v2h2v2h2v4h-2v2h-2v2H8v-2H6v-2H4v-4z" fill="currentColor" fillOpacity="0.2" />
        <path d="M4 11h2V9h2V7h4v2h2v2h2v4h-2v2h-2v2H8v-2H6v-2H4v-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter"/>
        <path d="M12 11h4M12 13h4" stroke="currentColor" strokeWidth="2" />
    </svg>
);

const UnderlinedTitle = ({ children, className = "" }) => (
    <h2 className={`relative inline-block pb-4 ${className}`}>
        <span className="relative z-10">{children}</span>
        <svg
            aria-hidden="true"
            viewBox="0 0 300 24"
            preserveAspectRatio="none"
            className="absolute left-0 -bottom-1 h-4 w-full min-w-40 text-[#F1F45A]"
            fill="none"
        >
            <path d="M4 14C56 9 112 16 165 12C212 10 254 11 296 13" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
            <path d="M6 18C65 14 122 20 178 16C223 13 260 15 294 17" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
        </svg>
    </h2>
);

function AboutBlock({ title, subtitle, text, image, imagePosition }) {
    return (
        <section 
            className={`flex flex-col lg:flex-row shadow-sm bg-gris-anthracite overflow-hidden ${
                imagePosition === "left" ? "lg:flex-row-reverse" : ""
            }`}
        >
            {/* Text Content Area */}
            <div className="flex-1 w-full p-8 md:p-16 lg:p-24 xl:px-32 flex flex-col justify-center space-y-8 bg-gris-anthracite">
                <header>
                    <UnderlinedTitle className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 leading-tight tracking-tight">
                        {title}
                    </UnderlinedTitle>
                    {subtitle && (
                        <h3 className="text-2xl md:text-3xl font-semibold text-gray-100 mt-4">
                            {subtitle}
                        </h3>
                    )}
                </header>
                
                <div className="flex flex-col gap-8 md:gap-10">
                    {text.split('\n\n').map((paragraph, index) => (
                        <div key={index} className="flex gap-5 items-start">
                            <PointerIcon />
                            <div 
                                className="text-xl md:text-2xl text-gray-100 leading-normal"
                                dangerouslySetInnerHTML={{ __html: paragraph }} 
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Image Content Area */}
            <div className="flex-1 w-full min-h-100 lg:min-h-150 relative">
                <img 
                    src={image} 
                    alt={title} 
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                />
            </div>
        </section>
    );
}

export default AboutBlock;