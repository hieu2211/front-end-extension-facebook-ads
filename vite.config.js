import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/", // Đường dẫn gốc cho ứng dụng
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
});
