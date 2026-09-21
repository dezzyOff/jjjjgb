import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import https from 'node:https';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const binProxy = {
    name: 'bin-table-proxy',
    configureServer(server) {
      server.middlewares.use('/api/bin', (request, response) => {
        const match = request.url?.match(/^\/(\d{6,11})(?:\?.*)?$/);
        const apiKey = env.BIN_TABLE_API_KEY;
        if (!match || !apiKey) {
          response.statusCode = 400;
          response.end(JSON.stringify({ message: 'Некорректный BIN или отсутствует API key.' }));
          return;
        }

        const upstream = https.get(`https://api.bintable.com/v1/${match[1]}?api_key=${encodeURIComponent(apiKey)}`, (upstreamResponse) => {
          response.statusCode = upstreamResponse.statusCode || 502;
          response.setHeader('Content-Type', 'application/json');
          upstreamResponse.pipe(response);
        });
        upstream.on('error', () => {
          response.statusCode = 502;
          response.end(JSON.stringify({ message: 'BIN API недоступен.' }));
        });
      });
    }
  };

  return { plugins: [react(), binProxy] };
});