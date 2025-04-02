// File: next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true is the default in Next.js 14 and generally recommended
    transpilePackages: ['@radix-ui/react-dialog'],
    reactStrictMode: true,
  
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    },
  };
  
  export default nextConfig;