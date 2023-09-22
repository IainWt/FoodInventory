import React from 'react'
import { NewItemForm } from "./NewItemForm"
import { FoodList } from "./FoodList"

export function FormAndList({ addItem, todos, toggleTodo, deleteTodo }) {
  return (
    <>
      <NewItemForm addItem={addItem} />
      <h1 className="header">Todo List</h1>
      {console.log("form and list todos:", todos)}
      <FoodList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}
