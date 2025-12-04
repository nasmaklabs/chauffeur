import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    background?: 'white' | 'gray' | 'dark';
}

const Section: React.FC<SectionProps> = ({ children, className = '', id, background = 'white' }) => {
    const bgColors = {
        white: 'bg-white',
        gray: 'bg-surface', // Uses CSS variable for light gray
        dark: 'bg-secondary text-white',
    };

    return (
        <section id={id} className={`py-16 md:py-24 ${bgColors[background]} ${className}`}>
            <div className="container mx-auto px-4">
                {children}
            </div>
        </section>
    );
};

export default Section;
