require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Food = require("./models/Food")

const app = express()
app.use(cors())
app.use(express.json())

const foodRouter = require("./routes/food")
app.use("/food", foodRouter)

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Connected to database"))

 
// FOR FRONTEND
async function addFood(foodData) {
  const newFood = Food.create({foodData})
  console.log(newFood)
}

async function openFood(foodData) {
  foodData.open = true

}

app.get("/api", (req, res) => {
  res.json({"users": ["user1", "user2", "user3"]})
})

app.listen(5000, () => { console.log("Server started on port 5000") })