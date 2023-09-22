export function ListItem({ _id, item, expiryDate, toggleTodo, deleteTodo }) {
  return (
    <li>
      {console.log("listitem id:", _id)}
      {console.log("listitem item:", item)}
      <label>
        <input type="checkbox" onChange={e => toggleTodo(_id, e.target.checked)} />
        {item}
      </label>
      <button onClick={() => deleteTodo(_id)} className="btn btn-danger">Delete</button>
    </li>
  )
  
}