import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import Home from './pages/Home'
import Transactions from './pages/Transactions'
import AddTransaction from './pages/AddTransaction'
import Budgets from './pages/Budgets'
import Goals from './pages/Goals'
import Profile from './pages/Profile'
import Welcome from './pages/Welcome'
import Auth from './pages/Auth'
import { useStore } from './store'

export default function App() {
  const theme = useStore((s) => s.theme)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const apply = () => document.documentElement.classList.toggle('light', theme === 'light' || (theme === 'system' && mq.matches))
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])

  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/auth/sign-up" element={<Auth mode="sign-up" />} />
      <Route path="/auth/sign-in" element={<Auth mode="sign-in" />} />
      <Route element={<AppShell />}>
        <Route path="/home" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/new" element={<AddTransaction />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
