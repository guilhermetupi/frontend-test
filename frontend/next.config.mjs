/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true
        },
        level: 'verbose',
    }
};

export default nextConfig;
