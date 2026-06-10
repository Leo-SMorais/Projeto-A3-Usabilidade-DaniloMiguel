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

  // navegacao por setas entre as abas (padrao de tabs acessivel)
  const ordemAbas = ['normal', 'reversa', 'compendio']
  function teclaAba(e) {
    const i = ordemAbas.indexOf(aba)
    let nova = null
    if (e.key === 'ArrowRight') nova = ordemAbas[(i + 1) % ordemAbas.length]
    if (e.key === 'ArrowLeft') nova = ordemAbas[(i - 1 + ordemAbas.length) % ordemAbas.length]
    if (!nova) return
    e.preventDefault()
    setAba(nova)
    document.getElementById('aba-' + nova)?.focus()
  }

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

      {erro && <div className="aviso-erro" role="alert">Erro ao carregar.</div>}

      <div role="tablist" aria-label="Seções da página" className="abas abas-p3">
        <button type="button" role="tab" id="aba-normal" aria-selected={aba === 'normal'} aria-controls="painel-normal" tabIndex={aba === 'normal' ? 0 : -1} onKeyDown={teclaAba} className={'aba aba-p3 ' + (aba === 'normal' ? 'aba-ativa-p3' : '')} onClick={() => setAba('normal')}>Fusão Normal</button>
        <button type="button" role="tab" id="aba-reversa" aria-selected={aba === 'reversa'} aria-controls="painel-reversa" tabIndex={aba === 'reversa' ? 0 : -1} onKeyDown={teclaAba} className={'aba aba-p3 ' + (aba === 'reversa' ? 'aba-ativa-p3' : '')} onClick={() => setAba('reversa')}>Busca Reversa</button>
        <button type="button" role="tab" id="aba-compendio" aria-selected={aba === 'compendio'} aria-controls="painel-compendio" tabIndex={aba === 'compendio' ? 0 : -1} onKeyDown={teclaAba} className={'aba aba-p3 ' + (aba === 'compendio' ? 'aba-ativa-p3' : '')} onClick={() => setAba('compendio')}>Compêndio</button>
      </div>

      {aba === 'normal' && (
        <div role="tabpanel" id="painel-normal" aria-labelledby="aba-normal">
          <FusaoNormalP3R personas={personas} onMostrar={setSelecionada} />
        </div>
      )}
      {aba === 'reversa' && (
        <div role="tabpanel" id="painel-reversa" aria-labelledby="aba-reversa">
          <FusaoReversaP3R personas={personas} onMostrar={setSelecionada} />
        </div>
      )}
      {aba === 'compendio' && (
        <div role="tabpanel" id="painel-compendio" aria-labelledby="aba-compendio">
          <div className="barra-busca">
            <input type="text" className="input-busca input-busca-p3" aria-label="Procurar persona por nome ou arcana" placeholder="Procurar..." value={busca} onChange={e => setBusca(e.target.value)} />
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
