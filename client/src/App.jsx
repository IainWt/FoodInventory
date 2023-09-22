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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5000/food/unopened").then(
      response => response.json()
    )
    .then(
      data => {
        setUnopened(data)
        setLoading(false)
      }
    )
    .catch(
      err => {
        console.log(err)
        setLoading(false)
      }
    )
  }, [])

  // useEffect(() => {
  //   localStorage.setItem("ITEMS", JSON.stringify(todos))
  // }, [todos])

  function addUnopenedFood(item) {
    fetch("http://localhost:5000/food/unopened", {
      method: 'POST',
      body: JSON.stringify({
        item,
        expiryDate: Date.now(),
        open: false
      }),
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    })
    .then(response => response.json())
    .then(data => setUnopened(currentUnopened => [...currentUnopened, data]))
  }

  function removeUnopenedFood(item) {
    fetch(`http://localhost:5000/food/unopened/${item}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        setUnopened(currentUnopened => {
          return currentUnopened.filter(item => item._id != response._id)
        })
      })
      .catch(err => console.log(err))
  }

  // function addTodo(title) {
  //   setTodos(currentTodos => {
  //     return [
  //       ...currentTodos,
  //       { id: crypto.randomUUID(), title, completed: false },
  //     ]
  //   })
  // }

  // function toggleTodo(id, completed) {
  //   setTodos(currentTodos => {
  //     return currentTodos.map(todo => {
  //       if (todo.id === id) {
  //         return { ...todo, completed }
  //       }

  //       return todo
  //     })
  //   })
  // }



  // function deleteTodo(id) {
  //   setTodos(currentTodos => {
  //     return currentTodos.filter(todo => todo.id !== id)
  //   })
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {console.log("app todos", unopened)}
      <FormAndList addItem={addUnopenedFood} items={unopened} removeFood={removeUnopenedFood} />
      {/* <FormAndList addTodo={addTodo} todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} /> */}
    </>
  )
}