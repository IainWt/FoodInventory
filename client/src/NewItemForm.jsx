import { useState } from "react"

export function NewItemForm({ open, addItem }) {

  const [newItem, setNewItem] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [useWithinNum, setUseWithinNum] = useState('')
  const [timeDropdown, setTimeDropdown] = useState('days')


  function calculateOpenExpiry() {
    const currentDate = new Date()
    const openExpiry = new Date()
    const dateOptions = {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'}

    if (timeDropdown === 'days') {
      openExpiry.setDate(currentDate.getDate() + parseInt(useWithinNum))
    } else if (timeDropdown === 'months') {
      openExpiry.setMonth(currentDate.getMonth() + parseInt(useWithinNum))
    } else {
      console.error("Only days and months should be available!")
    }

    return openExpiry
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === '') return

    if (open) {
      const openExpiry = calculateOpenExpiry()
      addItem(newItem, expiryDate, openExpiry)
    } else {
      addItem(newItem, expiryDate)
    }

    setNewItem("")
    setExpiryDate("")
    setUseWithinNum("")
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
                value={useWithinNum}
                onChange={e => setUseWithinNum(e.target.value)}
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