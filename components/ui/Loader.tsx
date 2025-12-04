'use client';

import React, { useState, useEffect } from 'react';
import { useLoadingStore } from '@/lib/store/loadingStore';

const Loader = () => {
    const isLoading = useLoadingStore(state => state.isLoading);
    const [messageIndex, setMessageIndex] = useState(0);

    const messages = [
        "Your luxury ride is on the way...",
        "Preparing your chauffeur...",
        "Getting everything ready...",
        "Almost there...",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2000); // Change message every 2 seconds

        return () => clearInterval(interval);
    }, [messages.length]);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-xl">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    {/* Realistic Sports Car with Shading */}
                    <svg
                        width="90"
                        height="55"
                        viewBox="0 0 180 110"
                        className="taxi-animation"
                    >
                        <defs>
                            <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
                                <stop offset="50%" stopColor="#F7C600" stopOpacity="1" />
                                <stop offset="100%" stopColor="#E6B800" stopOpacity="1" />
                            </linearGradient>
                            <linearGradient id="windowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#2A2A2A" stopOpacity="0.6" />
                                <stop offset="50%" stopColor="#1A1A1A" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.8" />
                            </linearGradient>
                            <linearGradient id="topHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#FFE066" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#F7C600" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 25 65 Q 28 48, 38 52 Q 55 58, 75 55 Q 95 53, 115 55 Q 135 58, 145 52 Q 152 48, 155 65 L 155 82 L 25 82 Z"
                            fill="url(#carBodyGradient)"
                            stroke="#E6B800"
                            strokeWidth="0.5"
                        />
                        
                        <path
                            d="M 30 60 Q 35 50, 45 52 Q 60 54, 80 52 Q 100 50, 120 52 Q 135 54, 150 52 Q 152 50, 155 60"
                            fill="url(#topHighlight)"
                        />
                        
                        <ellipse
                            cx="32"
                            cy="60"
                            rx="18"
                            ry="15"
                            fill="url(#carBodyGradient)"
                        />
                        
                        <ellipse
                            cx="148"
                            cy="60"
                            rx="18"
                            ry="15"
                            fill="url(#carBodyGradient)"
                        />
                        
                        <path
                            d="M 45 55 Q 60 42, 80 44 Q 100 42, 135 44 Q 145 42, 150 55"
                            stroke="url(#carBodyGradient)"
                            strokeWidth="20"
                            fill="none"
                            strokeLinecap="round"
                        />
                        
                        <path
                            d="M 50 53 Q 62 45, 75 47"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        <path
                            d="M 50 53 L 75 47 L 75 56 L 50 60 Z"
                            fill="url(#windowGradient)"
                        />
                        <path
                            d="M 52 54 L 73 48"
                            stroke="#FFFFFF"
                            strokeWidth="1"
                            opacity="0.3"
                        />
                        
                        <path
                            d="M 75 47 Q 95 45, 130 47"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        <path
                            d="M 75 47 L 130 47 L 130 56 L 75 56 Z"
                            fill="url(#windowGradient)"
                        />
                        <path
                            d="M 77 48 L 128 48"
                            stroke="#FFFFFF"
                            strokeWidth="1"
                            opacity="0.3"
                        />
                        
                        <line
                            x1="75"
                            y1="56"
                            x2="75"
                            y2="82"
                            stroke="#1A1A1A"
                            strokeWidth="1"
                            opacity="0.3"
                        />
                        
                        <path
                            d="M 80 60 L 95 60 L 95 72 L 80 72 Z"
                            fill="#1A1A1A"
                            opacity="0.5"
                        />
                        <line
                            x1="87.5"
                            y1="60"
                            x2="87.5"
                            y2="72"
                            stroke="#2A2A2A"
                            strokeWidth="0.5"
                        />
                        
                        <path
                            d="M 22 63 Q 24 60, 28 63"
                            stroke="#1A1A1A"
                            strokeWidth="2"
                            fill="none"
                            opacity="0.6"
                        />
                        <rect
                            x="24"
                            y="63"
                            width="10"
                            height="5"
                            fill="#1A1A1A"
                            opacity="0.4"
                            rx="1"
                        />
                        <line
                            x1="26"
                            y1="63"
                            x2="26"
                            y2="68"
                            stroke="#2A2A2A"
                            strokeWidth="0.5"
                        />
                        <line
                            x1="32"
                            y1="63"
                            x2="32"
                            y2="68"
                            stroke="#2A2A2A"
                            strokeWidth="0.5"
                        />
                        
                        <g className="wheel-spin" style={{ transformOrigin: '38px 88px' }}>
                            <circle
                                cx="38"
                                cy="88"
                                r="13"
                                fill="#0A0A0A"
                            />
                            <circle
                                cx="38"
                                cy="88"
                                r="11.5"
                                fill="none"
                                stroke="#1A1A1A"
                                strokeWidth="0.5"
                            />
                            {/* Rim Outer */}
                            <circle
                                cx="38"
                                cy="88"
                                r="10"
                                fill="#1A1A1A"
                            />
                            {/* Rim Inner */}
                            <circle
                                cx="38"
                                cy="88"
                                r="7.5"
                                fill="#2A2A2A"
                            />
                            {/* Rim Center */}
                            <circle
                                cx="38"
                                cy="88"
                                r="5"
                                fill="#FFFFFF"
                            />
                            {/* Hub */}
                            <circle
                                cx="38"
                                cy="88"
                                r="3"
                                fill="#1A1A1A"
                            />
                            <line
                                x1="38"
                                y1="88"
                                x2="38"
                                y2="81"
                                stroke="#1A1A1A"
                                strokeWidth="1.5"
                            />
                            <line
                                x1="38"
                                y1="88"
                                x2="45"
                                y2="88"
                                stroke="#1A1A1A"
                                strokeWidth="1.5"
                            />
                            <line
                                x1="38"
                                y1="88"
                                x2="38"
                                y2="95"
                                stroke="#1A1A1A"
                                strokeWidth="1.5"
                            />
                            <line
                                x1="38"
                                y1="88"
                                x2="31"
                                y2="88"
                                stroke="#1A1A1A"
                                strokeWidth="1.5"
                            />
                        </g>
                        
                        <g className="wheel-spin" style={{ transformOrigin: '142px 88px' }}>
                            <circle
                                cx="142"
                                cy="88"
                                r="13"
                                fill="#0A0A0A"
                            />
                            <circle
                                cx="142"
                                cy="88"
                                r="11.5"
                                fill="none"
                                stroke="#1A1A1A"
                                strokeWidth="0.5"
                            />
                            {/* Rim Outer */}
                            <circle
                                cx="142"
                                cy="88"
                                r="10"
                                fill="#1A1A1A"
                            />
                            {/* Rim Inner */}
                            <circle
                                cx="142"
                                cy="88"
                                r="7.5"
                                fill="#2A2A2A"
                            />
                            {/* Rim Center */}
                            <circle
                                cx="142"
                                cy="88"
                                r="5"
                                fill="#FFFFFF"
                            />
                            {/* Hub */}
                            <circle
                                cx="142"
                                cy="88"
                                r="3"
                                fill="#1A1A1A"
                            />
                            <line
                                x1="142"
                                y1="88"
                                x2="142"
                                y2="81"
                                stroke="#1A1A1A"
                                strokeWidth="1.5"
                            />
                            <line
                                x1="142"
                                y1="88"
                                x2="149"
                                y2="88"
                                stroke="#1A1A1A"
                                strokeWidth="1.5"
                            />
                            <line
                                x1="142"
                                y1="88"
                                x2="142"
                                y2="95"
                                stroke="#1A1A1A"
                                strokeWidth="1.5"
                            />
                            <line
                                x1="142"
                                y1="88"
                                x2="135"
                                y2="88"
                                stroke="#1A1A1A"
                                strokeWidth="1.5"
                            />
                        </g>
                        
                        <circle
                            cx="85"
                            cy="50"
                            r="7"
                            fill="#1A1A1A"
                        />
                        <circle
                            cx="85"
                            cy="50"
                            r="6"
                            fill="none"
                            stroke="#2A2A2A"
                            strokeWidth="0.5"
                        />
                        
                        <ellipse
                            cx="20"
                            cy="62"
                            rx="4"
                            ry="6"
                            fill="#FFFFFF"
                            opacity="0.95"
                        />
                        <ellipse
                            cx="20"
                            cy="62"
                            rx="2.5"
                            ry="4"
                            fill="#E0E0E0"
                            opacity="0.8"
                        />
                        
                        <ellipse
                            cx="158"
                            cy="62"
                            rx="5"
                            ry="7"
                            fill="#DC2626"
                            opacity="0.95"
                        />
                        <ellipse
                            cx="158"
                            cy="62"
                            rx="3"
                            ry="5"
                            fill="#FF4444"
                            opacity="0.6"
                        />
                        
                        <rect
                            x="150"
                            y="52"
                            width="10"
                            height="4"
                            fill="#1A1A1A"
                            opacity="0.7"
                            rx="1"
                        />
                        <rect
                            x="152"
                            y="50"
                            width="6"
                            height="2"
                            fill="#1A1A1A"
                            opacity="0.5"
                            rx="1"
                        />
                        
                        <line
                            x1="30"
                            y1="75"
                            x2="160"
                            y2="75"
                            stroke="#1A1A1A"
                            strokeWidth="2"
                            opacity="0.3"
                        />
                        
                        <ellipse
                            cx="75"
                            cy="48"
                            rx="2"
                            ry="3"
                            fill="#1A1A1A"
                            opacity="0.6"
                        />
                    </svg>
                </div>
                <div className="text-white text-base font-medium loading-text-fade text-center max-w-xs px-4">
                    {messages[messageIndex]}
                </div>
                <div className="flex gap-2 mt-2">
                    {messages.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 w-8 rounded-full transition-all duration-300 ${
                                idx === messageIndex ? 'bg-primary' : 'bg-white/30'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Loader;

