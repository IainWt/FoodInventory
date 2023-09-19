import React from 'react'
import { NewItemForm } from "./NewItemForm"
import { FoodList } from "./FoodList"

export function FormAndList({ addTodo, todos, toggleTodo, deleteTodo }) {
  return (
    <>
      <NewItemForm addTodo={addTodo} />
      <h1 className="header">Todo List</h1>
      <FoodList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}
