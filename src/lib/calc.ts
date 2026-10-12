import type { Tx } from '../types'

const DAY = 864e5
export const iso = (daysAgo = 0) => new Date(Date.now() - daysAgo * DAY).toISOString().slice(0, 10)
export const fmt = (cents: number, cur: string) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: cur }).format(cents / 100)
export const toCents = (v: string) => Math.round(parseFloat(v.replace(',', '.')) * 100)
export const sum = (a: { amt: number }[]) => a.reduce((x, t) => x + t.amt, 0)
export const pct = (a: number, b: number) => (b > 0 ? (a / b) * 100 : 0)

/** Total Balance = Opening Balance + Income - Expenses */
export const balance = (opening: number, tx: Tx[]) =>
  opening + sum(tx.filter((t) => t.type === 'income')) - sum(tx.filter((t) => t.type === 'expense'))

/** Expenses in the window [offset, offset + days) days ago. */
export const expensesIn = (tx: Tx[], days: number, offset = 0) =>
  tx.filter((t) => {
    if (t.type !== 'expense') return false
    const d = (Date.now() - new Date(t.date).getTime()) / DAY
    return d >= offset && d < days + offset
  })

export const byCategory = (tx: Tx[]) => {
  const m: Record<string, number> = {}
  tx.forEach((t) => { m[t.cat] = (m[t.cat] || 0) + t.amt })
  return Object.entries(m).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

export const toCsv = (tx: Tx[]) => {
  const q = (s: string) => `"${s.replace(/"/g, '""').replace(/^[=+\-@]/, "'$&")}"`
  const rows = [['Date', 'Title', 'Type', 'Category', 'Amount', 'Account', 'Note'],
    ...tx.map((t) => [t.date, t.title, t.type, t.cat, (t.amt / 100).toFixed(2), t.acct, t.note])]
  return rows.map((r) => r.map(q).join(',')).join('\n')
}
