/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
                default-src *;
                script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000;
                style-src 'self' 'unsafe-inline';
                img-src * blob: data:;
                connect-src *;
                font-src 'self';
                frame-src *;
              `
              .replace(/\s{2,}/g, " ")
              .trim(), // compact and clean string
          },
        ],
      },
    ];
  },
};

export default nextConfig;
