/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['localhost:3000'],
        },
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
