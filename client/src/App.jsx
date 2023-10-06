import { useEffect, useState } from "react"
import "./styles.css"
import { FormAndList } from "./FormAndList"
import OpenExpiryForm from "./OpenExpiryForm"
import { Transcriber } from "./Transcriber"

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

  // ### GETTING ALL ITEMS ###

  useEffect(() => {
    fetch("http://localhost:5000/food/unopened").then(
      response => response.json()
    )
    .then(
      data => {
        setUnopened(data.sort(sortByDate))
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
        setOpened(data.sort(sortByOpenDate))
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

  // ### ADDING ITEMS ###

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
    .then(data => setUnopened(currentUnopened => [...currentUnopened, data].sort(sortByDate)))
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
    .then(data => setOpened(currentOpened => [...currentOpened, data].sort(sortByOpenDate)))
  }

  // ### REMOVING ITEMS ###

  // Remove an item from unopened list
  function removeUnopenedFood(_id, addToOpened=true) {
    fetch(`http://localhost:5000/food/unopened/${_id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        if (addToOpened) setOpeningResponse(response)
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

  function openFoodByName(name, openExpiry) {
    const item = unopened.find(element => element.item === name)
    if (typeof item !== 'undefined') {
      removeUnopenedFood(item._id)
      addOpenedFood(item.item, item.expiryDate, openExpiry)
    } else {
      addOpenedFood(name, openExpiry, openExpiry)
    }
  }

  function finishFoodByName(name) {
    const item = opened.find(element => element.item === name)
    if (typeof item !== 'undefined') {
      removeOpenedFood(item._id)
    } else {
      console.log("There are no opened items with the name", name)
    }
  }

  function removeFoodByName(name) {
    const item = unopened.find(element => element.item === name)
    if (typeof item !== 'undefined') {
      removeUnopenedFood(item._id, false)
    } else {
      console.log("There are no unopened items with the name", name)
    }
  }

  // ### SORTING ITEMS ###

  function sortByDate(item1, item2) {
    return new Date(item1.expiryDate).getTime() - new Date(item2.expiryDate).getTime()
  }

  function sortByOpenDate(item1, item2) {
    // Only use expiryDate if openExpiry is null
    const openExpiry1 = item1.openExpiry ? new Date(item1.openExpiry).getTime() : new Date(item1.expiryDate).getTime()
    const openExpiry2 = item2.openExpiry ? new Date(item2.openExpiry).getTime() : new Date(item2.expiryDate).getTime()
    // Get the closest expiry date
    const date1 = Math.min(openExpiry1, new Date(item1.expiryDate).getTime())
    const date2 = Math.min(openExpiry2, new Date(item2.expiryDate).getTime())
    return date1 - date2
  }

  function calculateOpenExpiry(useWithinNum, timePeriod) {
    const currentDate = new Date()
    const openExpiry = new Date()

    if (timePeriod === 'days') {
      openExpiry.setDate(currentDate.getDate() + parseInt(useWithinNum))
    } else if (timePeriod === 'months') {
      openExpiry.setMonth(currentDate.getMonth() + parseInt(useWithinNum))
    } else {
      console.error("Only days and months should be available!")
    }

    return openExpiry
  }


  // ### DISPLAY ###

  function hideOpenExpiryForm() {
    setOpeningResponse('')
  }

  
  if (unopenLoading || openLoading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <h1>Food Inventory</h1>
      <Transcriber addUnopenedFood={addUnopenedFood} removeUnopenedFood={removeUnopenedFood} addOpenedFood={addOpenedFood} calculateOpenExpiry={calculateOpenExpiry} openFoodByName={openFoodByName} finishFoodByName={finishFoodByName} removeFoodByName={removeFoodByName} />
      <FormAndList open={true} addItem={addOpenedFood} items={opened} removeFood={removeOpenedFood} />
      {openingResponse !== '' ? 
        <OpenExpiryForm addItem={addOpenedFood} openingResponse={openingResponse} hideForm={hideOpenExpiryForm} calculateOpenExpiry={calculateOpenExpiry} /> 
      : null}
      <FormAndList open={false} addItem={addUnopenedFood} items={unopened} removeFood={removeUnopenedFood} />
    </>
  )
}


// TODO:
// SPEECH!!!