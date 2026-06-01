// logica de fusao do P3R (mais simples, nao tem tesouro)
import { arcanaResultado, fusoesEspeciais } from './dados/arcanasP3R.js'

function ehDlc(p) {
  return p && p.dlc === 1
}

function acharReceita(p1, p2) {
  for (let i = 0; i < fusoesEspeciais.length; i++) {
    const r = fusoesEspeciais[i]
    if (r.pais.length !== 2) continue
    if (r.pais.includes(p1.name) && r.pais.includes(p2.name) && p1.name !== p2.name) {
      return r
    }
  }
  return null
}

export function calcularFusao(p1, p2, todas) {
  if (!p1 || !p2) return null
  if (p1.name === p2.name) return null

  // tenta receita especial primeiro
  const esp = acharReceita(p1, p2)
  if (esp) {
    const r = todas.find(p => p.name === esp.resultado)
    if (r) return r
  }

  const arc = arcanaResultado(p1.arcana, p2.arcana)
  if (!arc) return null

  // tira DLC e especiais do pool
  const pool = []
  for (let i = 0; i < todas.length; i++) {
    const p = todas[i]
    if (p.arcana !== arc) continue
    if (p.special) continue
    if (ehDlc(p)) continue
    pool.push(p)
  }
  pool.sort((a, b) => a.level - b.level)

  const avg = Math.floor((p1.level + p2.level) / 2) + 1

  if (p1.arcana === p2.arcana) {
    const validos = pool.filter(p => p.level < avg && p.name !== p1.name && p.name !== p2.name)
    if (validos.length === 0) return null
    return validos[validos.length - 1]
  } else {
    const acima = pool.filter(p => p.level >= avg)
    if (acima.length > 0) return acima[0]
    // se nao tem ninguem acima, pega o maior
    if (pool.length > 0) return pool[pool.length - 1]
    return null
  }
}

export function buscarReverso(alvo, todas) {
  if (!alvo) return []

  const resultado = []

  // se for especial: receita unica
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
    return resultado
  }

  if (alvo.special) return []

  // bruteforce
  for (let i = 0; i < todas.length; i++) {
    for (let j = i + 1; j < todas.length; j++) {
      const p1 = todas[i]
      const p2 = todas[j]
      if (p1.special || p2.special) continue
      if (ehDlc(p1) || ehDlc(p2)) continue
      const r = calcularFusao(p1, p2, todas)
      if (r && r.name === alvo.name) {
        resultado.push({ parent1: p1, parent2: p2 })
        if (resultado.length >= 25) return resultado
      }
    }
  }

  return resultado
}
