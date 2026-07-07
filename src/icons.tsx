// Ícones SVG inline (stroke) — sem dependências externas.
type P = { size?: number }
const base = (size = 18) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export const ArrowLeft = ({ size }: P) => (
  <svg {...base(size ?? 18)}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
)
export const Clock = ({ size }: P) => (
  <svg {...base(size ?? 26)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)
export const User = ({ size }: P) => (
  <svg {...base(size ?? 18)}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>
)
export const Venus = ({ size }: P) => (
  <svg {...base(size ?? 16)}><circle cx="12" cy="9" r="5" /><path d="M12 14v7" /><path d="M9 18h6" /></svg>
)
export const Phone = ({ size }: P) => (
  <svg {...base(size ?? 16)}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
)
export const Mail = ({ size }: P) => (
  <svg {...base(size ?? 16)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
export const Briefcase = ({ size }: P) => (
  <svg {...base(size ?? 20)}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
)
export const Stethoscope = ({ size }: P) => (
  <svg {...base(size ?? 16)}><path d="M5 3v6a4 4 0 0 0 8 0V3" /><path d="M9 15v2a4 4 0 0 0 8 0v-2" /><circle cx="18" cy="11" r="2" /></svg>
)
export const Triage = ({ size }: P) => (
  <svg {...base(size ?? 16)}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>
)
export const Clipboard = ({ size }: P) => (
  <svg {...base(size ?? 16)}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1" /><path d="M8 10h8M8 14h5" /></svg>
)
export const Target = ({ size }: P) => (
  <svg {...base(size ?? 16)}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /></svg>
)
export const Book = ({ size }: P) => (
  <svg {...base(size ?? 16)}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 5v14" /></svg>
)
export const Timeline = ({ size }: P) => (
  <svg {...base(size ?? 16)}><circle cx="6" cy="12" r="2" /><circle cx="18" cy="12" r="2" /><path d="M8 12h8" /></svg>
)
export const Paperclip = ({ size }: P) => (
  <svg {...base(size ?? 16)}><path d="M21 11l-9 9a5 5 0 0 1-7-7l8-8a3.5 3.5 0 0 1 5 5l-8 8a2 2 0 0 1-3-3l8-8" /></svg>
)
export const FileMedical = ({ size }: P) => (
  <svg {...base(size ?? 16)}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M12 11v6M9 14h6" /></svg>
)
export const Search = ({ size }: P) => (
  <svg {...base(size ?? 16)}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
)
export const Upload = ({ size }: P) => (
  <svg {...base(size ?? 20)}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" /></svg>
)
export const FileText = ({ size }: P) => (
  <svg {...base(size ?? 16)}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h6" /></svg>
)
