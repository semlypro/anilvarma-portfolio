/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  
  // Webpack configuration for Sanity v5 compatibility
  webpack: (config, { isServer }) => {
    // Handle media-chrome ESM issues
    config.resolve.alias = {
      ...config.resolve.alias,
      'media-chrome/dist/media-theme-element.js': 'media-chrome',
    };
    
    // Allow importing of media-chrome
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Turbopack configuration for Next.js 16
  turbopack: {
    resolveAlias: {
      'media-chrome/dist/media-theme-element.js': 'media-chrome',
    },
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Transpile packages that need it
  transpilePackages: ['@sanity/vision', 'sanity', '@mux/mux-player', '@mux/mux-player-react', 'media-chrome'],
};

export default nextConfig;
