import { ListItem } from "./ListItem"

export function FoodList({ items, removeFood }) {
  console.log("foodlist foods:", items)
  return (
    <ul className="list">
      {items.length === 0 && "No Items"}
      {items.map(item => {
        return (
          <ListItem {...item} key={item._id} removeFood={removeFood} />
        )
      })}
    </ul>
  )
  
}