'use client';

import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const libraries: ('places' | 'geometry')[] = ['places', 'geometry'];

interface GoogleMapsProviderProps {
    children: React.ReactNode;
}

export default function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        console.error('Google Maps API key is not configured');
        return <>{children}</>;
    }

    return (
        <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            {children}
        </LoadScript>
    );
}

