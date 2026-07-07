import { useRef, useState } from 'react'
import * as Icon from './icons'

// Exames vinculados ao ASO (simulação — viriam do PCMSO).
const EXAMES = [
  'Audiometria',
  'Acuidade Visual',
  'Hemograma completo',
  'Eletrocardiograma (ECG)',
]

type Anexo = { nome: string; tamanho: number }

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function ExameCard({ nome }: { nome: string }) {
  const [anexos, setAnexos] = useState<Anexo[]>([])
  const [arrastando, setArrastando] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const adicionar = (files: FileList | null) => {
    if (!files) return
    const novos = Array.from(files).map((f) => ({ nome: f.name, tamanho: f.size }))
    setAnexos((prev) => [...prev, ...novos])
  }

  const remover = (i: number) => setAnexos((prev) => prev.filter((_, idx) => idx !== i))

  return (
    <div className="exame-card">
      <div className="exame-card-title">
        <Icon.FileText size={18} /> {nome}
      </div>

      <div
        className={`dropzone ${arrastando ? 'drag' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setArrastando(true) }}
        onDragLeave={() => setArrastando(false)}
        onDrop={(e) => { e.preventDefault(); setArrastando(false); adicionar(e.dataTransfer.files) }}
      >
        <Icon.Upload size={22} />
        <div className="dropzone-text">
          <strong>Clique para anexar</strong> ou arraste o resultado aqui
        </div>
        <div className="dropzone-hint">PDF, imagem ou documento</div>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={(e) => { adicionar(e.target.files); e.target.value = '' }}
      />

      {anexos.length > 0 && (
        <div className="anexo-list">
          {anexos.map((a, i) => (
            <div className="anexo-item" key={i}>
              <Icon.FileText size={16} />
              <span className="anexo-nome">{a.nome}</span>
              <span className="anexo-tamanho">{formatSize(a.tamanho)}</span>
              <button type="button" className="anexo-remove" onClick={() => remover(i)} aria-label="Remover">×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Exames() {
  return (
    <div className="exame-grid">
      {EXAMES.map((nome) => (
        <ExameCard key={nome} nome={nome} />
      ))}
    </div>
  )
}
