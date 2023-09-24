import { useEffect, useState } from "react"
import "./styles.css"
import { FormAndList } from "./FormAndList"
import OpenExpiryForm from "./OpenExpiryForm"

export default function App() {
  // const [todos, setTodos] = useState(() => {
  //   const localValue = localStorage.getItem("ITEMS")
  //   if (localValue == null) return []

  //   return JSON.parse(localValue)
  // })

  const [unopened, setUnopened] = useState([{}])
  const [opened, setOpened] = useState([{}])
  const [unopenLoading, setUnopenLoading] = useState(true)
  const [openLoading, setOpenLoading] = useState(true)
  const [openingResponse, setOpeningResponse] = useState('')

  useEffect(() => {
    fetch("http://localhost:5000/food/unopened").then(
      response => response.json()
    )
    .then(
      data => {
        setUnopened(data)
        setUnopenLoading(false)
      }
    )
    .catch(
      err => {
        console.log(err)
        setUnopenLoading(false)
      }
    )

    fetch("http://localhost:5000/food/opened").then(
      response => response.json()
    )
    .then(
      data => {
        setOpened(data)
        setOpenLoading(false)
      }
    )
    .catch(
      err => {
        console.log(err)
        setOpenLoading(false)
      }
    )
  }, [])

  // Add an item to unopened list
  function addUnopenedFood(item, expiryDate) {
    fetch("http://localhost:5000/food/unopened", {
      method: 'POST',
      body: JSON.stringify({
        item,
        expiryDate: expiryDate,
        open: false
      }),
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    })
    .then(response => response.json())
    .then(data => setUnopened(currentUnopened => [...currentUnopened, data]))
  }

  // Add an item to opened list
  function addOpenedFood(item, expiryDate, openExpiry) {
    fetch("http://localhost:5000/food/opened", {
      method: 'POST',
      body: JSON.stringify({
        item,
        expiryDate: expiryDate,
        open: true,
        openExpiry: openExpiry
      }),
      headers: {'Content-type': 'application/json; charset=UTF-8'},
    })
    .then(response => response.json())
    .then(data => setOpened(currentOpened => [...currentOpened, data]))
  }

  // Remove an item from unopened list
  function removeUnopenedFood(_id) {
    fetch(`http://localhost:5000/food/unopened/${_id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        setOpeningResponse(response)
        setUnopened(currentUnopened => {
          return currentUnopened.filter(item => item._id != _id)
        })
      })
      .catch(err => console.log(err))
  }

  // Remove an item from opened list
  function removeOpenedFood(_id) {
    fetch(`http://localhost:5000/food/opened/${_id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        setOpened(currentOpened => {
          return currentOpened.filter(item => item._id != _id)
        })
      })
      .catch(err => console.log(err))
  }


  function hideOpenExpiryForm() {
    setOpeningResponse('')
  }

  
  if (unopenLoading || openLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Food Inventory</h1>
      <FormAndList open={true} addItem={addOpenedFood} items={opened} removeFood={removeOpenedFood} />
      {openingResponse !== '' ? 
        <OpenExpiryForm addItem={addOpenedFood} openingResponse={openingResponse} hideForm={hideOpenExpiryForm} /> 
      : null}
      <FormAndList open={false} addItem={addUnopenedFood} items={unopened} removeFood={removeUnopenedFood} />
    </>
  )
}


// TODO:
// SPEECH!!!