import { useEffect } from 'react'

// modal pra ver detalhes da persona
// prop jogo serve pra trocar o tema (p5 ou p3)
const afinidades = [
  { chave: 'weak', label: 'Weak', cor: '#ff5555' },
  { chave: 'resists', label: 'Resist', cor: '#aaaaaa' },
  { chave: 'nullifies', label: 'Null', cor: '#55ff55' },
  { chave: 'reflects', label: 'Repel', cor: '#55ffff' },
  { chave: 'absorbs', label: 'Drain', cor: '#ff55ff' },
]

const stats = [
  { chave: 'strength', label: 'STRENGTH' },
  { chave: 'magic', label: 'MAGIC' },
  { chave: 'endurance', label: 'ENDURANCE' },
  { chave: 'agility', label: 'AGILITY' },
  { chave: 'luck', label: 'LUCK' },
]

export default function ModalPersona({ persona, onClose, jogo = 'p5' }) {
  useEffect(() => {
    if (!persona) return
    function tecla(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [persona, onClose])

  if (!persona) return null

  const sufixo = jogo === 'p3' ? '-p3' : ''
  const afs = afinidades.filter(a => persona[a.chave] && persona[a.chave].length > 0)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={'modal-conteudo modal-conteudo' + sufixo} onClick={e => e.stopPropagation()}>
        <button className={'modal-fechar modal-fechar' + sufixo} onClick={onClose}>×</button>

        <div className={'modal-cabecalho modal-cabecalho' + sufixo}>
          <h2 className={'modal-nome modal-nome' + sufixo}>{persona.name}</h2>
          <span className={'modal-badge modal-badge' + sufixo}>Lvl {persona.level}</span>
          <p className="modal-info">TRAIT: <span>{persona.trait || '—'}</span></p>
          {persona.arcana && <p className="modal-info">ARCANA: <span>{persona.arcana}</span></p>}
        </div>

        <div className={'modal-secao modal-secao' + sufixo}>
          <h3>Stats Iniciais</h3>
          <ul>
            {stats.map(s => (
              <li key={s.chave}>{s.label}: <span>{persona[s.chave] ?? 0}</span></li>
            ))}
          </ul>
        </div>

        <div className={'modal-secao modal-secao' + sufixo}>
          <h3>Afinidades Elementais</h3>
          <ul>
            {afs.length === 0 && <li>Nenhuma fraqueza ou resistência.</li>}
            {afs.map(a => (
              <li key={a.chave}>
                {a.label}: <span style={{ color: a.cor, fontWeight: 'bold' }}>{persona[a.chave].join(', ')}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
