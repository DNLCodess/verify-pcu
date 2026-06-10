import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root (multiple lockfiles exist higher up the tree).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
