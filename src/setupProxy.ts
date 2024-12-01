import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application } from 'express';

// Ensure `process.env.REACT_APP_PROXY_URL` exists in type definitions
if (!process.env.REACT_APP_PROXY_URL) {
  throw new Error('REACT_APP_PROXY_URL is not defined in the environment variables.');
}

const proxyUrl = process.env.REACT_APP_PROXY_URL;

module.exports = function (app: Application) {
  app.use(
    'http://localhost:3000', // Match the API prefix path
    createProxyMiddleware({
      target: proxyUrl,
      changeOrigin: true
    })
  );
};
