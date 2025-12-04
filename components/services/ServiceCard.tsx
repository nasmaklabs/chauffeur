import React from 'react';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, link }) => {
    return (
        <div className="group p-8 bg-white rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl mb-6 group-hover:bg-primary group-hover:text-secondary transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-secondary mb-3">{title}</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
                {description}
            </p>
            <Link href={link} className="flex items-center gap-2 text-action font-semibold group-hover:gap-3 transition-all">
                Learn More <ArrowRightOutlined />
            </Link>
        </div>
    );
};

export default ServiceCard;
