import { useState } from 'react'
import { Select } from '../Select'
import { SimNao } from '../SimNao'
import type { SimNaoValor } from '../SimNao'
import { CONCLUSAO } from './opcoes'
import { ExameFisico, exameInicial } from './ExameFisico'
import type { ExameValue } from './ExameFisico'

const EXPOSICOES = [
  'Não',
  'Ruído',
  'Produtos Químicos',
  'Poeira',
  'Umidade ou calor excessivo',
  'Frio',
  'Outros',
]

type Emprego = { empresa: string; funcao: string; tempo: string }

// Checkbox no padrão do sistema.
function Checkbox({ checked, label, onClick }: { checked: boolean; label: string; onClick: () => void }) {
  return (
    <button type="button" className="chk" onClick={onClick}>
      <span className={`chk-box ${checked ? 'checked' : ''}`}>
        {checked && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      {label}
    </button>
  )
}

export function Admissional() {
  const [empregos, setEmpregos] = useState<Emprego[]>([{ empresa: '', funcao: '', tempo: '' }])
  const [exposicoes, setExposicoes] = useState<string[]>([])
  const [acidente, setAcidente] = useState<SimNaoValor>('nao')
  const [acidenteQuando, setAcidenteQuando] = useState('')
  const [doenca, setDoenca] = useState<SimNaoValor>('nao')
  const [doencaQuais, setDoencaQuais] = useState('')
  const [textoLivre1, setTextoLivre1] = useState('')
  const [exame, setExame] = useState<ExameValue>(exameInicial)
  const [textoLivre2, setTextoLivre2] = useState('')
  const [conclusao, setConclusao] = useState('')
  const [conduta, setConduta] = useState('')

  const setEmprego = (i: number, patch: Partial<Emprego>) =>
    setEmpregos((prev) => prev.map((e, idx) => (idx === i ? { ...e, ...patch } : e)))
  const addEmprego = () => setEmpregos((prev) => [...prev, { empresa: '', funcao: '', tempo: '' }])
  const removeEmprego = (i: number) => setEmpregos((prev) => prev.filter((_, idx) => idx !== i))

  // "Não" é exclusivo em relação às demais exposições.
  const toggleExposicao = (opt: string) => {
    setExposicoes((prev) => {
      if (opt === 'Não') return prev.includes('Não') ? [] : ['Não']
      const semNao = prev.filter((x) => x !== 'Não')
      return semNao.includes(opt) ? semNao.filter((x) => x !== opt) : [...semNao, opt]
    })
  }

  return (
    <div className="ficha">
      {/* Histórico ocupacional */}
      <div className="ficha-section">
        <label className="field-label">Histórico ocupacional</label>
        <div className="emprego-list">
          {empregos.map((e, i) => (
            <div className="emprego-row" key={i}>
              <input
                className="field-input"
                placeholder="Empresa"
                value={e.empresa}
                onChange={(ev) => setEmprego(i, { empresa: ev.target.value })}
              />
              <input
                className="field-input"
                placeholder="Função"
                value={e.funcao}
                onChange={(ev) => setEmprego(i, { funcao: ev.target.value })}
              />
              <input
                className="field-input"
                placeholder="Tempo"
                value={e.tempo}
                onChange={(ev) => setEmprego(i, { tempo: ev.target.value })}
              />
              <button
                type="button"
                className="emprego-remove"
                onClick={() => removeEmprego(i)}
                disabled={empregos.length === 1}
                aria-label="Remover"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="btn-add" onClick={addEmprego}>+ Adicionar empresa</button>
      </div>

      {/* Exposições */}
      <div className="ficha-section">
        <label className="field-label">Já trabalhou em locais com exposição a:</label>
        <div className="chk-list">
          {EXPOSICOES.map((opt) => (
            <Checkbox key={opt} label={opt} checked={exposicoes.includes(opt)} onClick={() => toggleExposicao(opt)} />
          ))}
        </div>
      </div>

      {/* Acidente de trabalho / CAT */}
      <div className="ficha-section">
        <label className="field-label">Já sofreu algum acidente de trabalho? Abriu CAT?</label>
        <SimNao value={acidente} onChange={setAcidente} />
        {acidente === 'sim' && (
          <textarea
            className="field-textarea inline-extra"
            rows={2}
            placeholder="Quando?"
            value={acidenteQuando}
            onChange={(e) => setAcidenteQuando(e.target.value)}
          />
        )}
      </div>

      {/* Doença ocupacional */}
      <div className="ficha-section">
        <label className="field-label">Tem ou teve histórico de doença ocupacional?</label>
        <SimNao value={doenca} onChange={setDoenca} />
        {doenca === 'sim' && (
          <textarea
            className="field-textarea inline-extra"
            rows={2}
            placeholder="Quais?"
            value={doencaQuais}
            onChange={(e) => setDoencaQuais(e.target.value)}
          />
        )}
      </div>

      {/* Texto livre (antes do exame) */}
      <div className="ficha-section">
        <label className="field-label">Texto livre</label>
        <textarea
          className="field-textarea"
          rows={4}
          value={textoLivre1}
          onChange={(e) => setTextoLivre1(e.target.value)}
        />
      </div>

      {/* Exame físico */}
      <ExameFisico value={exame} onChange={setExame} />

      {/* Texto livre (após o exame) */}
      <div className="ficha-section">
        <label className="field-label">Texto livre</label>
        <textarea
          className="field-textarea"
          rows={4}
          value={textoLivre2}
          onChange={(e) => setTextoLivre2(e.target.value)}
        />
      </div>

      {/* Conclusão + Conduta */}
      <div className="ficha-section">
        <label className="field-label">Apto ao trabalho</label>
        <Select value={conclusao} onChange={setConclusao} options={CONCLUSAO} placeholder="Selecione a conclusão..." />
      </div>

      <div className="ficha-section">
        <label className="field-label" htmlFor="conduta-adm">Conduta</label>
        <textarea
          id="conduta-adm"
          className="field-textarea"
          rows={4}
          value={conduta}
          onChange={(e) => setConduta(e.target.value)}
        />
      </div>
    </div>
  )
}
