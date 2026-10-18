import styles from './Modal.module.css'
import dStyles from './DetailModal.module.css'

const STATUS_LABEL = { want: 'Хочу', progress: 'В процессе', done: 'Готово' }
const STATUSES = ['want', 'progress', 'done']

function Stars({ rating }) {
  if (!rating) return <span className={dStyles.noRating}>без оценки</span>
  return (
    <div className={dStyles.stars}>
      {[1,2,3,4,5].map(n => (
        <span key={n} className={n <= rating ? dStyles.starOn : dStyles.starOff}>★</span>
      ))}
    </div>
  )
}

export default function DetailModal({ item, onClose, onEdit, onDelete, onStatusChange }) {
  const creator = item.author || item.director
  const typeLabel = item.type === 'book' ? 'Книга' : 'Фильм'
  const creatorLabel = item.type === 'book' ? 'Автор' : 'Режиссёр'

  const addedDate = new Date(item.addedAt).toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span className={dStyles.typeTag}>{typeLabel}</span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          <h2 className={dStyles.title}>{item.title}</h2>
          {creator && <p className={dStyles.creator}>{creator}</p>}

          <div className={dStyles.meta}>
            {item.year  && <span className={dStyles.metaTag}>{item.year}</span>}
            {item.genre && <span className={dStyles.metaTag}>{item.genre}</span>}
          </div>

          <div className={dStyles.ratingRow}>
            <Stars rating={item.rating} />
          </div>

          {/* Status switcher */}
          <div className={dStyles.statusRow}>
            {STATUSES.map(s => (
              <button
                key={s}
                className={`${dStyles.statusBtn} ${item.status === s ? dStyles.statusBtnActive : ''}`}
                onClick={() => onStatusChange(item.id, s)}
              >
                {STATUS_LABEL[s]}
              </button>
            ))}
          </div>

          {item.notes && (
            <div className={dStyles.notes}>
              <p className={dStyles.notesLabel}>Заметки</p>
              <p className={dStyles.notesText}>{item.notes}</p>
            </div>
          )}

          <p className={dStyles.addedDate}>Добавлено {addedDate}</p>
        </div>

        <div className={styles.footer}>
          <button
            className={dStyles.deleteBtn}
            onClick={() => { if (confirm('Удалить?')) onDelete(item.id) }}
          >Удалить</button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className={styles.cancelBtn} onClick={onClose}>Закрыть</button>
            <button className={styles.saveBtn} onClick={() => onEdit(item)}>Редактировать</button>
          </div>
        </div>
      </div>
    </div>
  )
}
