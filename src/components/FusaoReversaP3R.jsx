import { useState } from 'react'
import BuscaPersona from './BuscaPersona.jsx'
import { buscarReverso } from '../fusaoP3R.js'

// busca reversa do p3r
export default function FusaoReversaP3R({ personas, onMostrar }) {
  const [alvo, setAlvo] = useState(null)
  const [receitas, setReceitas] = useState(null)
  const [procurando, setProcurando] = useState(false)
  const [msg, setMsg] = useState('')

  function procurar() {
    setMsg('')
    setReceitas(null)
    if (!alvo) { setMsg('Selecione uma persona alvo.'); return }
    setProcurando(true)
    setTimeout(() => {
      const r = buscarReverso(alvo, personas)
      setReceitas(r)
      setProcurando(false)
      if (r.length === 0) setMsg('Essa persona não pode ser gerada por fusão normal.')
    }, 10)
  }

  return (
    <div className="painel painel-p3">
      <h2 className="painel-titulo painel-titulo-p3">Busca Reversa</h2>
      <BuscaPersona personas={personas} value={alvo} onChange={setAlvo} label="Persona Alvo" placeholder="Quem você deseja criar?" tema="p3" />
      <button type="button" className="botao-calc botao-calc-p3" onClick={procurar} disabled={procurando} style={{ marginTop: '1rem' }}>
        {procurando ? 'Procurando...' : 'Procurar Receitas'}
      </button>
      {msg && <div className="msg-erro">{msg}</div>}
      {receitas && receitas.length > 0 && (
        <ul className="receitas">
          {receitas.map((r, i) => (
            <li key={i} className="receita receita-p3">
              {r.note && <div className="receita-nota receita-nota-p3">{r.note}</div>}
              <div className="receita-par">
                <div className="receita-lado">
                  <button type="button" className="receita-nome" onClick={() => onMostrar(r.parent1)}>{r.parent1.name}</button>
                  <div className="receita-meta">{r.parent1.arcana} · Lv {r.parent1.level ?? 'N/A'}</div>
                </div>
                <span className="receita-mais">+</span>
                <div className="receita-lado">
                  <button type="button" className="receita-nome" onClick={() => onMostrar(r.parent2)}>{r.parent2.name}</button>
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
