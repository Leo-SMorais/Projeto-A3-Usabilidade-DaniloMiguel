import { Link } from 'react-router-dom'

export default function P3R() {
  return (
    <div className="pagina-p3">
      <header className="cabecalho cabecalho-p3">
        <Link to="/" className="voltar-p3">← Hub</Link>
        <h1 className="titulo-p3">Persona 3 Reload</h1>
      </header>
      <p style={{ marginTop: '2rem', fontSize: '1.2rem' }}>Em breve.</p>
    </div>
  )
}
