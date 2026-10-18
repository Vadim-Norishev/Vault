import styles from './Card.module.css'

const STATUS_LABEL = { want: 'Хочу', progress: 'В процессе', done: 'Готово' }
const STATUS_CLS   = { want: 'want', progress: 'progress', done: 'done' }

function Stars({ rating }) {
  if (!rating) return null
  return (
    <div className={styles.stars}>
      {[1,2,3,4,5].map(n => (
        <span key={n} className={n <= rating ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
    </div>
  )
}

// Generate a deterministic muted background color from the title
function coverColor(title) {
  const palettes = [
    ['#d4c5b0','#8b7355'],
    ['#c5d4c5','#556b55'],
    ['#c5c5d4','#555578'],
    ['#d4c5c5','#6b4545'],
    ['#d4d0c5','#6b6245'],
    ['#c5d0d4','#455a6b'],
  ]
  let hash = 0
  for (let i = 0; i < title.length; i++) hash = title.charCodeAt(i) + ((hash << 5) - hash)
  return palettes[Math.abs(hash) % palettes.length]
}

export default function Card({ item, onClick }) {
  const [bg, fg] = coverColor(item.title)
  const isFilm = item.type === 'film'

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cover} style={{ background: bg }}>
        <div className={styles.coverInner}>
          {isFilm ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="1.2" strokeLinecap="round">
              <rect x="2" y="2" width="20" height="20" rx="2.5"/>
              <path d="M7 2v20M17 2v20M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5"/>
            </svg>
          ) : (
            <svg width="24" height="28" viewBox="0 0 24 32" fill="none">
              <rect x="0" y="0" width="24" height="32" rx="2" fill={fg} opacity="0.2"/>
              <rect x="3" y="6" width="14" height="1.5" rx="0.75" fill={fg} opacity="0.6"/>
              <rect x="3" y="10" width="18" height="1.5" rx="0.75" fill={fg} opacity="0.4"/>
              <rect x="3" y="14" width="16" height="1.5" rx="0.75" fill={fg} opacity="0.4"/>
              <rect x="3" y="18" width="12" height="1.5" rx="0.75" fill={fg} opacity="0.3"/>
            </svg>
          )}
          <span className={styles.coverTitle} style={{ color: fg }}>{item.title}</span>
        </div>
        <span className={`${styles.status} ${styles[STATUS_CLS[item.status]]}`}>
          {STATUS_LABEL[item.status]}
        </span>
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.sub}>{item.author || item.director || <span className={styles.noSub}>—</span>}</p>
        <div className={styles.meta}>
          {item.year && <span className={styles.year}>{item.year}</span>}
          <Stars rating={item.rating} />
        </div>
      </div>
    </div>
  )
}
