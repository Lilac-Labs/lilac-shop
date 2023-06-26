/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["lh3.googleusercontent.com", "vercel.com", "dev-shop-links.s3.us-west-2.amazonaws.com", "production-shopmyshelf-pins.s3.us-east-2.amazonaws.com"],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    // Avoid AWS SDK Node.js require issue
    if (isServer && nextRuntime === "nodejs") {
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      );
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^@aws-sdk\/signature-v4-crt$/ })
      );
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/steven-tey/precedent",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
