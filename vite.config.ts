import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import svgr from "vite-plugin-svgr";
import Pages from "vite-plugin-pages";
import { config } from "dotenv";

config();
const env = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
  server: {
    port: 5173,
    proxy: {
      "/api/directus": {
        target: "https://admin.teletapp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/directus/, ""),
      },
      "/api/bot": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bot/, ""),
      },
    },
  },
  plugins: [react(), svgr(), Pages({ importMode: "sync" })],
});
