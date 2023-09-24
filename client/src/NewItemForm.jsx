import { useState } from "react"

export function NewItemForm({ open, addItem }) {

  const [newItem, setNewItem] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [useWithin, setUseWithin] = useState('')
  const [timeDropdown, setTimeDropdown] = useState('days')

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === '') return

    addItem(newItem, expiryDate, useWithin)

    setNewItem("")
    setExpiryDate("")
    setUseWithin("")
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">

        {/* Input for new item's name */}
        <label htmlFor="item">New Item</label>
        <input 
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)} 
          type="text" 
          id="item"
        />

        {/* Input for new item's expiry date */}
        <label htmlFor="expiryDate">Expiry Date</label>
        <input 
          type="date" 
          id="expiryDate" 
          value={expiryDate}
          onChange={e => setExpiryDate(e.target.value)}
        />

        {/* Input for time before expires once open - only for opened food list */}
        {open ? (
          <>
            <label htmlFor="useWithin">Once opened use within:</label>
            <span>
              <input
                type="number"
                id="useWithin"
                value={useWithin}
                onChange={e => setUseWithin(e.target.value)}
                min="1" />
              
              <select 
                id="dropdown" 
                value={timeDropdown} 
                onChange={e => setTimeDropdown(e.target.value)}
              >
                <option value="days">days</option>
                <option value="months">months</option>
              </select>
            </span>
          </>
        ) : (null)}
      </div>
      <button className="btn">Add</button>
    </form>
  )
}