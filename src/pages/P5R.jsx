import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { buscarP5R } from '../api.js'
import LoaderP5R from '../components/LoaderP5R.jsx'
import ModalPersona from '../components/ModalPersona.jsx'

export default function P5R() {
  const [personas, setPersonas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [busca, setBusca] = useState('')
  const [selecionada, setSelecionada] = useState(null)

  // pega as personas da api
  useEffect(() => {
    buscarP5R()
      .then(lista => { setPersonas(lista); setCarregando(false) })
      .catch(e => { setErro(e); setCarregando(false) })
  }, [])

  if (carregando) return <LoaderP5R />

  // filtra inline em cada render mesmo
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
      </header>

      {erro && <div className="aviso-erro">Erro ao carregar.</div>}

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

      <ModalPersona persona={selecionada} onClose={() => setSelecionada(null)} />
    </div>
  )
}
