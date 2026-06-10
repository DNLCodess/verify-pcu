import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root (multiple lockfiles exist higher up the tree).
  turbopack: {
    root: path.join(__dirname),
  },
  // NOTE: do not set `output: "export"` - this app uses Server Actions to query
  // Postgres, which require a running server. Static export disables them.
};

export default nextConfig;
