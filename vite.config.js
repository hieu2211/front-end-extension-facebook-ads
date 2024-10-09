import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/", // Đường dẫn gốc cho ứng dụng
  build: {
    outDir: "dist", // Đường dẫn thư mục đầu ra
    assetsDir: "static", // Đổi tên thư mục assets thành static
  },
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
});
