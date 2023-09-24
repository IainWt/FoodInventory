import { ListItem } from "./ListItem"

export function FoodList({open, items, removeFood }) {
  return (
    <table className="food-table">
      {items.length === 0 && "No Items"}
      <thead>
        <tr>
          <th></th>
          <th>Food</th>
          <th>Expires</th>
        </tr>
      </thead>
      <tbody>
      {items.map(item => {
        return (
          <ListItem {...item} key={item._id} open={open} removeFood={removeFood} />
          )
        })}
      </tbody>
    </table>
  )
  
}