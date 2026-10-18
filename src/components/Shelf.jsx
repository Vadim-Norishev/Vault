import Card from './Card'
import styles from './Shelf.module.css'

export default function Shelf({ items, onOpen, onAdd, filter }) {
  if (!items.length) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>Здесь пока пусто</p>
        <p className={styles.emptyText}>
          {filter === 'book' ? 'Добавь первую книгу' :
           filter === 'film' ? 'Добавь первый фильм' :
           'Добавь книгу или фильм'}
        </p>
        <button className={styles.emptyBtn} onClick={onAdd}>+ Добавить</button>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {items.map(item => (
        <Card key={item.id} item={item} onClick={() => onOpen(item)} />
      ))}
    </div>
  )
}
