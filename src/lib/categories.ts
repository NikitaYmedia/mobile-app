import { Briefcase, Car, Coffee, Film, Gift, GraduationCap, HeartPulse, Home, Laptop, MoreHorizontal, Plane, ShoppingBag, TrendingUp, Wallet, Zap, type LucideIcon } from 'lucide-react'

export const EXPENSE_CATS = ['Food & Drinks', 'Transport', 'Shopping', 'Entertainment', 'Housing', 'Health', 'Utilities', 'Education', 'Travel', 'Other']
export const INCOME_CATS = ['Salary', 'Freelance', 'Business', 'Investments', 'Gifts', 'Other']

export const CAT: Record<string, { icon: LucideIcon; color: string }> = {
  'Food & Drinks': { icon: Coffee, color: '#FFC66D' }, Transport: { icon: Car, color: '#53D9EE' },
  Shopping: { icon: ShoppingBag, color: '#FF8FA3' }, Entertainment: { icon: Film, color: '#A78BFA' },
  Housing: { icon: Home, color: '#699BFF' }, Health: { icon: HeartPulse, color: '#69E7C0' },
  Utilities: { icon: Zap, color: '#53D9EE' }, Education: { icon: GraduationCap, color: '#A78BFA' },
  Travel: { icon: Plane, color: '#699BFF' }, Other: { icon: MoreHorizontal, color: '#A3AEC2' },
  Salary: { icon: Wallet, color: '#69E7C0' }, Freelance: { icon: Laptop, color: '#53D9EE' },
  Business: { icon: Briefcase, color: '#699BFF' }, Investments: { icon: TrendingUp, color: '#A78BFA' },
  Gifts: { icon: Gift, color: '#FF8FA3' }
}
