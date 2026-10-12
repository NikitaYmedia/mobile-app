import { useState } from 'react'
import { useFmt, useStore } from '../store'
import { pct, sum, toCents } from '../lib/calc'
import { Bar, btn, Card, Empty, field, PageHeader, primary } from '../components/ui'
import type { Goal } from '../types'

function GoalCard({ g }: { g: Goal }) {
  const f = useFmt(), contribute = useStore((s) => s.contribute), del = useStore((s) => s.delGoal)
  const [v, setV] = useState('')
  const saved = sum(g.c), p = pct(saved, g.target)
  const add = () => { const a = toCents(v); if (a > 0) { contribute(g.id, a); setV('') } }
  return (
    <Card>
      <div className="mb-3 h-14 rounded-xl bg-gradient-to-r from-[#A78BFA] via-[#699BFF] to-[#69E7C0] opacity-80" aria-hidden />
      <div className="flex justify-between gap-2"><b>{g.name}</b><span className="text-xs text-muted">by {g.date}</span></div>
      <div className="text-sm text-muted">{f(saved)} of {f(g.target)}</div>
      <Bar value={p} />
      <div className="flex justify-between text-xs text-muted"><span>{Math.round(p)}% complete</span><span>{f(Math.max(g.target - saved, 0))} to go</span></div>
      <div className="mt-3 flex gap-2">
        <input aria-label={`Contribution to ${g.name}`} inputMode="decimal" placeholder="Amount" value={v} onChange={(e) => setV(e.target.value)} className="min-h-11 min-w-0 flex-1 rounded-xl border border-line bg-input px-3" />
        <button className={btn} onClick={add}>Add Money</button>
        <button className={btn} aria-label={`Delete ${g.name}`} onClick={() => window.confirm('Delete this goal?') && del(g.id)}>Delete</button>
      </div>
    </Card>
  )
}

export default function Goals() {
  const { goals, addGoal } = useStore()
  const [open, setOpen] = useState(false), [name, setName] = useState(''), [target, setTarget] = useState(''), [date, setDate] = useState(''), [err, setErr] = useState('')
  const create = () => {
    const t = toCents(target)
    if (!name.trim()) return setErr('Name your goal.')
    if (!(t > 0)) return setErr('Enter a target greater than zero.')
    if (!date) return setErr('Choose a target date.')
    addGoal({ name: name.trim(), target: t, date }); setOpen(false); setName(''); setTarget(''); setDate(''); setErr('')
  }
  return (
    <>
      <PageHeader title="Your Goals" sub="Small steps. Big dreams." action={<button className={btn} onClick={() => setOpen(!open)}>Create Goal</button>} />
      {open && (
        <Card>
          <label htmlFor="gn" className="mb-1 block text-sm text-muted">Goal name</label>
          <input id="gn" className={field} maxLength={50} placeholder="e.g. Emergency Fund" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="gt" className="mb-1 block text-sm text-muted">Target amount</label>
          <input id="gt" inputMode="decimal" className={field} placeholder="0.00" value={target} onChange={(e) => setTarget(e.target.value)} />
          <label htmlFor="gd" className="mb-1 block text-sm text-muted">Target date</label>
          <input id="gd" type="date" className={field} value={date} onChange={(e) => setDate(e.target.value)} />
          {err && <p role="alert" className="mb-3 text-sm text-neg">{err}</p>}
          <button className={primary} onClick={create}>Create Goal</button>
        </Card>
      )}
      {goals.length === 0 ? <Empty title="Give your savings a purpose" text="Set your first goal and start making progress." /> : goals.map((g) => <GoalCard key={g.id} g={g} />)}
      <p className="text-xs text-muted">Contributions are tracked separately and are not deducted from your balance.</p>
    </>
  )
}
