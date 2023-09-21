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
// Add new opened
// Delete one unopened
// Delete one unopened




// Change items???

module.exports = router