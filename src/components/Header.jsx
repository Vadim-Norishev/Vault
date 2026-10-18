import styles from './Header.module.css'

const FILTERS = [
  { val: 'all',  label: 'Всё' },
  { val: 'book', label: 'Книги' },
  { val: 'film', label: 'Фильмы' },
]

const STATUSES = [
  { val: 'all',      label: 'Любой статус' },
  { val: 'want',     label: 'Хочу' },
  { val: 'progress', label: 'Читаю / Смотрю' },
  { val: 'done',     label: 'Готово' },
]

const SORTS = [
  { val: 'added',  label: 'Дата добавления' },
  { val: 'title',  label: 'По названию' },
  { val: 'rating', label: 'По оценке' },
  { val: 'year',   label: 'По году' },
]

export default function Header({
  onAdd,
  filter, setFilter,
  status, setStatus,
  sort, setSort,
  search, setSearch,
  total,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>Vault</span>
            <span className={styles.tagline}>твой личный архив</span>
          </div>
          <button className={styles.addBtn} onClick={onAdd}>
            + Добавить
          </button>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchWrap}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className={styles.searchIcon}>
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              className={styles.search}
              placeholder="Поиск..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className={styles.pills}>
            {FILTERS.map(f => (
              <button
                key={f.val}
                className={`${styles.pill} ${filter === f.val ? styles.pillActive : ''}`}
                onClick={() => setFilter(f.val)}
              >{f.label}</button>
            ))}
          </div>

          <div className={styles.selects}>
            <select className={styles.sel} value={status} onChange={e => setStatus(e.target.value)}>
              {STATUSES.map(s => <option key={s.val} value={s.val}>{s.label}</option>)}
            </select>
            <select className={styles.sel} value={sort} onChange={e => setSort(e.target.value)}>
              {SORTS.map(s => <option key={s.val} value={s.val}>{s.label}</option>)}
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}
