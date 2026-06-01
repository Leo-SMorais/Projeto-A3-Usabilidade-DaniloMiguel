import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { buscarP3R } from '../api.js'
import LoaderP3R from '../components/LoaderP3R.jsx'

const MAX_TENTATIVAS = 6
const CHAVE_DIARIO = 'p3r_wordle_daily'

function dataHoje() {
  return new Date().toISOString().split('T')[0]
}

// hash simples pra escolher a persona do dia
function hashData(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = s.charCodeAt(i) + ((h << 5) - h)
  }
  return Math.abs(h)
}

function pegarImunidades(p) {
  return [...(p.nullifies || []), ...(p.reflects || []), ...(p.absorbs || [])]
}

function compararArrays(a, b) {
  if (!a || !b) return 'errado'
  if (a.length === 0 && b.length === 0) return 'correto'
  if (a.length === 0 || b.length === 0) return 'errado'
  const x = [...a].sort()
  const y = [...b].sort()
  if (JSON.stringify(x) === JSON.stringify(y)) return 'correto'
  // se tem pelo menos um em comum, eh parcial
  for (const it of a) {
    if (b.includes(it)) return 'parcial'
  }
  return 'errado'
}

function avaliar(palpite, alvo) {
  const imuneP = pegarImunidades(palpite)
  const imuneA = pegarImunidades(alvo)
  return {
    persona: palpite,
    arcana: palpite.arcana === alvo.arcana ? 'correto' : 'errado',
    nivel: {
      status: palpite.level === alvo.level ? 'correto' : 'errado',
      seta: palpite.level === alvo.level ? '' : (palpite.level < alvo.level ? '⬆️' : '⬇️')
    },
    weak: compararArrays(palpite.weak, alvo.weak),
    resists: compararArrays(palpite.resists, alvo.resists),
    imune: compararArrays(imuneP, imuneA),
  }
}

function formatar(arr) {
  return arr && arr.length > 0 ? arr.join(', ') : 'None'
}

function classeCor(status) {
  if (status === 'correto') return 'celula-correto'
  if (status === 'parcial') return 'celula-parcial'
  return 'celula-errado'
}

