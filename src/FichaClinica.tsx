import type { ComponentType } from 'react'
import { AcidenteTrabalho } from './fichas/AcidenteTrabalho'
import { Admissional } from './fichas/Admissional'
import { Assistencial } from './fichas/Assistencial'
import { RetornoTrabalho } from './fichas/RetornoTrabalho'
import { Demissional } from './fichas/Demissional'
import { MudancaRisco } from './fichas/MudancaRisco'
import { Periodico } from './fichas/Periodico'

// Registro de fichas por tipo de atendimento.
// Para adicionar um novo modelo: crie o componente e registre o tipo aqui.
// O `tipo` é o que aparece no fim da URL: /ficha/<tipo>
export const FICHAS: Record<string, { label: string; Component: ComponentType }> = {
  'acidente-trabalho': { label: 'Acidente de Trabalho', Component: AcidenteTrabalho },
  'admissional': { label: 'Admissional', Component: Admissional },
  'assistencial': { label: 'Assistencial', Component: Assistencial },
  'retorno-trabalho': { label: 'Retorno ao Trabalho', Component: RetornoTrabalho },
  'demissional': { label: 'Demissional', Component: Demissional },
  'mudanca-risco': { label: 'Mudança de Risco', Component: MudancaRisco },
  'periodico': { label: 'Periódico', Component: Periodico },
}

export const FICHA_PADRAO = 'acidente-trabalho'

export function FichaClinica({ tipo }: { tipo: string }) {
  const ficha = FICHAS[tipo]

  if (!ficha) {
    return (
      <div className="panel">
        <div className="panel-placeholder">
          Ficha “{tipo}” ainda não foi cadastrada.
        </div>
      </div>
    )
  }

  const { label, Component } = ficha
  return (
    <div className="panel">
      <div className="ficha-header">Ficha clínica — {label}</div>
      <div className="ficha-sub">Consulta preenchida pelo médico</div>
      <Component />
    </div>
  )
}
