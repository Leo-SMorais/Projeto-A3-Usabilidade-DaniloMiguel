import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { buscarP3R } from '../api.js'
import LoaderP3R from '../components/LoaderP3R.jsx'
import ModalPersona from '../components/ModalPersona.jsx'
import FusaoNormalP3R from '../components/FusaoNormalP3R.jsx'
import FusaoReversaP3R from '../components/FusaoReversaP3R.jsx'

export default function P3R() {
  const [personas, setPersonas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [aba, setAba] = useState('normal')
  const [busca, setBusca] = useState('')
  const [selecionada, setSelecionada] = useState(null)

  useEffect(() => {
    buscarP3R()
      .then(lista => { setPersonas(lista); setCarregando(false) })
      .catch(e => { setErro(e); setCarregando(false) })
  }, [])

  if (carregando) return <LoaderP3R />

  const q = busca.trim().toLowerCase()
  let filtradas = q
    ? personas.filter(p => p.name.toLowerCase().includes(q) || (p.arcana || '').toLowerCase().includes(q))
    : personas
  filtradas = [...filtradas].sort((a, b) => (a.level || 0) - (b.level || 0))

  return (
    <div className="pagina-p3">
      <header className="cabecalho cabecalho-p3">
        <Link to="/" className="voltar-p3">← Hub</Link>
        <h1 className="titulo-p3">Persona 3 Reload</h1>
        <Link to="/p3r/guess" className="botao-guess">Persona Guess</Link>
      </header>

      {erro && <div className="aviso-erro">Erro ao carregar.</div>}

      <nav className="abas abas-p3">
        <button type="button" className={'aba aba-p3 ' + (aba === 'normal' ? 'aba-ativa-p3' : '')} onClick={() => setAba('normal')}>Fusão Normal</button>
        <button type="button" className={'aba aba-p3 ' + (aba === 'reversa' ? 'aba-ativa-p3' : '')} onClick={() => setAba('reversa')}>Busca Reversa</button>
        <button type="button" className={'aba aba-p3 ' + (aba === 'compendio' ? 'aba-ativa-p3' : '')} onClick={() => setAba('compendio')}>Compêndio</button>
      </nav>

      {aba === 'normal' && <FusaoNormalP3R personas={personas} onMostrar={setSelecionada} />}
      {aba === 'reversa' && <FusaoReversaP3R personas={personas} onMostrar={setSelecionada} />}
      {aba === 'compendio' && (
        <div>
          <div className="barra-busca">
            <input type="text" className="input-busca input-busca-p3" placeholder="Procurar..." value={busca} onChange={e => setBusca(e.target.value)} />
            <div className="contagem">{filtradas.length} / {personas.length}</div>
          </div>
          <div className="grade">
            {filtradas.map(p => (
              <button key={p.name} type="button" className="card card-p3" onClick={() => setSelecionada(p)}>
                <div className="card-nivel card-nivel-p3">Lv {p.level}</div>
                <div className="card-nome card-nome-p3">{p.name}</div>
                <div className="card-arcana">{p.arcana}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <ModalPersona persona={selecionada} onClose={() => setSelecionada(null)} jogo="p3" />
    </div>
  )
}
