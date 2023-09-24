import React, { useState } from 'react'

export default function OpenExpiryForm({ addItem, openingResponse, hideForm }) {

  const [useWithinNum, setUseWithinNum] = useState('')
  const [timeDropdown, setTimeDropdown] = useState('days')


  function calculateOpenExpiry() {
    const currentDate = new Date()
    const openExpiry = new Date()

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

    const openExpiry = calculateOpenExpiry()
    addItem(openingResponse.item, openingResponse.expiryDate, openExpiry)
    hideForm()

    setUseWithinNum("")
  }

  return (
    <>
      <h2>Opening {openingResponse.item}</h2>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
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
        </div>
        <button className="btn">Add</button>
      </form>
    </>
  )
}
