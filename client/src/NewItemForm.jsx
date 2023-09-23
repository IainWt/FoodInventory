import { useState } from "react"

export function NewItemForm({ addItem }) {

  const [newItem, setNewItem] = useState('')
  const [expiryDate, setExpiryDate] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === '') return

    addItem(newItem, expiryDate)

    setNewItem("")
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input 
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)} 
          type="text" 
          id="item"
        />
        <label htmlFor="expiryDate">Expiry Date</label>
        <input 
          type="date" 
          id="expiryDate" 
          value={expiryDate}
          onChange={e => setExpiryDate(e.target.value)}
        />
      </div>
      <button className="btn">Add</button>
    </form>
  )
}