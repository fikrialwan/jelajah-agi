/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'st2.depositphotos.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
