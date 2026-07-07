import { useState } from 'react'
import { Select } from '../Select'
import { SimNao } from '../SimNao'
import type { SimNaoValor } from '../SimNao'
import { CONCLUSAO } from './opcoes'
import { ExameFisico, exameInicial } from './ExameFisico'
import type { ExameValue } from './ExameFisico'

export function RetornoTrabalho() {
  // As três perguntas começam em "Sim"; a caixa de texto abre quando marca "Não".
  const [senteBem, setSenteBem] = useState<SimNaoValor>('sim')
  const [senteBemPorque, setSenteBemPorque] = useState('')
  const [limitacao, setLimitacao] = useState<SimNaoValor>('sim')
  const [limitacaoPorque, setLimitacaoPorque] = useState('')
  const [alta, setAlta] = useState<SimNaoValor>('sim')

  const [textoLivre1, setTextoLivre1] = useState('')
  const [exame, setExame] = useState<ExameValue>(exameInicial)
  const [textoLivre2, setTextoLivre2] = useState('')
  const [conclusao, setConclusao] = useState('')
  const [conduta, setConduta] = useState('')

  return (
    <div className="ficha">
      {/* Sente-se bem para retornar */}
      <div className="ficha-section">
        <label className="field-label">Você se sente bem para retornar a suas atividades laborais?</label>
        <SimNao value={senteBem} onChange={setSenteBem} />
        {senteBem === 'nao' && (
          <textarea
            className="field-textarea inline-extra"
            rows={2}
            placeholder="Por quê?"
            value={senteBemPorque}
            onChange={(e) => setSenteBemPorque(e.target.value)}
          />
        )}
      </div>

      {/* Limitação / sequela */}
      <div className="ficha-section">
        <label className="field-label">Tem alguma limitação/sequela decorrente do afastamento?</label>
        <SimNao value={limitacao} onChange={setLimitacao} />
        {limitacao === 'nao' && (
          <textarea
            className="field-textarea inline-extra"
            rows={2}
            placeholder="Por quê?"
            value={limitacaoPorque}
            onChange={(e) => setLimitacaoPorque(e.target.value)}
          />
        )}
      </div>

      {/* Alta pelo médico assistente */}
      <div className="ficha-section">
        <label className="field-label">
          Você está de alta pelo seu médico assistente (que o acompanhou durante o tratamento pelo qual se afastou)?
        </label>
        <SimNao value={alta} onChange={setAlta} />
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
        <label className="field-label" htmlFor="conduta-ret">Conduta</label>
        <textarea
          id="conduta-ret"
          className="field-textarea"
          rows={4}
          value={conduta}
          onChange={(e) => setConduta(e.target.value)}
        />
      </div>
    </div>
  )
}
