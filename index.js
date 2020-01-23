const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")

const User = require("./model/Users")
const signup = require("./routes/signup")
const login = require("./routes/login")
const requireToken = require("./middlewares/requireToken")

const app = express()

dotenv.config()
const port = process.env.PORT || 5002

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to db")
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
// app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use(signup)
app.use(login)

app.get("/", requireToken, (req, res) => {
    console.log(req.user)
    res.json(req.user)
})



app.listen(port, () => {
    console.log(`server running on ${port}`)
})