import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import React from 'react';

interface InputProps extends AntInputProps {
    className?: string;
}

export const Input: React.FC<InputProps> & { 
    TextArea: typeof AntInput.TextArea;
    Password: typeof AntInput.Password;
} = ({ className, ...props }) => {
    return (
        <AntInput className={className} {...props} />
    );
};

Input.TextArea = AntInput.TextArea;
Input.Password = AntInput.Password;
