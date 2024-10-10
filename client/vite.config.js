// vite.config.js
export default {
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://myserver:3000',  // myserver זה השם של מכולת ה-API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
