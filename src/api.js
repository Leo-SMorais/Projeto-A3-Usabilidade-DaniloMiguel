// chamadas pras apis dos compendiums
import { nomesEspeciais as especiaisP5 } from './dados/arcanasP5R.js'
import { nomesEspeciais as especiaisP3 } from './dados/arcanasP3R.js'

// marca como especial as personas que nao podem aparecer numa fusao normal
function marcarEspeciais(lista, especiais) {
  return lista.map(p => ({ ...p, special: p.special || especiais.includes(p.name) }))
}

// api do persona 5 royal (passa pelo nosso proxy serverless)
export async function buscarP5R() {
  const apiUrl = 'https://mpppersona5-api.onrender.com/personas/'
  const url = '/api/proxy?url=' + encodeURIComponent(apiUrl)
  const res = await fetch(url)
  const dados = await res.json()
  console.log('personas p5r carregadas:', dados.length)
  return marcarEspeciais(dados, especiaisP5)
}

// api do persona 3 reload (passa pelo nosso proxy serverless)
export async function buscarP3R() {
  const apiUrl = 'https://persona-compendium.onrender.com/personas/'
  const url = '/api/proxy?url=' + encodeURIComponent(apiUrl)
  const res = await fetch(url)
  const dados = await res.json()
  console.log('personas p3r carregadas:', dados.length)
  return marcarEspeciais(dados, especiaisP3)
}
