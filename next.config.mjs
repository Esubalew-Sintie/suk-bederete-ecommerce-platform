/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['isecqywtiwzstvxppsbd.supabase.co'],// Allow loading images from localhost
  },
  async rewrites() {
    return [
      {
        // Match any request that starts with /Suk_bederete/media/products/
        source: '/Suk_bederete/media/products/:path*',
        // Forward the request to your Django backend
        destination: 'http://localhost:8000/Suk_bederete/media/products/:path*',
      },
    ];
  },
};

export default nextConfig;
