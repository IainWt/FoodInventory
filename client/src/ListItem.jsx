export function ListItem({ _id, item, expiryDate, removeFood }) {
  return (
    <tr>
      {console.log("listitem id:", _id)}
      {console.log("listitem item:", item)}
      <td>
        <button onClick={() => removeFood(item)} className="btn btn-danger">Delete</button>
      </td>
      {/* <input type="checkbox" onChange={e => toggleTodo(_id, e.target.checked)} /> */}
      <td>{item}</td>
      <td>{Date.now()}</td>
    </tr>
  //   <li>
  //   {console.log("listitem id:", _id)}
  //   {console.log("listitem item:", item)}
  //   <button onClick={() => removeFood(item)} className="btn btn-danger">Delete</button>
  //   {/* <input type="checkbox" onChange={e => toggleTodo(_id, e.target.checked)} /> */}
  //   {item}
  //   <p>{Date.now()}</p>
  // </li>
  )
  
}