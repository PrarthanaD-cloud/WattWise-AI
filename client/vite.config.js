import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({

  plugins: [react()],

  server: {

    proxy: {

      "/api": {

        target:
          "https://wattwise-backend-ut6d.onrender.com",

        changeOrigin: true,

      },

    },

  },

});