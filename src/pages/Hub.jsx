import { Link } from 'react-router-dom'

// tela inicial com os dois jogos
export default function Hub() {
  return (
    <div className="hub">
      <Link to="/p5r" className="split split-p5">
        <div className="bg-image" />
        <div className="conteudo">
          <h1 className="fonte-p5">Persona 5<br />Royal</h1>
          <div className="botao-hub" style={{ color: '#e60012' }}>Fusion Calc</div>
        </div>
      </Link>
      <Link to="/p3r" className="split split-p3">
        <div className="bg-image" />
        <div className="conteudo">
          <h1 className="fonte-p3">Persona 3<br />Reload</h1>
          <div className="botao-hub" style={{ color: '#0055ff' }}>Fusion Calc</div>
        </div>
      </Link>
    </div>
  )
}
