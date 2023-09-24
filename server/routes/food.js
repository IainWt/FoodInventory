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
router.get("/opened", async (req, res) => {
  try {
    const foods = await Food.find({ open: true })
    res.json(foods)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Add new unopened
router.post("/unopened", async (req, res) => {
  const food = new Food({
    item: req.body.item,
    expiryDate: req.body.expiryDate
  })
  try {
    const newFood = await food.save()
    res.status(201).json(newFood)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Add new opened
router.post("/opened", async (req, res) => {
  const food = new Food({
    item: req.body.item,
    expiryDate: req.body.expiryDate,
    open: true,
    openExpiry: req.body.openExpiry
  })
  try {
    const newFood = await food.save()
    res.status(201).json(newFood)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete one unopened
router.delete("/unopened/:_id", async (req, res) => {
  try {
    const itemToDelete = await Food.findOne({ _id: req.params._id, open: false })
    console.log("in unopened delete", req.params._id, itemToDelete)
    if (itemToDelete == null) {
      res.json({ message: `No item to remove` })
    } else {
      await Food.deleteOne({ _id: itemToDelete._id })
      res.json({ message: `Item removed`, item: itemToDelete.item, expiryDate: itemToDelete.expiryDate })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete one opened
router.delete("/opened/:_id", async (req, res) => {
  try {
    const itemToDelete = await Food.findOne({ _id: req.params._id, open: true })
    if (itemToDelete == null) {
      res.json({ message: `No item to remove` })
    } else {
      await Food.deleteOne({ _id: itemToDelete._id })
      res.json({ message: `Item removed`, expiryDate: itemToDelete.expiryDate })
    }
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})



// Change items???

module.exports = router