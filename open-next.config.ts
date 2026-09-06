import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  ...defineCloudflareConfig(),
  // prebuild (ギャラリーのマニフェスト生成) を通すため next build を直接呼ばない
  buildCommand: "bun run build",
};
