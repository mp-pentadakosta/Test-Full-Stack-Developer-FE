/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
        ], // Tambahkan domain yang diperlukan
    },
    env:{
        BASE_URL: process.env.BASE_URL,
    },
};

module.exports = nextConfig;
