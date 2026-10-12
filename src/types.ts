export type TxType = 'income' | 'expense'
/** All money values are integer cents. */
export interface Tx { id: string; title: string; type: TxType; cat: string; amt: number; date: string; acct: string; note: string }
export interface Budget { id: string; cat: string; lim: number }
export interface Contribution { amt: number; date: string }
export interface Goal { id: string; name: string; target: number; date: string; c: Contribution[] }
export interface User { name: string; email: string }
export type Theme = 'dark' | 'light' | 'system'
