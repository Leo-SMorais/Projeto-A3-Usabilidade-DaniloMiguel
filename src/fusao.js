// logica de fusao do P5R
import { arcanaResultado, fusoesEspeciais, dlcPicaros, QUALQUER_TESOURO } from './dados/arcanasP5R.js'

// confere se a persona eh demonio do tesouro
function ehTesouro(p) {
  if (!p) return false
  if (p.treasure === true) return true
  if (p.hasOwnProperty('treasureDemonModifier')) return true
  return false
}

// procura receita especifica que use as duas personas como pais
function acharReceitaEspecifica(p1, p2) {
  for (let i = 0; i < fusoesEspeciais.length; i++) {
    const r = fusoesEspeciais[i]
    if (r.pais.includes(p1.name) && r.pais.includes(p2.name) && p1.name !== p2.name) {
      return r
    }
  }
  return null
}

export function calcularFusao(p1, p2, todas) {
  // se nao tem as duas ou sao iguais, nao tem fusao
  if (!p1 || !p2) return null
  if (p1.name === p2.name) return null

  // 1) tenta receita especifica
  const especifica = acharReceitaEspecifica(p1, p2)
  if (especifica) {
    const r = todas.find(p => p.name === especifica.resultado)
    if (r) return r
  }

  const t1 = ehTesouro(p1)
  const t2 = ehTesouro(p2)

  // 2) DLC picaro: persona base + qualquer tesouro = picaro
  if (t1 || t2) {
    const base = t1 ? p2 : p1
    const nomePicaro = dlcPicaros[base.name]
    if (nomePicaro) {
      const up = todas.find(p => p.name === nomePicaro)
      if (up) return up
    }
  }

  // dois tesouros nao podem fundir
  if (t1 && t2) return null

  // 3) tesouro + normal: anda na lista do arcana do base
  if (t1 || t2) {
    const tesouro = t1 ? p1 : p2
    const base = t1 ? p2 : p1
    const aux = []
    for (let i = 0; i < todas.length; i++) {
      const p = todas[i]
      if (p.arcana !== base.arcana) continue
      if (p.special) continue
      if (p.treasure) continue
      if (p.hasOwnProperty('treasureDemonModifier')) continue
      aux.push(p)
    }
    aux.sort((a, b) => a.level - b.level)
    const idx = aux.findIndex(p => p.name === base.name)
    if (idx === -1) return null
    const mod = tesouro.treasureDemonModifier || 0
    const novoIdx = idx + mod
    if (novoIdx < 0 || novoIdx >= aux.length) return null
    return aux[novoIdx]
  }

  // 4) fusao normal por arcana
  const arc = arcanaResultado(p1.arcana, p2.arcana)
  if (!arc) return null

  const lista = []
  for (let i = 0; i < todas.length; i++) {
    const p = todas[i]
    if (p.special) continue
    if (p.treasure) continue
    if (p.hasOwnProperty('treasureDemonModifier')) continue
    lista.push(p)
  }
  lista.sort((a, b) => a.level - b.level)

  const avg = Math.floor((p1.level + p2.level) / 2) + 1

  if (p1.arcana === p2.arcana) {
    // mesma arcana: pega o maior abaixo da media
    const candidatos = lista.filter(p => p.arcana === arc && p.level < avg && p.name !== p1.name && p.name !== p2.name)
    if (candidatos.length === 0) return null
    return candidatos[candidatos.length - 1]
  } else {
    // arcanas diferentes: pega o menor acima da media
    const candidatos = lista.filter(p => p.arcana === arc && p.level >= avg)
    if (candidatos.length === 0) return null
    return candidatos[0]
  }
}

// busca reversa: dado um alvo, retorna todos os pares possiveis
export function buscarReverso(alvo, todas) {
  if (!alvo) return []
  if (ehTesouro(alvo)) return []

  const resultado = []

  // se eh resultado de receita especifica
  const esp = fusoesEspeciais.find(r => r.resultado === alvo.name)
  if (esp) {
    const p1 = todas.find(p => p.name === esp.pais[0])
    const p2 = todas.find(p => p.name === esp.pais[1])
    if (p1 && p2) {
      resultado.push({
        parent1: p1,
        parent2: p2,
        note: 'Receita especial — qualquer par de: ' + esp.pais.join(', ')
      })
    }
  }

  // se eh picaro DLC
  let baseDlc = null
  for (const k of Object.keys(dlcPicaros)) {
    if (dlcPicaros[k] === alvo.name) { baseDlc = k; break }
  }
  if (baseDlc) {
    const p1 = todas.find(p => p.name === baseDlc)
    if (p1) resultado.push({ parent1: p1, parent2: QUALQUER_TESOURO })
  }

  // se nao achou nada e nao eh especial, faz bruteforce
  if (resultado.length === 0 && !alvo.special) {
    for (let i = 0; i < todas.length; i++) {
      for (let j = i + 1; j < todas.length; j++) {
        const p1 = todas[i]
        const p2 = todas[j]
        if (ehTesouro(p1) && ehTesouro(p2)) continue
        const r = calcularFusao(p1, p2, todas)
        if (r && r.name === alvo.name) {
          resultado.push({ parent1: p1, parent2: p2 })
        }
      }
    }
  }

  return resultado
}
