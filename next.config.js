// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            }
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    // Use SWC instead of Babel
    experimental: {
        forceSwcTransforms: true,
    },
    // Temporarily ignore ESLint errors during build
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Add headers for CORS
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                ],
            },
        ];
    },
    // Add webpack configuration for Stripe
    webpack: (config) => {
        if (!config.resolve) {
            config.resolve = {};
        }
        if (!config.resolve.fallback) {
            config.resolve.fallback = {};
        }

        Object.assign(config.resolve.fallback, {
            fs: false,
            net: false,
            tls: false,
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            url: require.resolve('url'),
            zlib: require.resolve('browserify-zlib'),
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            assert: require.resolve('assert'),
            os: require.resolve('os-browserify'),
            path: require.resolve('path-browserify'),
            'process/browser': require.resolve('process/browser'),
        });

        return config;
    },
};

module.exports = nextConfig;
