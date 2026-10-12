/** Colors are CSS variables (see src/index.css) so dark/light themes share one set of classes. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)', surface: 'var(--surface)', surface2: 'var(--surface2)', input: 'var(--input)',
        line: 'var(--border)', ink: 'var(--text)', muted: 'var(--muted)',
        mint: 'var(--mint)', neg: 'var(--neg)', warn: 'var(--warn)'
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
    }
  }
}
