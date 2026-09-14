import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    server: {
    host: "0.0.0.0",
    port: 5173,
  },
  plugins: [
    tanstackStart({
      server: {
        entry: "server",
      },
    }),
    react(),
    tailwindcss(),
  ],

  resolve: {
    tsconfigPaths: true,
  },
});
