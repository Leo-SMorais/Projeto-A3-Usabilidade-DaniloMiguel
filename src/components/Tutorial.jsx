import { useEffect, useRef, useState } from 'react'

const CHAVE = 'p5r_tutorial_seen'

const SLIDES = [
  {
    quem: 'IGOR',
    icone: '◆',
    titulo: 'Bem-vindo à Velvet Room.',
    texto: <>Este lugar existe entre sonho e realidade.<br/><br/>Aqui no <strong>Persona Fusion Hub</strong> você pode planejar suas fusões antes de sentar na guilhotina.</>,
    flavor: '"Apenas aqueles com o poder de invocar Personas são convidados a este lugar..."',
  },
  {
    quem: 'LAVENZA',
    icone: '◇',
    titulo: 'O que são Personas?',
    texto: <>Em <strong>Persona 5 Royal</strong>, Personas são manifestações psíquicas. Cada uma tem uma <strong>Arcana</strong> que determina suas afinidades e com quem pode se fundir.</>,
    arcanas: ['Fool', 'Magician', 'Priestess', 'Empress', 'Emperor', 'Hierophant', 'Lovers', 'Chariot', 'Justice', '+ 15 arcanas']
  },
  {
    quem: 'IGOR',
    icone: '⚔',
    titulo: 'Guilhotina de Fusão',
    texto: <>Na aba <strong>Fusão Normal</strong>, escolha duas personas pra descobrir qual nasce da fusão.</>,
    passos: [
      ['①', 'Digite o nome no campo Persona 1'],
      ['②', 'Repita para Persona 2'],
      ['③', 'Clique em "Executar"'],
      ['④', 'Clique no nome do resultado pra ver os stats'],
    ],
  },
  {
    quem: 'CAROLINE & JUSTINE',
    icone: '🔍',
    titulo: 'Busca de Registros',
    texto: <>Sabe qual quer criar mas nao sabe como? A <strong>Busca Reversa</strong> mostra todos os pares possíveis.</>,
    passos: [
      ['①', 'Digite o nome da persona alvo'],
      ['②', 'Clique em "Procurar Registros"'],
      ['③', 'A lista mostra cada par'],
    ],
  },
  {
    quem: 'IGOR',
    icone: '★',
    titulo: 'Está pronto.',
    texto: <>O compêndio carregou e a guilhotina te espera.<br/><br/>Fusões especiais como <strong>Satanael</strong> ou <strong>Alice</strong> precisam de combinações específicas — a busca reversa identifica isso.</>,
    flavor: '"Que seus dias de roubar corações sejam longos."',
    naoMostrar: true,
  },
]

export function jaViuTutorial() {
  try { return localStorage.getItem(CHAVE) === 'true' } catch { return false }
}

export default function Tutorial({ aberto, onClose }) {
  const [passo, setPasso] = useState(0)
  const [naoMostrar, setNaoMostrar] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    if (aberto) { setPasso(0); setNaoMostrar(false) }
  }, [aberto])

  // move o foco pra dentro do tutorial e devolve pra quem abriu quando fechar
  useEffect(() => {
    if (!aberto) return
    const quemAbriu = document.activeElement
    cardRef.current?.focus()
    return () => { if (quemAbriu && quemAbriu.focus) quemAbriu.focus() }
  }, [aberto])

  useEffect(() => {
    if (!aberto) return
    function tecla(e) {
      if (e.key === 'Escape') fechar()
      if (e.key === 'ArrowLeft' && passo > 0) setPasso(passo - 1)
      if (e.key === 'ArrowRight' && passo < SLIDES.length - 1) setPasso(passo + 1)
      // prende o tab dentro do tutorial enquanto ele estiver aberto
      if (e.key === 'Tab' && cardRef.current) {
        const focaveis = cardRef.current.querySelectorAll('button:not([disabled]), input')
        if (focaveis.length === 0) return
        const primeiro = focaveis[0]
        const ultimo = focaveis[focaveis.length - 1]
        if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus() }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus() }
      }
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  })

  if (!aberto) return null

  const slide = SLIDES[passo]
  const ultimo = passo === SLIDES.length - 1
  const progresso = ((passo + 1) / SLIDES.length) * 100

  function fechar() {
    if (naoMostrar) {
      try { localStorage.setItem(CHAVE, 'true') } catch {}
    }
    onClose()
  }

  return (
    <div className="tutorial-overlay">
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-titulo"
        tabIndex={-1}
        className="tutorial-card"
      >
        <div className="tutorial-progresso">
          <div className="tutorial-progresso-fill" style={{ width: progresso + '%' }} />
        </div>

        <div className="tutorial-bolinhas">
          {SLIDES.map((_, i) => (
            <span key={i} className={'bolinha ' + (i === passo ? 'bolinha-ativa' : '')} onClick={() => setPasso(i)} />
          ))}
        </div>

        <div className="tutorial-slide">
          <div className="tutorial-quem">{slide.quem}</div>
          <div className="tutorial-icone">{slide.icone}</div>
          <h2 id="tutorial-titulo" className="tutorial-titulo">{slide.titulo}</h2>
          <p className="tutorial-texto">{slide.texto}</p>

          {slide.arcanas && (
            <div className="arcanas-preview">
              {slide.arcanas.map(a => <span key={a}>{a}</span>)}
            </div>
          )}

          {slide.passos && (
            <div className="tutorial-passos">
              {slide.passos.map(([n, t], i) => (
                <div key={i} className="tutorial-passo">
                  <div className="tutorial-passo-num">{n}</div>
                  <div>{t}</div>
                </div>
              ))}
            </div>
          )}

          {slide.flavor && <div className="tutorial-flavor">{slide.flavor}</div>}

          {slide.naoMostrar && (
            <label className="tutorial-naomostrar">
              <input type="checkbox" checked={naoMostrar} onChange={e => setNaoMostrar(e.target.checked)} />{' '}
              Não mostrar novamente
            </label>
          )}
        </div>

        <div className="tutorial-nav">
          <button type="button" className="tutorial-btn" disabled={passo === 0} onClick={() => setPasso(passo - 1)}>◀ VOLTAR</button>
          <button type="button" className="tutorial-btn tutorial-btn-pular" onClick={fechar}>{ultimo ? 'COMEÇAR' : 'PULAR'}</button>
          <button type="button" className="tutorial-btn" onClick={() => ultimo ? fechar() : setPasso(passo + 1)}>
            {ultimo ? 'CONCLUIR ▶' : 'PRÓXIMO ▶'}
          </button>
        </div>
      </div>
    </div>
  )
}
