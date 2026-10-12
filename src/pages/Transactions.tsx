import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import { iso } from '../lib/calc'
import { btn, Card, Empty, PageHeader, Seg } from '../components/ui'
import TransactionItem from '../components/TransactionItem'

type Filter = 'all' | 'income' | 'expense'
const label = (d: string) => (d === iso(0) ? 'Today' : d === iso(1) ? 'Yesterday' : d)

export default function Transactions() {
  const tx = useStore((s) => s.tx), del = useStore((s) => s.delTx)
  const [q, setQ] = useState(''), [type, setType] = useState<Filter>('all'), [sort, setSort] = useState('new')
  const groups = useMemo(() => {
    const l = tx.filter((t) => (type === 'all' || t.type === type) && `${t.title} ${t.note} ${t.cat}`.toLowerCase().includes(q.toLowerCase()))
    l.sort((a, b) => sort === 'amt' ? b.amt - a.amt : sort === 'old' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date))
    const g = new Map<string, typeof l>()
    l.forEach((t) => g.set(t.date, [...(g.get(t.date) ?? []), t]))
    return [...g.entries()]
  }, [tx, q, type, sort])

  return (
    <>
      <PageHeader title="Transactions" sub="Your money, in motion." action={<Link to="/transactions/new" className={`${btn} grid place-items-center`}>Add</Link>} />
      <input type="search" aria-label="Search transactions" placeholder="Search transactions..." value={q} onChange={(e) => setQ(e.target.value)} className="mb-3 min-h-12 w-full rounded-xl border border-line bg-input px-3" />
      <Seg value={type} onChange={setType} options={[{ v: 'all', label: 'All' }, { v: 'income', label: 'Income' }, { v: 'expense', label: 'Expenses' }]} />
      <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)} className="mb-2 min-h-11 w-full rounded-xl border border-line bg-input px-3">
        <option value="new">Newest first</option><option value="old">Oldest first</option><option value="amt">Highest amount</option>
      </select>
      {groups.length === 0 ? (
        <Empty title={tx.length ? 'No matches' : 'No transactions yet'} text={tx.length ? 'Try a different search or filter.' : 'Your financial journey starts with your first transaction.'}>
          <Link to="/transactions/new" className={btn + ' inline-grid place-items-center'}>Add Transaction</Link>
        </Empty>
      ) : groups.map(([d, list]) => (
        <div key={d}><div className="mt-4 mb-1.5 px-1 text-sm text-muted">{label(d)}</div><Card className="!py-1"><ul>{list.map((t) => <TransactionItem key={t.id} t={t} onDelete={del} />)}</ul></Card></div>
      ))}
    </>
  )
}
