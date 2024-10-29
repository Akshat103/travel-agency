// vite.config.js
import { defineConfig } from "file:///home/drax/Desktop/stoild/travel-agency/client/travel-agency/node_modules/vite/dist/node/index.js";
import react from "file:///home/drax/Desktop/stoild/travel-agency/client/travel-agency/node_modules/@vitejs/plugin-react/dist/index.mjs";
import compression from "file:///home/drax/Desktop/stoild/travel-agency/client/travel-agency/node_modules/vite-plugin-compression/dist/index.mjs";
import pluginPurgeCss from "file:///home/drax/Desktop/stoild/travel-agency/client/travel-agency/node_modules/@mojojoejo/vite-plugin-purgecss/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    compression({ algorithm: "gzip" }),
    pluginPurgeCss({
      variables: true
    })
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://13.202.215.205:5000/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kcmF4L0Rlc2t0b3Avc3RvaWxkL3RyYXZlbC1hZ2VuY3kvY2xpZW50L3RyYXZlbC1hZ2VuY3lcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2RyYXgvRGVza3RvcC9zdG9pbGQvdHJhdmVsLWFnZW5jeS9jbGllbnQvdHJhdmVsLWFnZW5jeS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9kcmF4L0Rlc2t0b3Avc3RvaWxkL3RyYXZlbC1hZ2VuY3kvY2xpZW50L3RyYXZlbC1hZ2VuY3kvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJztcbmltcG9ydCBwbHVnaW5QdXJnZUNzcyBmcm9tIFwiQG1vam9qb2Vqby92aXRlLXBsdWdpbi1wdXJnZWNzc1wiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgY29tcHJlc3Npb24oeyBhbGdvcml0aG06ICdnemlwJyB9KSxcbiAgICBwbHVnaW5QdXJnZUNzcyh7XG4gICAgICB2YXJpYWJsZXM6IHRydWUsXG4gICAgfSksXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzEzLjIwMi4yMTUuMjA1OjUwMDAvYXBpJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgfSxcbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXNXLFNBQVMsb0JBQW9CO0FBQ25ZLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLG9CQUFvQjtBQUczQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixZQUFZLEVBQUUsV0FBVyxPQUFPLENBQUM7QUFBQSxJQUNqQyxlQUFlO0FBQUEsTUFDYixXQUFXO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
