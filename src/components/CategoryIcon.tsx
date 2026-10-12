import { CAT } from '../lib/categories'

export default function CategoryIcon({ cat, size = 40 }: { cat: string; size?: number }) {
  const { icon: Icon, color } = CAT[cat] ?? CAT.Other
  return (
    <span className="grid place-items-center rounded-full shrink-0" style={{ width: size, height: size, background: color + '26', color }}>
      <Icon size={size * 0.5} aria-hidden />
    </span>
  )
}
