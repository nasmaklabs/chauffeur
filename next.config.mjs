/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // i18n setup is handled via middleware in App Router usually, 
    // but for next-i18next we might need specific config or just rely on react-i18next
    // For App Router, we often use a middleware approach. 
    transpilePackages: [
        "antd",
        "@ant-design",
        "rc-util",
        "rc-pagination",
        "rc-picker",
        "rc-notification",
        "rc-tooltip",
        "rc-tree",
        "rc-table",
    ],
    // Explicitly set output for Netlify (optional but recommended)
    // The @netlify/plugin-nextjs will handle the build
    
    // CORS configuration
    async headers() {
        return [
            {
                // Apply CORS headers to API routes
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                ],
            },
        ];
    },
};

export default nextConfig;
