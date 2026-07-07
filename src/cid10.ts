// Amostra de CID-10 (foco em acidente de trabalho).
// Trocar por lista completa depois — a busca já funciona com qualquer tamanho.
export type Cid = { codigo: string; descricao: string }

export const CID10: Cid[] = [
  { codigo: 'S01', descricao: 'Ferimento da cabeça' },
  { codigo: 'S02', descricao: 'Fratura do crânio e dos ossos da face' },
  { codigo: 'S06', descricao: 'Traumatismo intracraniano' },
  { codigo: 'S22', descricao: 'Fratura de costela(s), esterno e coluna torácica' },
  { codigo: 'S42', descricao: 'Fratura do ombro e do braço' },
  { codigo: 'S52', descricao: 'Fratura do antebraço' },
  { codigo: 'S61', descricao: 'Ferimento do punho e da mão' },
  { codigo: 'S62', descricao: 'Fratura ao nível do punho e da mão' },
  { codigo: 'S72', descricao: 'Fratura do fêmur' },
  { codigo: 'S82', descricao: 'Fratura da perna, incluindo tornozelo' },
  { codigo: 'S92', descricao: 'Fratura do pé (exceto tornozelo)' },
  { codigo: 'S93', descricao: 'Luxação, entorse e distensão ao nível do tornozelo e do pé' },
  { codigo: 'T14', descricao: 'Traumatismo de região não especificada do corpo' },
  { codigo: 'T20', descricao: 'Queimadura e corrosão da cabeça e pescoço' },
  { codigo: 'T23', descricao: 'Queimadura e corrosão do punho e da mão' },
  { codigo: 'T75', descricao: 'Efeitos de outras causas externas' },
  { codigo: 'M54', descricao: 'Dorsalgia' },
  { codigo: 'Z57', descricao: 'Exposição ocupacional a fatores de risco' },
]
