import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Logo from '../components/Logo'
import { AppleIcon, GoogleIcon } from '../components/SocialIcons'
import { field, primary } from '../components/ui'
import { useStore } from '../store'

type Via = '' | 'google' | 'apple' | 'email'
const Spinner = () => <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />

/** Demo-only auth: nothing is sent anywhere, any details work. */
export default function Auth({ mode }: { mode: 'sign-up' | 'sign-in' }) {
  const nav = useNavigate(), user = useStore((s) => s.user), signIn = useStore((s) => s.signIn)
  const [name, setName] = useState(''), [email, setEmail] = useState(''), [pw, setPw] = useState('')
  const [show, setShow] = useState(false), [err, setErr] = useState(''), [busy, setBusy] = useState<Via>('')
  const up = mode === 'sign-up'

  const go = (via: Via, n: string, e: string) => {
    setBusy(via)
    setTimeout(() => { signIn({ name: n, email: e }); nav('/home', { replace: true }) }, 900)
  }
  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    if (up && !name.trim()) return setErr('Enter your name.')
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setErr('Enter a valid email address.')
    if (up ? pw.length < 8 : pw.length < 1) return setErr(up ? 'Use at least 8 characters for your password.' : 'Enter your password.')
    setErr('')
    go('email', up ? name.trim() : email.split('@')[0], email.trim())
  }

  if (user) return <Navigate to="/home" replace />
  const social = 'flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl bg-white font-semibold disabled:opacity-60 active:scale-[.98] transition'

  return (
    <div className="mx-auto min-h-[100dvh] max-w-sm px-5 py-10 a-rise">
      <Logo size={48} />
      <h1 className="mt-6 text-3xl font-bold tracking-tight">{up ? 'Create your account' : 'Welcome back'}</h1>
      <p className="mb-6 mt-1 text-sm text-muted">{up ? 'Start tracking your money in under a minute.' : 'Sign in to pick up where you left off.'}</p>

      <div className="mb-5 grid gap-2.5">
        <button className={`${social} text-[#1f1f1f]`} disabled={!!busy} onClick={() => go('google', 'Alex Johnson', 'alex.johnson@gmail.com')}>
          {busy === 'google' ? <Spinner /> : <GoogleIcon />}Continue with Google
        </button>
        <button className={`${social} text-black`} disabled={!!busy} onClick={() => go('apple', 'Alex Johnson', 'alex.johnson@icloud.com')}>
          {busy === 'apple' ? <Spinner /> : <AppleIcon />}Continue with Apple
        </button>
      </div>

      <div className="mb-5 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" />or use email<span className="h-px flex-1 bg-line" /></div>

      <form onSubmit={submit} noValidate>
        {up && (<>
          <label htmlFor="name" className="mb-1 block text-sm text-muted">Full name</label>
          <input id="name" className={field} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </>)}
        <label htmlFor="email" className="mb-1 block text-sm text-muted">Email</label>
        <input id="email" type="email" className={field} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="pw" className="mb-1 block text-sm text-muted">Password</label>
        <div className="relative">
          <input id="pw" type={show ? 'text' : 'password'} className={`${field} pr-12`} autoComplete={up ? 'new-password' : 'current-password'} value={pw} onChange={(e) => setPw(e.target.value)} />
          <button type="button" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)} className="absolute right-1 top-1 grid h-10 w-10 place-items-center text-muted">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
        </div>
        {err && <p role="alert" className="mb-3 text-sm text-neg">{err}</p>}
        <button type="submit" className={primary} disabled={!!busy}>{busy === 'email' ? 'Please wait…' : up ? 'Create account' : 'Sign in'}</button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        {up ? <>Already have an account? <Link to="/auth/sign-in" className="text-mint">Sign in</Link></> : <>New to Pocket? <Link to="/auth/sign-up" className="text-mint">Create an account</Link></>}
      </p>
      <button className="mx-auto mt-3 block min-h-11 text-sm text-muted underline" disabled={!!busy} onClick={() => go('email', 'Alex Johnson', 'alex.johnson@example.com')}>Explore as a guest</button>
      <p className="mt-6 text-center text-xs text-muted">Demo mode: nothing is sent to a server, and any details will work.</p>
    </div>
  )
}
