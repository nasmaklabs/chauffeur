import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import React from 'react';

interface CardProps extends AntCardProps {
    className?: string;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
    return (
        <AntCard className={className} {...props}>
            {children}
        </AntCard>
    );
};
