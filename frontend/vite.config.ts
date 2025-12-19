import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   // Configura el proxy aquí
  //   proxy: {
  //     "/api": {
  //       // Cuando tu frontend pida /api/items/..., Vite lo redirigirá a:
  //       target: "https://tibia.fandom.com/",
  //       changeOrigin: true, // Esto es crucial para que funcione el CORS
  //       rewrite: (path) => path.replace(/^\/api/, ""), // Reescribe la URL para eliminar /api
  //     },
  //   },
  // },
});
