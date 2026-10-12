import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '../store'
import { iso, toCents } from '../lib/calc'
import { EXPENSE_CATS, INCOME_CATS } from '../lib/categories'
import { btn, field, PageHeader, primary, Seg } from '../components/ui'
import CategoryIcon from '../components/CategoryIcon'
import type { TxType } from '../types'

export default function AddTransaction() {
  const nav = useNavigate(), add = useStore((s) => s.addTx), cur = useStore((s) => s.cur)
  const [params] = useSearchParams()
  const [type, setType] = useState<TxType>(params.get('type') === 'income' ? 'income' : 'expense')
  const [cat, setCat] = useState('')
  const [amount, setAmount] = useState(''), [title, setTitle] = useState(''), [date, setDate] = useState(iso(0))
  const [acct, setAcct] = useState('Main'), [note, setNote] = useState('')
  const [err, setErr] = useState(''), [busy, setBusy] = useState(false)
  const cats = type === 'income' ? INCOME_CATS : EXPENSE_CATS
  const chosen = cats.includes(cat) ? cat : cats[0]

  const submit = () => {
    const amt = toCents(amount)
    if (!(amt > 0)) return setErr('Enter an amount greater than zero.')
    if (!title.trim()) return setErr('Add a title.')
    if (!date) return setErr('Choose a date.')
    setBusy(true)
    add({ title: title.trim(), type, cat: chosen, amt, date, acct: acct || 'Main', note })
    nav('/transactions')
  }

  return (
    <>
      <PageHeader title="Add Transaction" sub="Quick and clear." action={<Link to="/transactions" className={`${btn} grid place-items-center`}>Close</Link>} />
      <Seg value={type} onChange={setType} options={[{ v: 'expense', label: 'Expense' }, { v: 'income', label: 'Income' }]} />
      <label htmlFor="amt" className="mb-1 block text-sm text-muted">Amount ({cur})</label>
      <input id="amt" inputMode="decimal" placeholder="0.00" autoComplete="off" value={amount} onChange={(e) => setAmount(e.target.value)} className="mb-4 w-full border-b border-line bg-transparent py-2 text-center text-4xl font-bold" />
      <div className="mb-4 grid grid-cols-4 gap-2">
        {cats.map((c) => (
          <button key={c} aria-pressed={chosen === c} onClick={() => setCat(c)} className={`flex min-h-16 flex-col items-center gap-1 rounded-xl border p-2 text-[11px] ${chosen === c ? 'border-mint bg-surface2 text-ink' : 'border-line text-muted'}`}>
            <CategoryIcon cat={c} size={30} />{c}
          </button>
        ))}
      </div>
      <label htmlFor="title" className="mb-1 block text-sm text-muted">Title</label>
      <input id="title" className={field} placeholder="e.g. Lunch with friends" maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)} />
      <label htmlFor="date" className="mb-1 block text-sm text-muted">Date</label>
      <input id="date" type="date" className={field} value={date} onChange={(e) => setDate(e.target.value)} />
      <label htmlFor="acct" className="mb-1 block text-sm text-muted">Account</label>
      <input id="acct" className={field} value={acct} onChange={(e) => setAcct(e.target.value)} />
      <label htmlFor="note" className="mb-1 block text-sm text-muted">Note (optional)</label>
      <input id="note" className={field} placeholder="Add a note..." maxLength={120} value={note} onChange={(e) => setNote(e.target.value)} />
      {err && <p role="alert" className="mb-3 text-sm text-neg">{err}</p>}
      <button className={primary} disabled={busy} onClick={submit}>Add Transaction</button>
    </>
  )
}
