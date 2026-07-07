import { useState } from 'react'

type Resposta = 'sim' | 'nao'

// Dois questionários (sem banco de dados) — cada um com sua lista de perguntas.
const QUESTIONARIOS: { id: string; nome: string; perguntas: string[] }[] = [
  {
    id: 'covid',
    nome: 'Rastreio COVID-19',
    perguntas: [
      'Teve febre nos últimos dias?',
      'Apresentou tosse seca ou persistente?',
      'Sentiu perda de olfato ou paladar?',
      'Teve contato com caso confirmado?',
      'Sente falta de ar ou dificuldade para respirar?',
    ],
  },
  {
    id: 'brigada',
    nome: 'Brigada de emergência',
    perguntas: [
      'Possui treinamento de combate a incêndio?',
      'Conhece as rotas de fuga do setor?',
      'Sabe operar um extintor de incêndio?',
      'Participou do último simulado de evacuação?',
    ],
  },
]

function Radio({ checked }: { checked: boolean }) {
  return (
    <span className={`radio-dot ${checked ? 'checked' : ''}`}>
      {checked && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )}
    </span>
  )
}

export function QuestionarioForm() {
  const [ativo, setAtivo] = useState(QUESTIONARIOS[0].id)
  // respostas: { [questionarioId]: { [indice]: 'sim' | 'nao' } }
  const [respostas, setRespostas] = useState<Record<string, Record<number, Resposta>>>({})

  const questionario = QUESTIONARIOS.find((q) => q.id === ativo)!
  const respostasAtuais = respostas[ativo] ?? {}

  const responder = (indice: number, valor: Resposta) => {
    setRespostas((prev) => ({
      ...prev,
      [ativo]: { ...(prev[ativo] ?? {}), [indice]: valor },
    }))
  }

  return (
    <div className="panel">
      <div className="quest-pills">
        {QUESTIONARIOS.map((q) => (
          <button
            key={q.id}
            className={`quest-pill ${ativo === q.id ? 'active' : ''}`}
            onClick={() => setAtivo(q.id)}
          >
            {q.nome}
          </button>
        ))}
      </div>

      {questionario.perguntas.map((pergunta, i) => (
        <div className="quest-item" key={i}>
          <div className="quest-question">
            {i + 1} - {pergunta}
          </div>
          <div className="quest-options">
            <button className="quest-option" onClick={() => responder(i, 'sim')}>
              <Radio checked={respostasAtuais[i] === 'sim'} /> SIM
            </button>
            <button className="quest-option" onClick={() => responder(i, 'nao')}>
              <Radio checked={respostasAtuais[i] === 'nao'} /> Não
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
