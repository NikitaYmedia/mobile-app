/** Pocket mark: two overlapping rounded shapes (a folded wallet) in the brand gradient. */
export default function Logo({ size = 72, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role="img" aria-label="Pocket">
      <defs>
        <linearGradient id="pocket-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A78BFA" /><stop offset=".5" stopColor="#699BFF" /><stop offset="1" stopColor="#69E7C0" />
        </linearGradient>
      </defs>
      <rect x="6" y="14" width="40" height="36" rx="12" fill="url(#pocket-g)" opacity=".55" />
      <rect x="18" y="20" width="40" height="32" rx="12" fill="url(#pocket-g)" />
      <circle cx="46" cy="36" r="4" fill="#070B14" />
    </svg>
  )
}
