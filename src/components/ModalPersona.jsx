import { useEffect, useRef } from 'react'

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
  const conteudoRef = useRef(null)

  useEffect(() => {
    if (!persona) return
    // move o foco pra dentro do modal e devolve pra quem abriu quando fechar
    const quemAbriu = document.activeElement
    conteudoRef.current?.focus()
    function tecla(e) {
      if (e.key === 'Escape') onClose()
      // prende o tab dentro do modal enquanto ele estiver aberto
      if (e.key === 'Tab' && conteudoRef.current) {
        const focaveis = conteudoRef.current.querySelectorAll('button, [href], input, select, textarea')
        if (focaveis.length === 0) return
        const primeiro = focaveis[0]
        const ultimo = focaveis[focaveis.length - 1]
        if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus() }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus() }
      }
    }
    window.addEventListener('keydown', tecla)
    return () => {
      window.removeEventListener('keydown', tecla)
      if (quemAbriu && quemAbriu.focus) quemAbriu.focus()
    }
  }, [persona, onClose])

  if (!persona) return null

  const sufixo = jogo === 'p3' ? '-p3' : ''
  const afs = afinidades.filter(a => persona[a.chave] && persona[a.chave].length > 0)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={conteudoRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-persona-titulo"
        tabIndex={-1}
        className={'modal-conteudo modal-conteudo' + sufixo}
        onClick={e => e.stopPropagation()}
      >
        <button type="button" className={'modal-fechar modal-fechar' + sufixo} aria-label="Fechar modal" onClick={onClose}>×</button>

        <div className={'modal-cabecalho modal-cabecalho' + sufixo}>
          <h2 id="modal-persona-titulo" className={'modal-nome modal-nome' + sufixo}>{persona.name}</h2>
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
