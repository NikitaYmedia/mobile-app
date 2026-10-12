import { useState } from 'react'
import { useFmt, useStore } from '../store'
import { expensesIn, pct, sum, toCents } from '../lib/calc'
import { EXPENSE_CATS } from '../lib/categories'
import { Bar, btn, Card, Empty, field, PageHeader, primary, Status } from '../components/ui'
import CategoryIcon from '../components/CategoryIcon'

export default function Budgets() {
  const { tx, budgets, addBudget, delBudget } = useStore()
  const f = useFmt()
  const [open, setOpen] = useState(false), [cat, setCat] = useState(''), [lim, setLim] = useState(''), [err, setErr] = useState('')
  const free = EXPENSE_CATS.filter((c) => !budgets.some((b) => b.cat === c))
  const spent = (c: string) => sum(expensesIn(tx, 30).filter((t) => t.cat === c))
  const totalLim = sum(budgets.map((b) => ({ amt: b.lim }))), totalSpent = sum(budgets.map((b) => ({ amt: spent(b.cat) })))

  const create = () => {
    const l = toCents(lim), c = cat || free[0]
    if (!c) return setErr('Every category already has a budget.')
    if (!(l > 0)) return setErr('Enter a limit greater than zero.')
    addBudget(c, l); setOpen(false); setLim(''); setErr('')
  }

  return (
    <>
      <PageHeader title="Budgets" sub="Spend with intention." action={<button className={btn} onClick={() => setOpen(!open)}>Create Budget</button>} />
      {open && (
        <Card>
          <label htmlFor="bc" className="mb-1 block text-sm text-muted">Category</label>
          <select id="bc" className={field} value={cat || free[0] || ''} onChange={(e) => setCat(e.target.value)}>{free.map((c) => <option key={c}>{c}</option>)}</select>
          <label htmlFor="bl" className="mb-1 block text-sm text-muted">Monthly limit</label>
          <input id="bl" inputMode="decimal" placeholder="0.00" className={field} value={lim} onChange={(e) => setLim(e.target.value)} />
          {err && <p role="alert" className="mb-3 text-sm text-neg">{err}</p>}
          <button className={primary} onClick={create}>Create Budget</button>
        </Card>
      )}
      {budgets.length === 0 ? <Empty title="Make room for better habits" text="Create a budget to keep your spending on track." /> : (
        <>
          <Card>
            <div className="text-sm text-muted">Monthly Budget (last 30 days)</div>
            <div className="text-2xl font-bold">{f(totalSpent)} <span className="text-sm font-normal text-muted">of {f(totalLim)}</span></div>
            <Bar value={pct(totalSpent, totalLim)} />
            <div className="text-xs text-muted">{totalLim > totalSpent ? `${f(totalLim - totalSpent)} remaining` : `${f(totalSpent - totalLim)} over`}</div>
          </Card>
          {budgets.map((b) => {
            const s = spent(b.cat), p = pct(s, b.lim)
            return (
              <Card key={b.id}>
                <div className="flex items-center gap-3"><CategoryIcon cat={b.cat} /><div className="flex-1"><b>{b.cat}</b><div className="text-xs text-muted">{f(s)} of {f(b.lim)}</div></div><Status p={p} /></div>
                <Bar value={p} />
                <div className="flex items-center justify-between text-xs text-muted"><span>{Math.round(p)}% used</span><span>{b.lim > s ? `${f(b.lim - s)} left` : `${f(s - b.lim)} over`}</span>
                  <button className="min-h-9 text-neg" onClick={() => window.confirm('Delete this budget?') && delBudget(b.id)}>Delete</button></div>
              </Card>
            )
          })}
        </>
      )}
    </>
  )
}
