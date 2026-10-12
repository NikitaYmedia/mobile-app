import { useFmt, useStore } from '../store'
import { sum, toCsv } from '../lib/calc'
import { btn, Card, field, PageHeader } from '../components/ui'
import type { Theme } from '../types'

export default function Profile() {
  const { tx, cur, theme, setCur, setTheme, reset, user, signOut } = useStore()
  const f = useFmt()
  const inc = sum(tx.filter((t) => t.type === 'income')), exp = sum(tx.filter((t) => t.type === 'expense'))
  const exportCsv = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([toCsv(tx)], { type: 'text/csv' }))
    a.download = 'pocket-transactions.csv'; a.click()
  }
  return (
    <>
      <PageHeader title="Profile" sub="Demo account" />
      <Card><b>{user?.name}</b><div className="text-sm text-muted">{user?.email}</div></Card>
      <Card>
        <div className="flex justify-between"><span>Total income</span><b className="text-mint">+{f(inc)}</b></div>
        <div className="flex justify-between"><span>Total expenses</span><b className="text-neg">−{f(exp)}</b></div>
        <div className="flex justify-between"><span>Net cash flow</span><b>{f(inc - exp)}</b></div>
      </Card>
      <Card>
        <label htmlFor="cur" className="mb-1 block text-sm text-muted">Currency (display only, no conversion)</label>
        <select id="cur" className={field} value={cur} onChange={(e) => setCur(e.target.value)}>{['USD', 'EUR', 'GBP', 'DKK'].map((c) => <option key={c}>{c}</option>)}</select>
        <label htmlFor="th" className="mb-1 block text-sm text-muted">Appearance</label>
        <select id="th" className={field + ' !mb-0'} value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
          <option value="dark">Dark</option><option value="light">Light</option><option value="system">System</option>
        </select>
      </Card>
      <button className={`${btn} mb-2.5 w-full`} onClick={exportCsv}>Export transactions (CSV)</button>
      <button className={`${btn} w-full text-neg`} onClick={() => window.confirm('Reset all demo data?') && reset()}>Reset demo data</button>
      <button className={`${btn} mt-2.5 w-full`} onClick={() => window.confirm('Sign out?') && signOut()}>Sign out</button>
    </>
  )
}
