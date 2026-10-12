import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowDownLeft, ArrowUpRight, Repeat } from 'lucide-react'
import { useFmt, useStore } from '../store'
import { balance, byCategory, expensesIn, pct, sum } from '../lib/calc'
import { Bar, Card, Seg } from '../components/ui'
import DonutChart from '../components/DonutChart'
import TransactionItem from '../components/TransactionItem'

const DAYS = { week: 7, month: 30, year: 365 }

export default function Home() {
  const { tx, budgets, opening, user } = useStore()
  const first = user?.name.split(' ')[0] ?? 'there'
  const f = useFmt()
  const [hide, setHide] = useState(false)
  const [period, setPeriod] = useState<keyof typeof DAYS>('month')
  const hr = new Date().getHours()
  const greeting = hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening'
  const periodSpend = expensesIn(tx, DAYS[period])
  const cur30 = sum(expensesIn(tx, 30)), prev30 = sum(expensesIn(tx, 30, 30))
  const limit = sum(budgets.map((b) => ({ amt: b.lim }))), used = pct(cur30, limit)
  const recent = [...tx].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4)
  const insight = prev30 === 0 ? 'Not enough history to compare yet.'
    : cur30 <= prev30 ? `You spent ${Math.round((1 - cur30 / prev30) * 100)}% less than the previous 30 days.`
    : `You spent ${Math.round((cur30 / prev30 - 1) * 100)}% more than the previous 30 days.`
  const qa = 'flex min-h-[76px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-line bg-surface text-sm'

  return (
    <>
      <h1 className="text-[28px] font-bold tracking-tight">{greeting}, {first}</h1>
      <p className="mb-4 text-sm text-muted">Let's make today count. <b className="text-mint">Demo account</b></p>
      <Card className="!rounded-3xl !p-5">
        <div className="flex items-center justify-between text-sm text-muted">Total Balance
          <button aria-label={hide ? 'Show balances' : 'Hide balances'} className="p-2" onClick={() => setHide(!hide)}>{hide ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>
        <div className="text-4xl font-bold tracking-tight">{hide ? '••••••' : f(balance(opening, tx))}</div>
        <div className="text-xs text-muted">Opening balance {f(opening)} + income − expenses</div>
      </Card>
      <div className="mb-3.5 grid grid-cols-3 gap-2.5">
        <Link to="/transactions/new?type=income" className={qa}><ArrowDownLeft size={20} className="text-mint" />Add Income</Link>
        <Link to="/transactions/new" className={qa}><ArrowUpRight size={20} className="text-neg" />Add Expense</Link>
        <button disabled className={`${qa} opacity-50`}><Repeat size={20} />Transfer<span className="text-[10px] text-muted">Coming soon</span></button>
      </div>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">Spending Overview</h2>
        <Seg value={period} onChange={setPeriod} options={[{ v: 'week', label: 'Week' }, { v: 'month', label: 'Month' }, { v: 'year', label: 'Year' }]} />
        <DonutChart data={byCategory(periodSpend)} total={f(sum(periodSpend))} />
      </Card>
      <Card>
        <h2 className="text-lg font-semibold">Monthly Spending</h2>
        <div className="text-3xl font-bold">{f(cur30)}</div>
        <div className="text-sm text-muted">{limit ? `of ${f(limit)} budget` : 'No budgets set'}</div>
        {limit > 0 && <><Bar value={used} /><div className="text-xs text-muted">{Math.round(used)}% used · {limit > cur30 ? `${f(limit - cur30)} remaining` : `${f(cur30 - limit)} over`}</div></>}
      </Card>
      <Card>
        <div className="mb-2 flex items-center justify-between"><h2 className="text-lg font-semibold">Recent</h2><Link to="/transactions" className="text-mint text-sm">See All</Link></div>
        <ul>{recent.map((t) => <TransactionItem key={t.id} t={t} />)}</ul>
      </Card>
      <Card><b>Insight</b><p className="text-sm text-muted">{insight}</p></Card>
    </>
  )
}
