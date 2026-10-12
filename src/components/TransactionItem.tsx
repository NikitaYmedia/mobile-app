import type { Tx } from '../types'
import { useFmt } from '../store'
import CategoryIcon from './CategoryIcon'

export default function TransactionItem({ t, onDelete }: { t: Tx; onDelete?: (id: string) => void }) {
  const f = useFmt()
  const inc = t.type === 'income'
  return (
    <li className="flex items-center gap-3 py-2.5 border-b border-line last:border-0">
      <CategoryIcon cat={t.cat} />
      <div className="min-w-0 flex-1">
        <div className="truncate">{t.title}</div>
        <div className="text-xs text-muted truncate">{t.cat}{t.note ? ` · ${t.note}` : ''} · {t.date}</div>
      </div>
      <b className={inc ? 'text-mint' : 'text-neg'}>{inc ? '+' : '−'}{f(t.amt)}</b>
      {onDelete && (
        <button className="min-h-9 px-2 text-xs text-muted" aria-label={`Delete ${t.title}`}
          onClick={() => window.confirm('Delete this transaction?') && onDelete(t.id)}>Delete</button>
      )}
    </li>
  )
}
