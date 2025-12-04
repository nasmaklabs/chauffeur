import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import React from 'react';

interface ModalProps extends AntModalProps {
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({ className, children, ...props }) => {
    return (
        <AntModal className={className} {...props}>
            {children}
        </AntModal>
    );
};
