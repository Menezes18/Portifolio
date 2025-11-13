import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isGitHubPages = mode === 'production' && process.env.GITHUB_ACTIONS === 'true';
  
  return {
    base: isGitHubPages ? "/Portifolio/" : "/",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(".", "./src"),
      },
    },
  };
});
