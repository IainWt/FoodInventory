const mongoose = require("mongoose")

const foodSchema = new mongoose.Schema({
  item: {type: String, required: true},
  expiryDate: {type: Date, required: true},
  open: {type: Boolean, default: false},
  openExpiry: Date
})

module.exports = mongoose.model("Food", foodSchema)