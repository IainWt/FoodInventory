const express = require("express")
const router = express.Router()
const Food = require("../models/Food")

// Get all unopened
router.get("/unopened", async (req, res) => {
  try {
    const foods = await Food.find({ open: false })
    res.json(foods)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get all opened
// Add new unopened
router.post("/unopened", async (req, res) => {
  const food = new Food({
    item: req.body.item,
    expiryDate: Date.now() // TODO change to given date
  })
  try {
    const newFood = await food.save()
    res.status(201).json(newFood)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Add new opened
// Delete one unopened
router.delete("/unopened/:item", async (req, res) => {
  try {
    const response = await Food.deleteOne({ item: req.params.item })
    if (response.deletedCount === 0) {
      res.json({ message: `No ${req.params.item} to remove` })
    } else {
      res.json({ message: `${req.params.item} removed` })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete one opened




// Change items???

module.exports = router