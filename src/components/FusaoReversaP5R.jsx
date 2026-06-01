import { useState } from 'react'
import BuscaPersona from './BuscaPersona.jsx'
import { buscarReverso } from '../fusao.js'

// busca reversa do p5r
export default function FusaoReversaP5R({ personas, onMostrar }) {
  const [alvo, setAlvo] = useState(null)
  const [receitas, setReceitas] = useState(null)
  const [procurando, setProcurando] = useState(false)
  const [msg, setMsg] = useState('')

  function procurar() {
    setMsg('')
    setReceitas(null)
    if (!alvo) { setMsg('Selecione uma persona alvo.'); return }
    if (alvo.treasure || alvo.hasOwnProperty('treasureDemonModifier')) {
      setMsg('Demônios do Tesouro não podem ser produzidos por fusão.')
      return
    }
    setProcurando(true)
    // pequeno delay pra mostrar o "procurando"
    setTimeout(() => {
      const r = buscarReverso(alvo, personas)
      setReceitas(r)
      setProcurando(false)
      if (r.length === 0) setMsg('Essa persona não pode ser gerada por fusão normal.')
    }, 10)
  }

  function clicavel(p) {
    return p && p.arcana !== 'Treasure'
  }

  return (
    <div className="painel">
      <h2 className="painel-titulo">Busca de Registros</h2>
      <BuscaPersona personas={personas} value={alvo} onChange={setAlvo} label="Persona Alvo" placeholder="Quem você deseja criar?" />
      <button type="button" className="botao-calc" onClick={procurar} disabled={procurando} style={{ marginTop: '1rem' }}>
        {procurando ? 'Procurando...' : 'Procurar Registros'}
      </button>
      {msg && <div className="msg-erro">{msg}</div>}
      {receitas && receitas.length > 0 && (
        <ul className="receitas">
          {receitas.map((r, i) => (
            <li key={i} className="receita">
              {r.note && <div className="receita-nota">{r.note}</div>}
              <div className="receita-par">
                <div className="receita-lado">
                  {clicavel(r.parent1)
                    ? <button type="button" className="receita-nome" onClick={() => onMostrar(r.parent1)}>{r.parent1.name}</button>
                    : <span className="receita-nome-static">{r.parent1.name}</span>}
                  <div className="receita-meta">{r.parent1.arcana} · Lv {r.parent1.level ?? 'N/A'}</div>
                </div>
                <span className="receita-mais">+</span>
                <div className="receita-lado">
                  {clicavel(r.parent2)
                    ? <button type="button" className="receita-nome" onClick={() => onMostrar(r.parent2)}>{r.parent2.name}</button>
                    : <span className="receita-nome-static">{r.parent2.name}</span>}
                  <div className="receita-meta">{r.parent2.arcana} · Lv {r.parent2.level ?? 'N/A'}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
