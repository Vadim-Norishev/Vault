import { useState } from 'react'
import styles from './Modal.module.css'

const STATUSES = [
  { val: 'want',     label: 'Хочу' },
  { val: 'progress', label: 'Читаю / Смотрю' },
  { val: 'done',     label: 'Готово' },
]

const GENRES_BOOK = ['Роман','Нон-фикшн','Фантастика','Детектив','Биография','Философия','Поэзия','История','Другое']
const GENRES_FILM = ['Драма','Комедия','Триллер','Фантастика','Хоррор','Документальный','Аниме','Другое']

export default function AddModal({ item, onClose, onSave }) {
  const editing = !!item
  const [type,    setType]    = useState(item?.type    || 'book')
  const [title,   setTitle]   = useState(item?.title   || '')
  const [creator, setCreator] = useState(item?.author || item?.director || '')
  const [year,    setYear]    = useState(item?.year    || '')
  const [genre,   setGenre]   = useState(item?.genre   || '')
  const [status,  setStatus]  = useState(item?.status  || 'want')
  const [rating,  setRating]  = useState(item?.rating  || 0)
  const [notes,   setNotes]   = useState(item?.notes   || '')
  const [hovered, setHovered] = useState(0)

  const genres = type === 'book' ? GENRES_BOOK : GENRES_FILM

  const handleSave = () => {
    if (!title.trim()) return
    const base = {
      ...(editing ? item : {}),
      type, title: title.trim(), year: year ? +year : null,
      genre, status, rating, notes: notes.trim(),
    }
    if (type === 'book') base.author   = creator.trim()
    else                 base.director = creator.trim()
    onSave(base)
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {editing ? 'Редактировать' : 'Добавить'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          {/* Type toggle */}
          {!editing && (
            <div className={styles.typeToggle}>
              <button
                className={`${styles.typeBtn} ${type === 'book' ? styles.typeBtnActive : ''}`}
                onClick={() => setType('book')}
              >Книга</button>
              <button
                className={`${styles.typeBtn} ${type === 'film' ? styles.typeBtnActive : ''}`}
                onClick={() => setType('film')}
              >Фильм</button>
            </div>
          )}

          <div className={styles.field}>
            <label className={styles.label}>Название *</label>
            <input
              className={styles.input}
              placeholder={type === 'book' ? 'Название книги' : 'Название фильма'}
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>{type === 'book' ? 'Автор' : 'Режиссёр'}</label>
              <input
                className={styles.input}
                placeholder={type === 'book' ? 'Имя автора' : 'Имя режиссёра'}
                value={creator}
                onChange={e => setCreator(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Год</label>
              <input
                className={styles.input}
                type="number"
                placeholder="2024"
                min="1800" max="2099"
                value={year}
                onChange={e => setYear(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row2}>
            <div className={styles.field}>
              <label className={styles.label}>Жанр</label>
              <select className={styles.input} value={genre} onChange={e => setGenre(e.target.value)}>
                <option value="">— выбери жанр</option>
                {genres.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Статус</label>
              <select className={styles.input} value={status} onChange={e => setStatus(e.target.value)}>
                {STATUSES.map(s => <option key={s.val} value={s.val}>{s.label}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Оценка</label>
            <div className={styles.starsRow}>
              {[1,2,3,4,5].map(n => (
                <span
                  key={n}
                  className={n <= (hovered || rating) ? styles.starOn : styles.starOff}
                  onMouseEnter={() => setHovered(n)}
                  onMouseLeave={() => setHovered(0)}
                  onClick={() => setRating(rating === n ? 0 : n)}
                >★</span>
              ))}
              {rating > 0 && (
                <button className={styles.clearRating} onClick={() => setRating(0)}>убрать</button>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Заметки</label>
            <textarea
              className={styles.textarea}
              placeholder="Мысли, цитаты, впечатления..."
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>Отмена</button>
          <button className={styles.saveBtn} onClick={handleSave} disabled={!title.trim()}>
            {editing ? 'Сохранить' : 'Добавить'}
          </button>
        </div>
      </div>
    </div>
  )
}
