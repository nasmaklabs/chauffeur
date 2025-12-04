'use client';

import React from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
    return <AntdRegistry>{children}</AntdRegistry>;
};

export default StyledComponentsRegistry;
