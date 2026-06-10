import { useState } from 'react'
import BuscaPersona from './BuscaPersona.jsx'
import { calcularFusao } from '../fusaoP3R.js'

// painel de fusao normal do p3r (quase igual ao p5 mas com classes p3)
export default function FusaoNormalP3R({ personas, onMostrar }) {
  const [p1, setP1] = useState(null)
  const [p2, setP2] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')

  function executar() {
    setErro('')
    setResultado(null)
    if (!p1 || !p2) { setErro('Selecione duas personas.'); return }
    if (p1.name === p2.name) { setErro('Não é possível fundir uma persona consigo mesma.'); return }
    const r = calcularFusao(p1, p2, personas)
    if (r) setResultado(r)
    else setErro('Combinação inválida.')
  }

  return (
    <div className="painel painel-p3">
      <h2 className="painel-titulo painel-titulo-p3">Fusão Normal</h2>
      <div className="linha-input">
        <BuscaPersona personas={personas} value={p1} onChange={setP1} label="Persona 1" placeholder="Primeira persona..." tema="p3" />
        <div className="mais mais-p3">+</div>
        <BuscaPersona personas={personas} value={p2} onChange={setP2} label="Persona 2" placeholder="Segunda persona..." tema="p3" />
      </div>
      <button type="button" className="botao-calc botao-calc-p3" onClick={executar}>Executar</button>
      {erro && <div className="msg-erro" role="alert">{erro}</div>}
      {resultado && (
        <div className="resultado" role="status">
          <span className="resultado-label">Resultado:</span>{' '}
          <button type="button" className="resultado-nome resultado-nome-p3" onClick={() => onMostrar(resultado)}>{resultado.name}</button>
          <span className="resultado-meta"> (Arcana: {resultado.arcana}, Nível: {resultado.level})</span>
        </div>
      )}
    </div>
  )
}
