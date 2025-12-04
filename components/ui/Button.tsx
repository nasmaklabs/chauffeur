import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import React from 'react';

interface ButtonProps extends AntButtonProps {
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
    return (
        <AntButton className={className} {...props}>
            {children}
        </AntButton>
    );
};
