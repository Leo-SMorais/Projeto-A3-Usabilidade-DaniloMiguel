import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// dev: replica localmente o serverless /api/proxy?url=X (em producao quem responde e a vercel)
function proxyDevPlugin() {
  return {
    name: 'dev-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/proxy', async (req, res) => {
        const qs = (req.url || '').split('?')[1] || ''
        const alvo = new URLSearchParams(qs).get('url')
        if (!alvo) {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ erro: 'parametro url ausente' }))
          return
        }
        try {
          const r = await fetch(alvo)
          const texto = await r.text()
          res.statusCode = r.status
          res.setHeader('Content-Type', r.headers.get('content-type') || 'application/json')
          res.end(texto)
        } catch (e) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ erro: 'falha ao buscar', detalhes: String(e) }))
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), proxyDevPlugin()],
})
