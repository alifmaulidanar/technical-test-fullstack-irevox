/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uyduzjungsstvpgqwitc.supabase.co",
      },
    ],
  },
};

export default nextConfig;
