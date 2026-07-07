import { useEffect, useRef, useState } from 'react'

type Props = {
  value: string
  onChange: (value: string) => void
  options: string[]
  placeholder?: string
}

// Select customizado — segue o padrão visual do sistema (não usa o <select> nativo).
export function Select({ value, onChange, options, placeholder = 'Selecione...' }: Props) {
  const [aberto, setAberto] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <div className={`sel ${aberto ? 'open' : ''}`} ref={ref}>
      <button type="button" className="sel-trigger" onClick={() => setAberto((a) => !a)}>
        <span className={value ? 'sel-value' : 'sel-placeholder'}>{value || placeholder}</span>
        <svg className="sel-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {aberto && (
        <div className="sel-menu">
          {options.map((opt) => (
            <div
              key={opt}
              className={`sel-option ${opt === value ? 'selected' : ''}`}
              onClick={() => { onChange(opt); setAberto(false) }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
