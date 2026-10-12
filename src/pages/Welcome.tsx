import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { useStore } from '../store'

/** Animated splash. Plays once, then moves on to sign-up. */
export default function Welcome() {
  const nav = useNavigate(), user = useStore((s) => s.user)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t1 = setTimeout(() => setLeaving(true), reduce ? 600 : 2400)
    const t2 = setTimeout(() => nav('/auth/sign-up', { replace: true }), reduce ? 900 : 2900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [nav])

  if (user) return <Navigate to="/home" replace />

  return (
    <div className={`relative grid min-h-[100dvh] place-items-center overflow-hidden px-6 transition-opacity duration-500 ${leaving ? 'opacity-0' : 'opacity-100'}`}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(circle, rgba(83,217,238,0.14) 0%, transparent 70%)' }} />
      <div className="relative text-center">
        <div className="relative mx-auto mb-8 grid h-28 w-28 place-items-center">
          <span className="a-ring absolute inset-0 rounded-full border border-mint" />
          <Logo size={88} className="a-pop" />
        </div>
        <h1 className="a-rise text-4xl font-bold tracking-tight" style={{ animationDelay: '.5s' }}>Pocket</h1>
        <p className="a-rise mt-3 text-xl font-semibold" style={{ animationDelay: '.8s' }}>Your money. Your future.</p>
        <p className="a-rise mx-auto mt-2 max-w-xs text-sm text-muted" style={{ animationDelay: '1.1s' }}>Track spending, build better habits, and reach your financial goals — all in one place.</p>
      </div>
      <div className="absolute inset-x-10 bottom-[calc(2.5rem+env(safe-area-inset-bottom))] mx-auto max-w-xs">
        <div className="h-1 overflow-hidden rounded-full bg-input"><div className="a-load h-full rounded-full bg-gradient-to-r from-[#A78BFA] via-[#699BFF] to-[#69E7C0]" /></div>
        <Link to="/auth/sign-up" replace className="mt-4 block text-center text-sm text-muted">Skip</Link>
      </div>
    </div>
  )
}
