import { useState } from 'react'
import { CidSelect } from '../CidSelect'
import { ExameFisico, exameInicial } from './ExameFisico'
import type { ExameValue } from './ExameFisico'
import type { Cid } from '../cid10'

export function Assistencial() {
  const [anamnese, setAnamnese] = useState('')
  const [exame, setExame] = useState<ExameValue>(exameInicial)
  const [hipotese, setHipotese] = useState('')
  const [cids, setCids] = useState<Cid[]>([])
  const [conduta, setConduta] = useState('')

  return (
    <div className="ficha">
      {/* Anamnese */}
      <div className="ficha-section">
        <label className="field-label" htmlFor="anamnese-ass">Anamnese</label>
        <textarea
          id="anamnese-ass"
          className="field-textarea"
          rows={4}
          value={anamnese}
          onChange={(e) => setAnamnese(e.target.value)}
        />
      </div>

      {/* Exame físico */}
      <ExameFisico value={exame} onChange={setExame} />

      {/* Hipótese diagnóstica */}
      <div className="ficha-section">
        <label className="field-label" htmlFor="hipotese">Hipótese diagnóstica</label>
        <textarea
          id="hipotese"
          className="field-textarea"
          rows={3}
          value={hipotese}
          onChange={(e) => setHipotese(e.target.value)}
        />
      </div>

      {/* CID 10 */}
      <div className="ficha-section">
        <label className="field-label">CID 10</label>
        <CidSelect value={cids} onChange={setCids} />
      </div>

      {/* Conduta */}
      <div className="ficha-section">
        <label className="field-label" htmlFor="conduta-ass">Conduta</label>
        <textarea
          id="conduta-ass"
          className="field-textarea"
          rows={4}
          value={conduta}
          onChange={(e) => setConduta(e.target.value)}
        />
      </div>
    </div>
  )
}
