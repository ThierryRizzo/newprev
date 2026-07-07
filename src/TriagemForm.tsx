export type Triagem = {
  pressao: string
  peso: string
  frequencia: string
}

/**
 * Pressão arterial é sempre sistólica/diastólica (ex.: 120/80 mmHg).
 * Formata automaticamente inserindo a "/" após o primeiro valor.
 */
function formatPressao(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 6) // até 3 + 3 dígitos
  if (digits.length <= 3) return digits
  // sistólica tem 2 ou 3 dígitos; assumimos 3 se >= 100, senão 2
  const sysLen = digits.length >= 5 ? 3 : Math.min(3, digits.length - 1)
  const sys = digits.slice(0, sysLen)
  const dia = digits.slice(sysLen, sysLen + 3)
  return dia ? `${sys}/${dia}` : sys
}

/** Peso em kg, aceita uma casa decimal (ex.: 72,5). */
function formatPeso(raw: string): string {
  let v = raw.replace(/[^\d,.]/g, '').replace('.', ',')
  const parts = v.split(',')
  if (parts.length > 2) v = `${parts[0]},${parts[1]}`
  const [int, dec] = v.split(',')
  return dec !== undefined ? `${int.slice(0, 3)},${dec.slice(0, 1)}` : int.slice(0, 3)
}

/** Frequência cardíaca em bpm — inteiro. */
function formatFrequencia(raw: string): string {
  return raw.replace(/\D/g, '').slice(0, 3)
}

type Props = {
  value: Triagem
  onChange: (next: Triagem) => void
}

export function TriagemForm({ value, onChange }: Props) {
  const set = (patch: Partial<Triagem>) => onChange({ ...value, ...patch })

  return (
    <div className="panel">
      <div className="form-row">
        <div className="field">
          <label htmlFor="pressao">Pressão</label>
          <div className="field-input-wrap">
            <input
              id="pressao"
              inputMode="numeric"
              placeholder="120/80"
              value={value.pressao}
              onChange={(e) => set({ pressao: formatPressao(e.target.value) })}
            />
            <span className="unit">mmHg</span>
          </div>
          <span className="hint">Sistólica / diastólica</span>
        </div>

        <div className="field">
          <label htmlFor="peso">Peso</label>
          <div className="field-input-wrap">
            <input
              id="peso"
              inputMode="decimal"
              placeholder="72,5"
              value={value.peso}
              onChange={(e) => set({ peso: formatPeso(e.target.value) })}
            />
            <span className="unit">kg</span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="frequencia">Frequência cardíaca</label>
          <div className="field-input-wrap">
            <input
              id="frequencia"
              inputMode="numeric"
              placeholder="72"
              value={value.frequencia}
              onChange={(e) => set({ frequencia: formatFrequencia(e.target.value) })}
            />
            <span className="unit">bpm</span>
          </div>
        </div>
      </div>
    </div>
  )
}
