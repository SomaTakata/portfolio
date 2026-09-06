import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {},
};

export default withNextIntl(nextConfig);

// Cloudflare のバインディング (IMAGES など) を `next dev` でも使えるようにする
initOpenNextCloudflareForDev();
