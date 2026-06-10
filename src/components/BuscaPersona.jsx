import { useEffect, useId, useRef, useState } from 'react'

// input com autocomplete pra escolher persona
// prop tema: 'p5' ou 'p3'
export default function BuscaPersona({ personas, value, onChange, label, placeholder = 'Digite o nome...', tema = 'p5' }) {
  const [texto, setTexto] = useState(value ? value.name : '')
  const [aberto, setAberto] = useState(false)
  const ref = useRef(null)
  const inputId = useId()

  useEffect(() => {
    setTexto(value ? value.name : '')
  }, [value])

  useEffect(() => {
    function click(e) {
      if (ref.current && !ref.current.contains(e.target)) setAberto(false)
    }
    document.addEventListener('mousedown', click)
    return () => document.removeEventListener('mousedown', click)
  }, [])

  // filtra inline mesmo, sem useMemo
  const q = texto.trim().toLowerCase()
  let matches = []
  if (q.length >= 2) {
    matches = personas.filter(p => p.name.toLowerCase().includes(q))
    matches.sort((a, b) => (a.level || 0) - (b.level || 0))
    matches = matches.slice(0, 30)
  }

  function digitar(e) {
    setTexto(e.target.value)
    setAberto(true)
    if (value) onChange(null)
  }

  function escolher(p) {
    onChange(p)
    setTexto(p.name)
    setAberto(false)
  }

  const sufixo = tema === 'p3' ? '-p3' : ''

  return (
    <div className="input-persona-wrapper" ref={ref}>
      {label && <label htmlFor={inputId} className={'label-input label-input' + sufixo}>{label}</label>}
      <input
        id={inputId}
        type="text"
        className={'input-persona input-persona' + sufixo}
        aria-label={label ? undefined : placeholder}
        placeholder={placeholder}
        value={texto}
        onChange={digitar}
        onFocus={() => setAberto(true)}
      />
      {aberto && matches.length > 0 && (
        <div className={'lista-resultados lista-resultados' + sufixo}>
          {matches.map(p => (
            <button
              key={p.name}
              type="button"
              className={'item-resultado item-resultado' + sufixo}
              onMouseDown={(e) => { e.preventDefault(); escolher(p) }}
            >
              <span className="item-nome">{p.name}</span>
              <span className="item-meta">{p.arcana} · Lv {p.level}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
