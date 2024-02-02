/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'product-data.raiadrogasil.io',
                port: '',
                pathname: '**'
            }
        ]
    }
};

export default nextConfig;


