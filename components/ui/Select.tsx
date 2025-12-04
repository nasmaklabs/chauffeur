import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import React from 'react';

interface SelectProps extends AntSelectProps {
    className?: string;
}

export const Select: React.FC<SelectProps> & { Option: typeof AntSelect.Option } = ({ className, ...props }) => {
    return (
        <AntSelect className={className} {...props} />
    );
};

Select.Option = AntSelect.Option;
