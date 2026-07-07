import { useEffect, useMemo, useState } from 'react'
import * as Icon from './icons'
import { TriagemForm } from './TriagemForm'
import type { Triagem } from './TriagemForm'
import { QuestionarioForm } from './QuestionarioForm'
import { Exames } from './Exames'
import { FichaClinica, FICHA_PADRAO } from './FichaClinica'

const TABS = [
  { id: 'ficha', label: 'Ficha clínica', icon: Icon.FileMedical },
  { id: 'triagem', label: 'Triagem', icon: Icon.Triage },
  { id: 'questionario', label: 'Questionário', icon: Icon.Clipboard },
  { id: 'exames', label: 'Exames', icon: Icon.Stethoscope },
  { id: 'queixas', label: 'Queixas/Procedimentos', icon: Icon.Target },
  { id: 'cid', label: 'CID 10', icon: Icon.Book },
  { id: 'linha', label: 'Linha do tempo', icon: Icon.Timeline },
  { id: 'anexos', label: 'Anexos', icon: Icon.Paperclip },
] as const

const TAB_IDS = TABS.map((t) => t.id)

// Paciente mockado (sem banco de dados).
const paciente = {
  nome: 'Ana Clara Menezes',
  cpf: '611.231.510-67',
  idade: '28 anos',
  sexo: 'Mulher',
  telefone: '(11) 12345678',
  email: 'exemplo@gmail.com',
}

// ---- Roteamento simples pela URL ----
// /ficha/<tipo>  -> aba Ficha clínica com o tipo indicado
// /<tab>         -> demais abas
// /              -> ficha (primeira aba)
type Rota = { tab: string; fichaTipo: string }

function parseRota(hash: string): Rota {
  const path = hash.replace(/^#/, '')
  const seg = path.replace(/^\/+|\/+$/g, '').split('/')
  if (seg[0] === 'ficha') return { tab: 'ficha', fichaTipo: seg[1] || FICHA_PADRAO }
  if (seg[0] && TAB_IDS.includes(seg[0] as (typeof TAB_IDS)[number])) {
    return { tab: seg[0], fichaTipo: FICHA_PADRAO }
  }
  return { tab: 'ficha', fichaTipo: FICHA_PADRAO }
}

function rotaParaPath({ tab, fichaTipo }: Rota): string {
  return tab === 'ficha' ? `/ficha/${fichaTipo}` : `/${tab}`
}

function useTimer(startSeconds: number) {
  const [seconds, setSeconds] = useState(startSeconds)
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return `${mm}:${ss}`
}

export default function App() {
  const [rota, setRota] = useState<Rota>(() => parseRota(window.location.hash))
  const [triagem, setTriagem] = useState<Triagem>({ pressao: '', peso: '', frequencia: '' })
  const [toast, setToast] = useState<string | null>(null)
  const tempo = useTimer(12 * 60 + 47)

  // Mantém a URL (hash) em sincronia com a aba ativa.
  useEffect(() => {
    const hash = `#${rotaParaPath(rota)}`
    if (window.location.hash !== hash) window.history.replaceState(null, '', hash)
  }, [rota])

  // Botões voltar/avançar do navegador.
  useEffect(() => {
    const onHash = () => setRota(parseRota(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const irParaAba = (tab: string) => {
    const nova = { ...rota, tab }
    window.location.hash = rotaParaPath(nova)
    setRota(nova)
  }

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const resumoTriagem = useMemo(() => {
    const parts: string[] = []
    if (triagem.pressao) parts.push(`Pressão ${triagem.pressao} mmHg`)
    if (triagem.peso) parts.push(`Peso ${triagem.peso} kg`)
    if (triagem.frequencia) parts.push(`FC ${triagem.frequencia} bpm`)
    return parts.length ? parts.join(' · ') : 'nenhum dado registrado'
  }, [triagem])

  return (
    <div className="app">
      {/* ----- Sidebar ----- */}
      <aside className="sidebar">
        <button className="sidebar-back" onClick={() => showToast('Voltar para a lista de atendimentos')}>
          <Icon.ArrowLeft /> Voltar
        </button>

        <div className="timer">
          <div className="timer-icon"><Icon.Clock /></div>
          <div className="timer-value">{tempo}</div>
          <div className="timer-label">Tempo de consulta</div>
        </div>

        <div className="sidebar-actions">
          <button className="btn btn-green" onClick={() => showToast(`Atendimento concluído — ${resumoTriagem}`)}>
            Concluir
          </button>
          <button className="btn btn-danger-outline" onClick={() => showToast('Atendimento abortado')}>
            Abortar
          </button>
        </div>

        <div className="sidebar-logo"><span>n</span>ewprev</div>
      </aside>

      {/* ----- Main ----- */}
      <main className="main">
        <div className="topbar">
          <div className="topbar-title">Enferm. ocupacional</div>
          <div className="topbar-user">
            <div className="topbar-user-name">
              <strong>Max Verstappen</strong>
              <small>Enfermaria</small>
            </div>
            <div className="avatar">MV</div>
          </div>
        </div>

        <div className="main-content">
        {/* Patient card */}
        <div className="patient-card">
          <div className="patient-avatar"><Icon.User size={22} /></div>
          <div className="patient-name">
            <strong>{paciente.nome}</strong>
            <small>{paciente.cpf}</small>
          </div>
          <div className="patient-divider" />
          <div className="patient-field">{paciente.idade}</div>
          <div className="patient-divider" />
          <div className="patient-field"><Icon.Venus /> {paciente.sexo}</div>
          <div className="patient-divider" />
          <div className="patient-field"><Icon.Phone /> {paciente.telefone}</div>
          <div className="patient-divider" />
          <div className="patient-field"><Icon.Mail /> {paciente.email}</div>
          <div className="patient-spacer" />
          <button className="patient-briefcase" onClick={() => showToast('Dados ocupacionais do paciente')}>
            <Icon.Briefcase />
          </button>
        </div>

        {/* Tabs */}
        <nav className="tabs">
          {TABS.map((t) => {
            const TabIcon = t.icon
            return (
              <button
                key={t.id}
                className={`tab ${rota.tab === t.id ? 'active' : ''}`}
                onClick={() => irParaAba(t.id)}
              >
                <TabIcon /> {t.label}
              </button>
            )
          })}
        </nav>

        {/* Panel */}
        {rota.tab === 'ficha' ? (
          <FichaClinica tipo={rota.fichaTipo} />
        ) : rota.tab === 'triagem' ? (
          <TriagemForm value={triagem} onChange={setTriagem} />
        ) : rota.tab === 'questionario' ? (
          <QuestionarioForm />
        ) : rota.tab === 'exames' ? (
          <Exames />
        ) : (
          <div className="panel">
            <div className="panel-placeholder">
              Aba “{TABS.find((t) => t.id === rota.tab)?.label}” — em construção.
            </div>
          </div>
        )}
        </div>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
