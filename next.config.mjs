/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/works.html', destination: '/works', permanent: true },
      { source: '/directory.html', destination: '/directory', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/work-1.html', destination: '/work-1', permanent: true }
    ];
  }
};

export default nextConfig;
