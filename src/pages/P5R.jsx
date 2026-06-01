import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { buscarP5R } from '../api.js'
import LoaderP5R from '../components/LoaderP5R.jsx'
import ModalPersona from '../components/ModalPersona.jsx'
import FusaoNormalP5R from '../components/FusaoNormalP5R.jsx'
import FusaoReversaP5R from '../components/FusaoReversaP5R.jsx'
import Tutorial, { jaViuTutorial } from '../components/Tutorial.jsx'

export default function P5R() {
  const [personas, setPersonas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [aba, setAba] = useState('normal')
  const [busca, setBusca] = useState('')
  const [selecionada, setSelecionada] = useState(null)
  const [tutorialAberto, setTutorialAberto] = useState(false)

  // pega as personas da api quando a pagina monta
  useEffect(() => {
    buscarP5R()
      .then(lista => { setPersonas(lista); setCarregando(false) })
      .catch(e => { setErro(e); setCarregando(false) })
  }, [])

  // abre o tutorial se eh a primeira vez
  useEffect(() => {
    if (!carregando && !jaViuTutorial()) setTutorialAberto(true)
  }, [carregando])

  if (carregando) return <LoaderP5R />

  // filtro do compendio - inline mesmo
  const q = busca.trim().toLowerCase()
  let filtradas = q
    ? personas.filter(p => p.name.toLowerCase().includes(q) || (p.arcana || '').toLowerCase().includes(q))
    : personas
  filtradas = [...filtradas].sort((a, b) => (a.level || 0) - (b.level || 0))

  return (
    <div className="pagina-p5">
      <header className="cabecalho cabecalho-p5">
        <Link to="/" className="voltar-p5">← Hub</Link>
        <h1 className="titulo-p5">Persona 5 Royal</h1>
        <div className="subtitulo">Velvet Room</div>
        <button type="button" className="botao-ajuda" onClick={() => setTutorialAberto(true)}>?</button>
      </header>

      {erro && <div className="aviso-erro">Erro ao carregar. Tente recarregar a página.</div>}

      <nav className="abas abas-p5">
        <button type="button" className={'aba ' + (aba === 'normal' ? 'aba-ativa-p5' : '')} onClick={() => setAba('normal')}>Fusão Normal</button>
        <button type="button" className={'aba ' + (aba === 'reversa' ? 'aba-ativa-p5' : '')} onClick={() => setAba('reversa')}>Busca Reversa</button>
        <button type="button" className={'aba ' + (aba === 'compendio' ? 'aba-ativa-p5' : '')} onClick={() => setAba('compendio')}>Compêndio</button>
      </nav>

      {aba === 'normal' && <FusaoNormalP5R personas={personas} onMostrar={setSelecionada} />}
      {aba === 'reversa' && <FusaoReversaP5R personas={personas} onMostrar={setSelecionada} />}
      {aba === 'compendio' && (
        <div>
          <div className="barra-busca">
            <input type="text" className="input-busca" placeholder="Procurar por nome ou arcana..." value={busca} onChange={e => setBusca(e.target.value)} />
            <div className="contagem">{filtradas.length} / {personas.length}</div>
          </div>
          <div className="grade">
            {filtradas.map(p => (
              <button key={p.name} type="button" className="card" onClick={() => setSelecionada(p)}>
                <div className="card-nivel">Lv {p.level}</div>
                <div className="card-nome">{p.name}</div>
                <div className="card-arcana">{p.arcana}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <ModalPersona persona={selecionada} onClose={() => setSelecionada(null)} jogo="p5" />
      <Tutorial aberto={tutorialAberto} onClose={() => setTutorialAberto(false)} />
    </div>
  )
}
