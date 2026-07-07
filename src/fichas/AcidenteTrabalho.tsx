import { useState } from 'react'
import { Select } from '../Select'
import { CidSelect } from '../CidSelect'
import { ExameFisico, exameInicial } from './ExameFisico'
import type { ExameValue } from './ExameFisico'
import type { Cid } from '../cid10'

const TEMPO_AFASTAMENTO = [
  'Sem afastamento',
  'Afastamento inferior a 15 dias',
  'Afastamento superior a 15 dias',
]

const CLASSIFICACAO = [
  'Incidente',
  'Primeiros Socorros (PS)',
  'Acidente sem afastamento (ASA)',
  'Acidente com afastamento (ACA)',
]

export function AcidenteTrabalho() {
  const [dataAcidente, setDataAcidente] = useState('')
  const [anamnese, setAnamnese] = useState('')
  const [exame, setExame] = useState<ExameValue>(exameInicial)
  const [tempoAfastamento, setTempoAfastamento] = useState('')
  const [classificacao, setClassificacao] = useState('')
  const [restricoes, setRestricoes] = useState('')
  const [conduta, setConduta] = useState('')
  const [cids, setCids] = useState<Cid[]>([])

  return (
    <div className="ficha">
      {/* Data do acidente */}
      <div className="ficha-section">
        <label className="field-label" htmlFor="dataAcidente">Data do acidente</label>
        <input
          id="dataAcidente"
          type="date"
          className="field-input field-date"
          value={dataAcidente}
          onChange={(e) => setDataAcidente(e.target.value)}
        />
      </div>

      {/* Anamnese */}
      <div className="ficha-section">
        <label className="field-label" htmlFor="anamnese">Anamnese e descrição da ocorrência</label>
        <textarea
          id="anamnese"
          className="field-textarea"
          rows={4}
          placeholder="Descreva a ocorrência..."
          value={anamnese}
          onChange={(e) => setAnamnese(e.target.value)}
        />
      </div>

      {/* Exame físico */}
      <ExameFisico value={exame} onChange={setExame} />

      {/* Afastamento + Classificação */}
      <div className="form-grid-2">
        <div className="ficha-section">
          <label className="field-label">Tempo de afastamento</label>
          <Select value={tempoAfastamento} onChange={setTempoAfastamento} options={TEMPO_AFASTAMENTO} />
        </div>

        <div className="ficha-section">
          <label className="field-label">Classificação da ocorrência</label>
          <Select value={classificacao} onChange={setClassificacao} options={CLASSIFICACAO} />
        </div>
      </div>

      {/* Restrições */}
      <div className="ficha-section">
        <label className="field-label" htmlFor="restricoes">Restrições</label>
        <textarea
          id="restricoes"
          className="field-textarea"
          rows={3}
          value={restricoes}
          onChange={(e) => setRestricoes(e.target.value)}
        />
      </div>

      {/* CID 10 */}
      <div className="ficha-section">
        <label className="field-label">CID 10</label>
        <CidSelect value={cids} onChange={setCids} />
      </div>

      {/* Conduta */}
      <div className="ficha-section">
        <label className="field-label" htmlFor="conduta">Conduta</label>
        <textarea
          id="conduta"
          className="field-textarea"
          rows={4}
          value={conduta}
          onChange={(e) => setConduta(e.target.value)}
        />
      </div>
    </div>
  )
}
