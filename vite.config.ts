import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

function backendApiPlugin() {
  const DATA_DIR = path.resolve(__dirname, 'data');
  const DB_FILE = path.join(DATA_DIR, 'school-data.json');
  const UPLOADS_DIR = path.resolve(__dirname, 'uploads');
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

  return {
    name: 'backend-api-plugin',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pathname = url.pathname;

        if (pathname === '/api/data' && req.method === 'GET') {
          if (fs.existsSync(DB_FILE)) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(fs.readFileSync(DB_FILE, 'utf-8'));
            return;
          }
          res.statusCode = 404;
          res.end(JSON.stringify({ error: 'DB not found' }));
          return;
        }

        if (pathname === '/api/save' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => body += chunk);
          req.on('end', () => {
            try {
              const payload = JSON.parse(body);
              let currentDb: Record<string, any> = {};
              if (fs.existsSync(DB_FILE)) {
                try { currentDb = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8')); } catch (_) {}
              }
              if (payload.key && payload.value !== undefined) {
                currentDb[payload.key] = payload.value;
              } else if (payload.allData) {
                currentDb = { ...currentDb, ...payload.allData };
              } else {
                currentDb = { ...currentDb, ...payload };
              }
              fs.writeFileSync(DB_FILE, JSON.stringify(currentDb, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (pathname === '/api/upload' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => body += chunk);
          req.on('end', () => {
            try {
              const { base64 } = JSON.parse(body);
              let ext = '.jpg';
              let rawBase64 = base64;
              const match = base64.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
              if (match) {
                let type = match[1].toLowerCase();
                if (type === 'jpeg') type = 'jpg';
                if (type === 'svg+xml') type = 'svg';
                ext = `.${type}`;
                rawBase64 = match[2];
              }
              const buffer = Buffer.from(rawBase64, 'base64');
              const uniqueName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
              fs.writeFileSync(path.join(UPLOADS_DIR, uniqueName), buffer);
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ success: true, url: `/uploads/${uniqueName}` }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        if (pathname.startsWith('/uploads/')) {
          const filename = path.basename(pathname);
          const filepath = path.join(UPLOADS_DIR, filename);
          if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
            res.setHeader('Content-Type', filename.endsWith('.png') ? 'image/png' : 'image/jpeg');
            fs.createReadStream(filepath).pipe(res);
            return;
          }
          res.statusCode = 404;
          res.end('404 Not Found');
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), backendApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
});
