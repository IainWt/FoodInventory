import { ListItem } from "./ListItem"

export function FoodList({ todos, toggleTodo, deleteTodo }) {
  console.log("foodlist todos:", todos)
  return (
    <ul className="list">
      {/* {todos.length === 0 && "No Todos"} */}
      {todos.map(todo => {
        return (
          <ListItem {...todo} key={todo._id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        )
      })}
    </ul>
  )
  
}