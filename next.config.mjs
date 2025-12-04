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
};

export default nextConfig;
