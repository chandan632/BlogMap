const express = require("express")
const path = require("path")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")

const signup = require("./routes/signup")
const login = require("./routes/login")
const requireToken = require("./middlewares/requireToken")
const addblog = require("./routes/addblog")
const home = require("./routes/home")
const findblog = require("./routes/findblog")
const changedpassword = require("./routes/changedpassword")
const deleteblog = require("./routes/deleteblog")
const blogdetails = require("./routes/blogdetails")
const updateblog = require("./routes/updateblog")
const tags = require("./routes/tags")
const category = require("./routes/category")

const app = express()

dotenv.config()
const port = process.env.PORT || 5002

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log("connected to db")
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
// app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use(signup)
app.use(login)
app.use(addblog)
app.use(home)
app.use(findblog)
app.use(changedpassword)
app.use(deleteblog)
app.use(blogdetails)
app.use(updateblog)
app.use(tags)
app.use(category)

app.get("/", requireToken, (req, res) => {
    console.log(req.user)
    res.json(req.user)
})



app.listen(port, () => {
    console.log(`server running on ${port}`)
})