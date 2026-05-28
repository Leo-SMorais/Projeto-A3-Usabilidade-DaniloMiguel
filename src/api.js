// chamada pra api do p5r (passa pelo nosso proxy serverless)
export async function buscarP5R() {
  const apiUrl = 'https://mpppersona5-api.onrender.com/personas/'
  const url = '/api/proxy?url=' + encodeURIComponent(apiUrl)
  const res = await fetch(url)
  const dados = await res.json()
  console.log('personas p5r carregadas:', dados.length)
  return dados
}
