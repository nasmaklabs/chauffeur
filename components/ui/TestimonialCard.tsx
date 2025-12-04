import React from 'react';
import Image from 'next/image';
import { StarFilled } from '@ant-design/icons';

interface TestimonialCardProps {
    name: string;
    role?: string;
    image?: string;
    rating: number;
    text: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, image, rating, text }) => {
    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
            <div className="flex gap-1 text-primary mb-4">
                {[...Array(5)].map((_, i) => (
                    <StarFilled key={i} className={i < rating ? 'text-primary' : 'text-gray-200'} />
                ))}
            </div>

            <p className="text-gray-600 italic mb-6 flex-grow leading-relaxed">
                "{text}"
            </p>

            <div className="flex items-center gap-4 mt-auto">
                {image ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                        <Image src={image} alt={name} fill className="object-cover" />
                    </div>
                ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        {name.charAt(0)}
                    </div>
                )}
                <div>
                    <h4 className="font-bold text-secondary">{name}</h4>
                    {role && <p className="text-xs text-gray-500">{role}</p>}
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
