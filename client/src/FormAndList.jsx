import React from 'react'
import { NewItemForm } from "./NewItemForm"
import { FoodList } from "./FoodList"

export function FormAndList({ addItem, items, removeFood }) {
  return (
    <>
      <NewItemForm addItem={addItem} />
      <h1 className="header">Food List</h1>
      {console.log("form and list foods:", items)}
      <FoodList items={items} removeFood={removeFood} />
    </>
  )
}
