import { useState } from 'react'
import BuscaPersona from './BuscaPersona.jsx'
import { calcularFusao } from '../fusao.js'

// painel de fusao normal do p5r
export default function FusaoNormalP5R({ personas, onMostrar }) {
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
    <div className="painel">
      <h2 className="painel-titulo">Guilhotina de Fusão</h2>
      <div className="linha-input">
        <BuscaPersona personas={personas} value={p1} onChange={setP1} label="Persona 1" placeholder="Primeira persona..." />
        <div className="mais">+</div>
        <BuscaPersona personas={personas} value={p2} onChange={setP2} label="Persona 2" placeholder="Segunda persona..." />
      </div>
      <button type="button" className="botao-calc" onClick={executar}>Executar</button>
      {erro && <div className="msg-erro" role="alert">{erro}</div>}
      {resultado && (
        <div className="resultado" role="status">
          <span className="resultado-label">Resultado:</span>{' '}
          <button type="button" className="resultado-nome" onClick={() => onMostrar(resultado)}>{resultado.name}</button>
          <span className="resultado-meta"> (Arcana: {resultado.arcana}, Nível: {resultado.level})</span>
        </div>
      )}
    </div>
  )
}
