import { useState } from 'react'
import { Select } from '../Select'
import { SimNao } from '../SimNao'
import type { SimNaoValor } from '../SimNao'
import { CONCLUSAO } from './opcoes'
import { ExameFisico, exameInicial } from './ExameFisico'
import type { ExameValue } from './ExameFisico'

export function MudancaRisco() {
  // Perguntas iniciam em "Não"; a caixa de texto abre quando marca "Sim".
  const [queixaTrabalho, setQueixaTrabalho] = useState<SimNaoValor>('nao')
  const [queixaTrabalhoQuais, setQueixaTrabalhoQuais] = useState('')
  const [limitacaoNova, setLimitacaoNova] = useState<SimNaoValor>('nao')
  const [limitacaoNovaQuais, setLimitacaoNovaQuais] = useState('')

  const [textoLivre1, setTextoLivre1] = useState('')
  const [exame, setExame] = useState<ExameValue>(exameInicial)
  const [textoLivre2, setTextoLivre2] = useState('')
  const [conclusao, setConclusao] = useState('')
  const [conduta, setConduta] = useState('')

  return (
    <div className="ficha">
      {/* Queixa exclusiva do trabalho desde o último exame */}
      <div className="ficha-section">
        <label className="field-label">
          Do último exame ocupacional até agora, tem ou teve alguma queixa, dor ou sintoma que julgue ser exclusivamente devido ao trabalho?
        </label>
        <SimNao value={queixaTrabalho} onChange={setQueixaTrabalho} />
        {queixaTrabalho === 'sim' && (
          <textarea
            className="field-textarea inline-extra"
            rows={2}
            placeholder="Quais?"
            value={queixaTrabalhoQuais}
            onChange={(e) => setQueixaTrabalhoQuais(e.target.value)}
          />
        )}
      </div>

      {/* Queixa/limitação para a nova função */}
      <div className="ficha-section">
        <label className="field-label">Tem alguma queixa ou limitação para assumir a nova função?</label>
        <SimNao value={limitacaoNova} onChange={setLimitacaoNova} />
        {limitacaoNova === 'sim' && (
          <textarea
            className="field-textarea inline-extra"
            rows={2}
            placeholder="Quais?"
            value={limitacaoNovaQuais}
            onChange={(e) => setLimitacaoNovaQuais(e.target.value)}
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
        <label className="field-label" htmlFor="conduta-mud">Conduta</label>
        <textarea
          id="conduta-mud"
          className="field-textarea"
          rows={4}
          value={conduta}
          onChange={(e) => setConduta(e.target.value)}
        />
      </div>
    </div>
  )
}
