import styles from './Stats.module.css'

export default function Stats({ items }) {
  const books = items.filter(i => i.type === 'book')
  const films = items.filter(i => i.type === 'film')
  const done  = items.filter(i => i.status === 'done')
  const rated = items.filter(i => i.rating)
  const avgRating = rated.length
    ? (rated.reduce((s, i) => s + i.rating, 0) / rated.length).toFixed(1)
    : '—'

  const tiles = [
    { num: books.length, label: 'книг' },
    { num: films.length, label: 'фильмов' },
    { num: done.length,  label: 'прочитано / просмотрено' },
    { num: avgRating,    label: 'средняя оценка' },
  ]

  if (!items.length) return null

  return (
    <div className={styles.row}>
      {tiles.map(t => (
        <div key={t.label} className={styles.tile}>
          <span className={styles.num}>{t.num}</span>
          <span className={styles.label}>{t.label}</span>
        </div>
      ))}
    </div>
  )
}
