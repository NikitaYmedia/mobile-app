import type { ReactNode } from 'react'

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <section className={`rounded-2xl border border-line bg-surface p-4 mb-3.5 ${className}`}>{children}</section>
)

export const PageHeader = ({ title, sub, action }: { title: string; sub: string; action?: ReactNode }) => (
  <header className="flex items-start justify-between gap-3 mb-4">
    <div><h1 className="text-[28px] font-bold tracking-tight">{title}</h1><p className="text-sm text-muted">{sub}</p></div>
    {action}
  </header>
)

export function Seg<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { v: T; label: string }[] }) {
  return (
    <div className="flex gap-0.5 rounded-xl border border-line bg-input p-[3px] mb-3.5" role="group">
      {options.map((o) => (
        <button key={o.v} aria-pressed={value === o.v} onClick={() => onChange(o.v)}
          className={`flex-1 min-h-10 rounded-[9px] text-sm transition-colors ${value === o.v ? 'bg-surface2 text-ink' : 'text-muted'}`}>{o.label}</button>
      ))}
    </div>
  )
}

export const Bar = ({ value }: { value: number }) => (
  <div className="h-2 rounded-full bg-input overflow-hidden my-2">
    <div className={`h-full rounded-full transition-[width] duration-300 ${value >= 100 ? 'bg-neg' : value >= 80 ? 'bg-warn' : 'bg-mint'}`} style={{ width: `${Math.min(value, 100)}%` }} />
  </div>
)

export const Status = ({ p }: { p: number }) =>
  p >= 100 ? <span className="text-neg text-sm">Over budget</span> : p >= 80 ? <span className="text-warn text-sm">Near limit</span> : <span className="text-mint text-sm">On track</span>

export const Empty = ({ title, text, children }: { title: string; text: string; children?: ReactNode }) => (
  <div className="text-center py-10 text-muted"><b className="block text-ink text-lg mb-1">{title}</b>{text}<div className="mt-4">{children}</div></div>
)

export const btn = 'min-h-11 rounded-xl border border-line bg-surface2 px-3.5 text-sm'
export const primary = 'w-full min-h-12 rounded-2xl font-semibold text-[#071018] bg-gradient-to-r from-[#A78BFA] via-[#699BFF] to-[#69E7C0] active:scale-[.98] disabled:opacity-40 transition'
export const field = 'w-full min-h-12 rounded-xl border border-line bg-input px-3 mb-3'
