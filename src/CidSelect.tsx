import { useMemo, useState } from 'react'
import * as Icon from './icons'
import { CID10 } from './cid10'
import type { Cid } from './cid10'

type Props = {
  value: Cid[]
  onChange: (cids: Cid[]) => void
}

// Busca de CID-10 com seleção múltipla em chips. Padrão do sistema.
export function CidSelect({ value, onChange }: Props) {
  const [busca, setBusca] = useState('')
  const [aberto, setAberto] = useState(false)

  const resultados = useMemo(() => {
    const q = busca.trim().toLowerCase()
    if (!q) return CID10.slice(0, 8)
    return CID10.filter(
      (c) => c.codigo.toLowerCase().includes(q) || c.descricao.toLowerCase().includes(q),
    ).slice(0, 8)
  }, [busca])

  const add = (c: Cid) => {
    if (!value.some((x) => x.codigo === c.codigo)) onChange([...value, c])
    setBusca('')
    setAberto(false)
  }
  const remove = (codigo: string) => onChange(value.filter((c) => c.codigo !== codigo))

  return (
    <>
      <div className="cid-search">
        <div className="cid-input-wrap">
          <Icon.Search size={16} />
          <input
            className="cid-input"
            placeholder="Buscar por código ou descrição..."
            value={busca}
            onChange={(e) => { setBusca(e.target.value); setAberto(true) }}
            onFocus={() => setAberto(true)}
            onBlur={() => setTimeout(() => setAberto(false), 150)}
          />
        </div>
        {aberto && resultados.length > 0 && (
          <div className="cid-dropdown">
            {resultados.map((c) => (
              <div key={c.codigo} className="cid-option" onMouseDown={() => add(c)}>
                <strong>{c.codigo}</strong> — {c.descricao}
              </div>
            ))}
          </div>
        )}
      </div>
      {value.length > 0 && (
        <div className="cid-chips">
          {value.map((c) => (
            <span className="cid-chip" key={c.codigo}>
              {c.codigo} — {c.descricao}
              <button type="button" onClick={() => remove(c.codigo)} aria-label="Remover">×</button>
            </span>
          ))}
        </div>
      )}
    </>
  )
}
