export function ListItem({ _id, item, expiryDate, openExpiry, open, removeFood }) {
  const dateOptions = {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'}
  // Show the closest expiry date
  if (open && openExpiry < expiryDate) expiryDate = openExpiry
  return (
    <tr>
      <td>
        <button onClick={() => removeFood(_id)} className="btn btn-danger">{open ? "Finished" : "Open"}</button>
      </td>
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