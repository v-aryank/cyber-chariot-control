import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
  },

  plugins: [
    tailwindcss(),
    tanstackRouter(),
    tanstackStart(),
    nitro(),
    react(),
  ],

  resolve: {
    tsconfigPaths: true,
  },
});