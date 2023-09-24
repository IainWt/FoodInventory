import React from 'react'
import { NewItemForm } from "./NewItemForm"
import { FoodList } from "./FoodList"

export function FormAndList({ open, addItem, items, removeFood }) {
  return (
    <>
      <h1 className="header">{open ? "Opened" : "Unopened"} Food</h1>
      <NewItemForm open={open} addItem={addItem} />
      <FoodList open={open} items={items} removeFood={removeFood} />
    </>
  )
}
