import * as Icon from '../icons'

// Exame físico — quadro compartilhado entre as fichas.
// Todos os sistemas começam "Normal"; ao marcar "Alterado" abre caixa de texto.
const SISTEMAS = [
  { key: 'estadoGeral', titulo: 'Estado Geral', descricao: 'BEG, corado, hidratado, orientado' },
  { key: 'cardiologico', titulo: 'Cardiológico', descricao: 'BRNF em 2T sem sopros ou estalidos' },
  {
    key: 'pulmonar',
    titulo: 'Pulmonar',
    descricao: 'Murmúrio vesicular + sem ruídos adventícios. Expansibilidade e elasticidade de tórax preservadas',
  },
  {
    key: 'abdome',
    titulo: 'Abdome',
    descricao: 'Inocente, flácido, indolor à palpação, RHA+, sem distensões, abaulamentos ou herniações',
  },
  {
    key: 'membros',
    titulo: 'Membros',
    descricao:
      'Força muscular preservada globalmente. Sem limitações de mobilidade. Pulsos presentes, palpáveis e simétricos. Sem deformidades',
  },
  {
    key: 'neurologico',
    titulo: 'Neurológico',
    descricao:
      'Pupilas isocóricas e fotorreagentes. Sem déficits motores ou sensitivos. Coordenação preservada. Marcha preservada',
  },
] as const

export type ExamStatus = 'normal' | 'alterado'
export type ExameValue = {
  sistemas: Record<string, { status: ExamStatus; descricao: string }>
  observacoes: string
}

const OBS_LIMITE = 4900

export function exameInicial(): ExameValue {
  const sistemas = SISTEMAS.reduce((acc, s) => {
    acc[s.key] = { status: 'normal' as ExamStatus, descricao: '' }
    return acc
  }, {} as ExameValue['sistemas'])
  return { sistemas, observacoes: '' }
}

function StatusToggle({ status, onChange }: { status: ExamStatus; onChange: (s: ExamStatus) => void }) {
  return (
    <div className="seg">
      <button type="button" className={`seg-btn ${status === 'normal' ? 'on-normal' : ''}`} onClick={() => onChange('normal')}>
        Normal
      </button>
      <button type="button" className={`seg-btn ${status === 'alterado' ? 'on-alterado' : ''}`} onClick={() => onChange('alterado')}>
        Alterado
      </button>
    </div>
  )
}

type Props = {
  value: ExameValue
  onChange: (value: ExameValue) => void
}

export function ExameFisico({ value, onChange }: Props) {
  const setStatus = (key: string, status: ExamStatus) =>
    onChange({ ...value, sistemas: { ...value.sistemas, [key]: { ...value.sistemas[key], status } } })
  const setDescricao = (key: string, descricao: string) =>
    onChange({ ...value, sistemas: { ...value.sistemas, [key]: { ...value.sistemas[key], descricao } } })

  return (
    <div className="ficha-section">
      <div className="exam-head">
        <Icon.Stethoscope size={16} /> Exame físico — Para uso exclusivo do médico
      </div>
      <div className="exam-grid">
        {SISTEMAS.map((s) => {
          const st = value.sistemas[s.key]
          return (
            <div className="exam-cell" key={s.key}>
              <div className="exam-cell-head">
                <div className="exam-title">{s.titulo}</div>
                <StatusToggle status={st.status} onChange={(v) => setStatus(s.key, v)} />
              </div>
              <div className="exam-desc">{s.descricao}</div>
              {st.status === 'alterado' && (
                <textarea
                  className="field-textarea exam-alterado"
                  rows={2}
                  placeholder={`Descreva o alterado em ${s.titulo.toLowerCase()}...`}
                  value={st.descricao}
                  onChange={(e) => setDescricao(s.key, e.target.value)}
                />
              )}
            </div>
          )
        })}

        <div className="exam-cell exam-cell-full">
          <div className="exam-title">Outras observações</div>
          <textarea
            className="field-textarea"
            rows={3}
            maxLength={OBS_LIMITE}
            value={value.observacoes}
            onChange={(e) => onChange({ ...value, observacoes: e.target.value })}
          />
          <div className="char-counter">Caracteres restantes: {OBS_LIMITE - value.observacoes.length}</div>
        </div>
      </div>
    </div>
  )
}
