import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "media.acny.uk" },
    ],
  },
  async headers() {
    return [
      {
        // Prototype: belt-and-braces with the noindex metadata and robots.txt.
        // The header also covers non-HTML assets and any client that ignores
        // the meta tag.
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
