export function ListItem({ _id, item, expiryDate, removeFood }) {
  const dateOptions = {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'}
  return (
    <tr>
      {console.log(expiryDate)}
      <td>
        <button onClick={() => removeFood(item)} className="btn btn-danger">Delete</button>
      </td>
      {/* <input type="checkbox" onChange={e => toggleTodo(_id, e.target.checked)} /> */}
      <td>{item}</td>
      <td>{new Date(expiryDate).toLocaleDateString(undefined, dateOptions)}</td>
      
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