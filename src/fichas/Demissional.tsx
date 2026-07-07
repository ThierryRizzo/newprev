import { useState } from 'react'
import { Select } from '../Select'
import { SimNao } from '../SimNao'
import type { SimNaoValor } from '../SimNao'
import { CONCLUSAO } from './opcoes'
import { ExameFisico, exameInicial } from './ExameFisico'
import type { ExameValue } from './ExameFisico'

export function Demissional() {
  // As perguntas começam em "Não"; a caixa de texto abre quando marca "Sim".
  const [queixa, setQueixa] = useState<SimNaoValor>('nao')
  const [queixaQuais, setQueixaQuais] = useState('')
  const [limitacao, setLimitacao] = useState<SimNaoValor>('nao')
  const [limitacaoQuais, setLimitacaoQuais] = useState('')

  const [textoLivre1, setTextoLivre1] = useState('')
  const [exame, setExame] = useState<ExameValue>(exameInicial)
  const [textoLivre2, setTextoLivre2] = useState('')
  const [conclusao, setConclusao] = useState('')
  const [conduta, setConduta] = useState('')

  return (
    <div className="ficha">
      {/* Queixa exclusiva do trabalho */}
      <div className="ficha-section">
        <label className="field-label">Tem alguma queixa que seja exclusiva do trabalho que vinha exercendo?</label>
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

      {/* Limitação */}
      <div className="ficha-section">
        <label className="field-label">Tem alguma limitação que te impeça de trabalhar daqui pra frente?</label>
        <SimNao value={limitacao} onChange={setLimitacao} />
        {limitacao === 'sim' && (
          <textarea
            className="field-textarea inline-extra"
            rows={2}
            placeholder="Quais?"
            value={limitacaoQuais}
            onChange={(e) => setLimitacaoQuais(e.target.value)}
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
        <label className="field-label" htmlFor="conduta-dem">Conduta</label>
        <textarea
          id="conduta-dem"
          className="field-textarea"
          rows={4}
          value={conduta}
          onChange={(e) => setConduta(e.target.value)}
        />
      </div>
    </div>
  )
}