export default function P3RGuess() {
  const [personas, setPersonas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [modo, setModo] = useState('treino')
  const [alvo, setAlvo] = useState(null)
  const [palpites, setPalpites] = useState([])
  const [input, setInput] = useState('')
  const [autoAberto, setAutoAberto] = useState(false)
  const [acabou, setAcabou] = useState(false)
  const [ganhou, setGanhou] = useState(false)

  useEffect(() => {
    buscarP3R()
      .then(lista => { setPersonas(lista); setCarregando(false) })
      .catch(e => { setErro(e); setCarregando(false) })
  }, [])

  // exclui DLC do pool de palpites
  const palpitaveis = personas.filter(p => p.dlc !== 1)

  // escolhe o alvo conforme o modo / personas carregadas
  useEffect(() => {
    if (palpitaveis.length === 0) return

    if (modo === 'diario') {
      const hoje = dataHoje()
      const idx = hashData(hoje) % palpitaveis.length
      const t = palpitaveis[idx]
      setAlvo(t)
      // recupera palpites de hoje se tiver
      try {
        const salvo = JSON.parse(localStorage.getItem(CHAVE_DIARIO) || 'null')
        if (salvo && salvo.date === hoje && Array.isArray(salvo.guesses)) {
          const recuperado = []
          for (const nome of salvo.guesses) {
            const p = palpitaveis.find(x => x.name === nome)
            if (p) recuperado.push(avaliar(p, t))
          }
          setPalpites(recuperado)
          const ultimo = recuperado[recuperado.length - 1]
          if (ultimo && ultimo.persona.name === t.name) {
            setGanhou(true); setAcabou(true)
          } else if (recuperado.length >= MAX_TENTATIVAS) {
            setGanhou(false); setAcabou(true)
          }
        } else {
          setPalpites([]); setAcabou(false); setGanhou(false)
        }
      } catch {
        setPalpites([]); setAcabou(false); setGanhou(false)
      }
    } else {
      // treino: sorteia
      const idx = Math.floor(Math.random() * palpitaveis.length)
      setAlvo(palpitaveis[idx])
      setPalpites([]); setAcabou(false); setGanhou(false)
    }
    setInput('')
  // eslint-disable-next-line
  }, [modo, personas.length])

  function salvarDiario(novos) {
    if (modo !== 'diario') return
    try {
      localStorage.setItem(CHAVE_DIARIO, JSON.stringify({
        date: dataHoje(),
        guesses: novos.map(g => g.persona.name)
      }))
    } catch {}
  }

  function enviar(nome) {
    if (acabou || !alvo) return
    const p = palpitaveis.find(x => x.name === nome)
    if (!p) return
    if (palpites.some(g => g.persona.name === p.name)) return
    const ev = avaliar(p, alvo)
    const novos = [...palpites, ev]
    setPalpites(novos)
    salvarDiario(novos)
    setInput('')
    setAutoAberto(false)
    if (ev.persona.name === alvo.name) { setGanhou(true); setAcabou(true) }
    else if (novos.length >= MAX_TENTATIVAS) { setGanhou(false); setAcabou(true) }
  }

  function novamente() {
    if (modo === 'diario') return
    const idx = Math.floor(Math.random() * palpitaveis.length)
    setAlvo(palpitaveis[idx])
    setPalpites([])
    setAcabou(false)
    setGanhou(false)
    setInput('')
  }

  if (carregando) return <LoaderP3R />

  // autocomplete inline
  const q = input.trim().toLowerCase()
  let matches = []
  if (q.length >= 1) {
    const jaTentadas = palpites.map(g => g.persona.name)
    matches = palpitaveis.filter(p => p.name.toLowerCase().includes(q) && !jaTentadas.includes(p.name)).slice(0, 10)
  }

  const vazias = Math.max(0, MAX_TENTATIVAS - palpites.length)

  return (
    <div className="pagina-p3">
      <header className="cabecalho cabecalho-p3">
        <Link to="/p3r" className="voltar-p3">← P3R</Link>
        <h1 className="titulo-p3" style={{ fontSize: '2rem' }}>Persona Guess</h1>
        <div className="subtitulo" style={{ color: '#b3d9ff' }}>Adivinhe em 6 tentativas</div>
      </header>

      {erro && <div className="aviso-erro">Erro ao carregar.</div>}

      <div className="modos">
        <button type="button" className={'modo-btn ' + (modo === 'diario' ? 'modo-ativo' : '')} onClick={() => setModo('diario')}>🌙 Diário</button>
        <button type="button" className={'modo-btn ' + (modo === 'treino' ? 'modo-ativo' : '')} onClick={() => setModo('treino')}>⚔️ Treino</button>
      </div>

      <div className="status-linha">
        <span className="status-texto">
          {acabou
            ? (ganhou ? '✨ Missão Concluída!' : '🌑 Dark Hour Acabou!')
            : 'Tentativa ' + (palpites.length + 1) + ' de ' + MAX_TENTATIVAS}
        </span>
        {modo === 'treino' && acabou && (
          <button type="button" className="botao-jogar-de-novo" onClick={novamente}>Jogar Novamente</button>
        )}
      </div>

      <div className="guess-input-wrapper">
        <input
          type="text"
          className="guess-input"
          placeholder={acabou ? ('A persona era: ' + (alvo ? alvo.name : '')) : 'Digite o nome de uma persona...'}
          value={input}
          onChange={e => { setInput(e.target.value); setAutoAberto(true) }}
          onFocus={() => setAutoAberto(true)}
          onBlur={() => setTimeout(() => setAutoAberto(false), 150)}
          disabled={acabou}
        />
        {autoAberto && matches.length > 0 && (
          <div className="guess-autocomplete">
            {matches.map(p => (
              <button key={p.name} type="button" className="guess-autocomplete-item"
                onMouseDown={e => { e.preventDefault(); enviar(p.name) }}>
                {p.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="guess-grade">
        <div className="guess-header-celula">Nome</div>
        <div className="guess-header-celula">Arcana</div>
        <div className="guess-header-celula">Nível</div>
        <div className="guess-header-celula">Fraqueza</div>
        <div className="guess-header-celula">Resiste</div>
        <div className="guess-header-celula">Imunidade</div>

        {palpites.map((g, i) => (
          <Linha key={i} ev={g} />
        ))}

        {Array.from({ length: vazias }).map((_, i) => (
          <LinhaVazia key={'v' + i} />
        ))}
      </div>

      <p className="legenda">
        <span className="legenda-bolinha celula-correto" /> Igual{'   '}
        <span className="legenda-bolinha celula-parcial" /> Parcial{'   '}
        <span className="legenda-bolinha celula-errado" /> Diferente
      </p>
    </div>
  )
}

function Linha({ ev }) {
  const p = ev.persona
  return (
    <>
      <div className="guess-celula celula-nome">{p.name}</div>
      <div className={'guess-celula ' + classeCor(ev.arcana)}>{p.arcana}</div>
      <div className={'guess-celula ' + classeCor(ev.nivel.status)}>{p.level} {ev.nivel.seta}</div>
      <div className={'guess-celula ' + classeCor(ev.weak)}>{formatar(p.weak)}</div>
      <div className={'guess-celula ' + classeCor(ev.resists)}>{formatar(p.resists)}</div>
      <div className={'guess-celula ' + classeCor(ev.imune)}>{formatar(pegarImunidades(p))}</div>
    </>
  )
}

function LinhaVazia() {
  return (
    <>
      <div className="guess-celula celula-vazia">—</div>
      <div className="guess-celula celula-vazia">—</div>
      <div className="guess-celula celula-vazia">—</div>
      <div className="guess-celula celula-vazia">—</div>
      <div className="guess-celula celula-vazia">—</div>
      <div className="guess-celula celula-vazia">—</div>
    </>
  )
}
