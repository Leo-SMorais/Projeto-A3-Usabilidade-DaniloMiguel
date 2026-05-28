// proxy de requisicoes server-side (vercel serverless function).
// uso: /api/proxy?url=<url externa>
export default async function handler(req, res) {
  const url = req.query.url
  if (!url) {
    return res.status(400).json({ erro: 'parametro url ausente' })
  }
  try {
    const r = await fetch(url)
    const texto = await r.text()
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.setHeader('Content-Type', r.headers.get('content-type') || 'application/json')
    res.status(r.status).send(texto)
  } catch (e) {
    res.status(500).json({ erro: 'falha ao buscar', detalhes: String(e) })
  }
}
