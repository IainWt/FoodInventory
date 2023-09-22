export function ListItem({ _id, item, expiryDate, removeFood }) {
  return (
    <li>
      {console.log("listitem id:", _id)}
      {console.log("listitem item:", item)}
      <button onClick={() => removeFood(item)} className="btn btn-danger">Delete</button>
      {/* <input type="checkbox" onChange={e => toggleTodo(_id, e.target.checked)} /> */}
      {item}
    </li>
  )
  
}