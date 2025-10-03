import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import vuetify from "vite-plugin-vuetify";
import svgLoader from "vite-svg-loader";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    tailwindcss(),
    vuetify({
      styles: {
        configFile: "src/assets/styles/variables/_vuetify.scss",
      },
    }),
    Components({
      dirs: ["src/@core/components", "src/components"],
      dts: true,
      resolvers: [
        (componentName) => {
          if (componentName === "VueApexCharts")
            return {
              name: "default",
              from: "vue3-apexcharts",
              as: "VueApexCharts",
            };
        },
      ],
    }),

    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core", "@vueuse/math", "pinia"],
      vueTemplate: true,
      ignore: ["useCookies", "useStorage"],
    }),
    svgLoader(),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@core": fileURLToPath(new URL("./src/@core", import.meta.url)),
      "@layouts": fileURLToPath(new URL("./src/@layouts", import.meta.url)),
      "@images": fileURLToPath(
        new URL("./src/assets/images/", import.meta.url)
      ),
      "@styles": fileURLToPath(
        new URL("./src/assets/styles/", import.meta.url)
      ),
    },
  },
  build: {
    chunkSizeWarningLimit: 5000,
  },
  optimizeDeps: {
    exclude: ["vuetify"],
    entries: ["./src/**/*.vue"],
  },
  server: {
    port: 9834,
    host: true,
    strictPort: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["mixed-decls"],
      },
    },
  },
});
