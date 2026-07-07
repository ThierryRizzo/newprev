export type SimNaoValor = 'nao' | 'sim'

// Toggle Não / Sim no padrão do sistema.
export function SimNao({ value, onChange }: { value: SimNaoValor; onChange: (v: SimNaoValor) => void }) {
  return (
    <div className="seg">
      <button type="button" className={`seg-btn ${value === 'nao' ? 'on-nao' : ''}`} onClick={() => onChange('nao')}>
        Não
      </button>
      <button type="button" className={`seg-btn ${value === 'sim' ? 'on-sim' : ''}`} onClick={() => onChange('sim')}>
        Sim
      </button>
    </div>
  )
}
