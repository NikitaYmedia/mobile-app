import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Budget, Goal, Theme, Tx, TxType, User } from './types'
import { fmt, iso } from './lib/calc'

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
const T = (i: number, title: string, type: TxType, cat: string, amt: number, ago: number): Tx =>
  ({ id: 's' + i, title, type, cat, amt, date: iso(ago), acct: 'Main', note: '' })

/** Demo data. Dates are relative to today so it never looks stale. */
const seed = () => ({
  cur: 'USD', theme: 'dark' as Theme, opening: 120000,
  tx: [
    T(0, 'Monthly Salary', 'income', 'Salary', 250000, 18), T(1, 'Apartment Rent', 'expense', 'Housing', 60000, 17),
    T(2, 'Gym Membership', 'expense', 'Health', 3500, 14), T(3, 'Grocery Store', 'expense', 'Food & Drinks', 6420, 9),
    T(4, 'Amazon', 'expense', 'Shopping', 4299, 6), T(5, 'Netflix', 'expense', 'Entertainment', 1599, 5),
    T(6, 'Uber', 'expense', 'Transport', 1840, 2), T(7, 'Freelance Logo', 'income', 'Freelance', 32000, 2),
    T(8, 'Starbucks', 'expense', 'Food & Drinks', 560, 1), T(9, 'Lunch with Sam', 'expense', 'Food & Drinks', 1850, 0)
  ] as Tx[],
  budgets: [
    { id: 'b0', cat: 'Food & Drinks', lim: 60000 }, { id: 'b1', cat: 'Transport', lim: 30000 },
    { id: 'b2', cat: 'Shopping', lim: 40000 }, { id: 'b3', cat: 'Entertainment', lim: 30000 }
  ] as Budget[],
  goals: [
    { id: 'g0', name: 'Vacation in Japan', target: 200000, date: '2027-04-01', c: [{ amt: 120000, date: iso(20) }] },
    { id: 'g1', name: 'New MacBook Pro', target: 250000, date: '2027-01-15', c: [{ amt: 80000, date: iso(12) }] }
  ] as Goal[]
})

interface State extends ReturnType<typeof seed> {
  addTx: (t: Omit<Tx, 'id'>) => void
  delTx: (id: string) => void
  addBudget: (cat: string, lim: number) => void
  delBudget: (id: string) => void
  addGoal: (g: { name: string; target: number; date: string }) => void
  delGoal: (id: string) => void
  contribute: (id: string, amt: number) => void
  setCur: (c: string) => void
  setTheme: (t: Theme) => void
  user: User | null
  signIn: (u: User) => void
  signOut: () => void
  reset: () => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      ...seed(),
      user: null,
      signIn: (user) => set({ user }),
      signOut: () => set({ user: null }),
      addTx: (t) => set((s) => ({ tx: [...s.tx, { ...t, id: uid() }] })),
      delTx: (id) => set((s) => ({ tx: s.tx.filter((t) => t.id !== id) })),
      addBudget: (cat, lim) => set((s) => ({ budgets: [...s.budgets, { id: uid(), cat, lim }] })),
      delBudget: (id) => set((s) => ({ budgets: s.budgets.filter((b) => b.id !== id) })),
      addGoal: (g) => set((s) => ({ goals: [...s.goals, { ...g, id: uid(), c: [] }] })),
      delGoal: (id) => set((s) => ({ goals: s.goals.filter((g) => g.id !== id) })),
      contribute: (id, amt) => set((s) => ({ goals: s.goals.map((g) => (g.id === id ? { ...g, c: [...g.c, { amt, date: iso(0) }] } : g)) })),
      setCur: (cur) => set({ cur }),
      setTheme: (theme) => set({ theme }),
      reset: () => set(seed())
    }),
    { name: 'pocket-demo-v1', version: 1 }
  )
)

export const useFmt = () => {
  const cur = useStore((s) => s.cur)
  return (c: number) => fmt(c, cur)
}
