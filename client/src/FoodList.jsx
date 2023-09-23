import { ListItem } from "./ListItem"

export function FoodList({ items, removeFood }) {
  console.log("foodlist foods:", items)
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
          <ListItem {...item} key={item._id} removeFood={removeFood} />
          )
        })}
      </tbody>
    </table>
    // <ul className="list">
    //   {items.length === 0 && "No Items"}
    //   {items.map(item => {
    //     return (
    //       <ListItem {...item} key={item._id} removeFood={removeFood} />
    //     )
    //   })}
    // </ul>
  )
  
}