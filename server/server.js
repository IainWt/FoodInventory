const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors)
app.use(express.json)

mongoose.connect("mongodb://localhost/")

app.get("/api", (req, res) => {
  res.json({"users": ["user1", "user2", "user3"]})
})

app.listen(5000, () => { console.log("Server started on port 5000") })