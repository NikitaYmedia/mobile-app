import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useStore } from '../store'
import { Home, ArrowLeftRight, PieChart, Target, User } from 'lucide-react'

const items = [
  { to: '/home', label: 'Home', icon: Home }, { to: '/transactions', label: 'Activity', icon: ArrowLeftRight },
  { to: '/budgets', label: 'Budgets', icon: PieChart }, { to: '/goals', label: 'Goals', icon: Target },
  { to: '/profile', label: 'Profile', icon: User }
]

export default function AppShell() {
  const user = useStore((s) => s.user)
  if (!user) return <Navigate to="/welcome" replace />
  return (
    <>
      <main className="mx-auto max-w-xl px-4 pt-5 pb-28 md:max-w-3xl md:pl-52 md:pb-10">
        <Outlet />
      </main>
      <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 border-t border-line bg-bg pb-[env(safe-area-inset-bottom)] md:inset-y-0 md:right-auto md:w-44 md:border-r md:border-t-0 md:pt-6">
        <div className="mx-auto flex max-w-xl md:max-w-none md:flex-col">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] md:flex-none md:flex-row md:justify-start md:gap-3 md:px-5 md:text-sm ${isActive ? 'text-mint' : 'text-muted'}`}>
              <Icon size={22} aria-hidden />{label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  )
}
