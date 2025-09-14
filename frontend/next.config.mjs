/** @type {import(''next'').NextConfig} */
const nextConfig = {
  
  async headers() {
    const csp = [
      "default-src ''self''",
      "img-src ''self'' data: blob:",
      "script-src ''self'' ''unsafe-eval''",
      "style-src ''self'' ''unsafe-inline''",
      "font-src ''self'' data:",
      "connect-src ''self'' http://localhost:9400 http://localhost:3000",
      "frame-ancestors ''none''",
      "object-src ''none''",
      "base-uri ''self''"
    ].join('; ');
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Permissions-Policy", value: "geolocation=()" }
        ]
      }
    ];
  },
};
export default nextConfig;


