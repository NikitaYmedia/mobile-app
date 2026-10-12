import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { CAT } from '../lib/categories'

export default function DonutChart({ data, total }: { data: { name: string; value: number }[]; total: string }) {
  const sum = data.reduce((a, d) => a + d.value, 0)
  if (!sum) return <p className="py-6 text-center text-muted">No spending in this period.</p>
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-36 w-36 shrink-0" role="img" aria-label={`Spending by category, total ${total}`}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={48} outerRadius={68} paddingAngle={2} stroke="none" animationDuration={350}>
              {data.map((d) => <Cell key={d.name} fill={(CAT[d.name] ?? CAT.Other).color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center text-sm font-bold">{total}</div>
      </div>
      <ul className="grid flex-1 grid-cols-1 gap-1.5 text-sm sm:grid-cols-2">
        {data.map((d) => (
          <li key={d.name}><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full" style={{ background: (CAT[d.name] ?? CAT.Other).color }} />{d.name} {Math.round((d.value / sum) * 100)}%</li>
        ))}
      </ul>
    </div>
  )
}
