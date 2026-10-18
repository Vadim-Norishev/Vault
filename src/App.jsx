import { useState } from 'react'
import { useStorage } from './hooks/useStorage'
import Header from './components/Header'
import Shelf from './components/Shelf'
import AddModal from './components/AddModal'
import DetailModal from './components/DetailModal'
import Stats from './components/Stats'
import styles from './App.module.css'

export default function App() {
  const [items, setItems] = useStorage('vault_items', [])
  const [filter, setFilter] = useState('all')      // all | book | film
  const [status, setStatus] = useState('all')      // all | want | progress | done
  const [sort, setSort]     = useState('added')    // added | title | rating | year
  const [addOpen, setAddOpen]       = useState(false)
  const [editItem, setEditItem]     = useState(null)
  const [detailItem, setDetailItem] = useState(null)
  const [search, setSearch] = useState('')

  const addItem = (item) => {
    setItems(prev => [{ ...item, id: Date.now(), addedAt: new Date().toISOString() }, ...prev])
    setAddOpen(false)
  }

  const updateItem = (updated) => {
    setItems(prev => prev.map(i => i.id === updated.id ? updated : i))
    setEditItem(null)
    setDetailItem(updated)
  }

  const deleteItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
    setDetailItem(null)
  }

  const openEdit = (item) => {
    setDetailItem(null)
    setEditItem(item)
  }

  const filtered = items
    .filter(i => filter === 'all' || i.type === filter)
    .filter(i => status === 'all' || i.status === status)
    .filter(i => !search || i.title.toLowerCase().includes(search.toLowerCase()) || (i.author || i.director || '').toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'title')  return a.title.localeCompare(b.title)
      if (sort === 'rating') return (b.rating || 0) - (a.rating || 0)
      if (sort === 'year')   return (b.year || 0) - (a.year || 0)
      return new Date(b.addedAt) - new Date(a.addedAt)
    })

  return (
    <div className={styles.app}>
      <Header
        onAdd={() => setAddOpen(true)}
        filter={filter} setFilter={setFilter}
        status={status} setStatus={setStatus}
        sort={sort}     setSort={setSort}
        search={search} setSearch={setSearch}
        total={items.length}
      />

      <main className={styles.main}>
        <Stats items={items} />
        <Shelf
          items={filtered}
          onOpen={setDetailItem}
          onAdd={() => setAddOpen(true)}
          filter={filter}
        />
      </main>

      {addOpen && (
        <AddModal onClose={() => setAddOpen(false)} onSave={addItem} />
      )}
      {editItem && (
        <AddModal item={editItem} onClose={() => setEditItem(null)} onSave={updateItem} />
      )}
      {detailItem && (
        <DetailModal
          item={detailItem}
          onClose={() => setDetailItem(null)}
          onEdit={openEdit}
          onDelete={deleteItem}
          onStatusChange={(id, s) => {
            const updated = { ...detailItem, status: s }
            setItems(prev => prev.map(i => i.id === id ? updated : i))
            setDetailItem(updated)
          }}
        />
      )}
    </div>
  )
}
