// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({

//   server: {
//     proxy: {
//       '/api': {
//         target: "http://localhost:3000",
//         secure: false,
//       },
//     },
//   },

//   plugins: [react()],
// })


import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
});
