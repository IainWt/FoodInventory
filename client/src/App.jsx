import { useEffect, useState } from "react"
import "./styles.css"
import { FormAndList } from "./FormAndList"

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  const [unopened, setUnopened] = useState([{}])

  useEffect(() => {
    fetch("http://localhost:5000/food/unopened").then(
      response => response.json()
    )
    .then(
      data => console.log(data)
    )
    .catch(
      err => console.log(err)
    )
  }, [])

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <FormAndList addTodo={addTodo} todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <FormAndList addTodo={addTodo} todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}