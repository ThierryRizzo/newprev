import { useState } from 'react'
import { Select } from '../Select'
import { SimNao } from '../SimNao'
import type { SimNaoValor } from '../SimNao'
import { CONCLUSAO } from './opcoes'
import { ExameFisico, exameInicial } from './ExameFisico'
import type { ExameValue } from './ExameFisico'

export function Periodico() {
  // Perguntas iniciam em "Não"; a caixa de texto abre quando marca "Sim".
  const [queixa, setQueixa] = useState<SimNaoValor>('nao')
  const [queixaQuais, setQueixaQuais] = useState('')
  const [afastamento, setAfastamento] = useState<SimNaoValor>('nao')
  const [afastamentoQuando, setAfastamentoQuando] = useState('')
  const [acidente, setAcidente] = useState<SimNaoValor>('nao')
  const [acidenteQuando, setAcidenteQuando] = useState('')

  const [textoLivre1, setTextoLivre1] = useState('')
  const [exame, setExame] = useState<ExameValue>(exameInicial)
  const [textoLivre2, setTextoLivre2] = useState('')
  const [conclusao, setConclusao] = useState('')
  const [conduta, setConduta] = useState('')

  return (
    <div className="ficha">
      {/* Queixa exclusiva do trabalho */}
      <div className="ficha-section">
        <label className="field-label">
          Do último exame ocupacional até agora, tem ou teve alguma queixa, dor ou sintoma que julgue ser exclusivamente devido ao trabalho?
        </label>
        <SimNao value={queixa} onChange={setQueixa} />
        {queixa === 'sim' && (
          <textarea
            className="field-textarea inline-extra"
            rows={2}
            placeholder="Quais?"
            value={queixaQuais}
            onChange={(e) => setQueixaQuais(e.target.value)}
          />
        )}
      </div>

      {/* Afastamento > 15 dias */}
      <div className="ficha-section">
        <label className="field-label">
          Do último exame ocupacional até agora, teve algum afastamento do trabalho superior a 15 dias?
        </label>
        <SimNao value={afastamento} onChange={setAfastamento} />
        {afastamento === 'sim' && (
          <textarea
            className="field-textarea inline-extra"
            rows={2}
            placeholder="Quando?"
            value={afastamentoQuando}
            onChange={(e) => setAfastamentoQuando(e.target.value)}
          />
        )}
      </div>

      {/* Acidente de trabalho */}
      <div className="ficha-section">
        <label className="field-label">
          Do último exame ocupacional até agora, teve algum acidente de trabalho?
        </label>
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
        <label className="field-label" htmlFor="conduta-per">Conduta</label>
        <textarea
          id="conduta-per"
          className="field-textarea"
          rows={4}
          value={conduta}
          onChange={(e) => setConduta(e.target.value)}
        />
      </div>
    </div>
  )
}
