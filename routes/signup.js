const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require('./../model/Users')

router.post('/signup', async (req, res) => {
    try {
        // Check user exists or not
        const name = req.body.firstname + " " + req.body.lastname
        const email = req.body.email
        const phnumber = req.body.phnumber
        const password = req.body.password
        const userExists = await User.findOne({ email })
        if (userExists) return res.send("User already exists")

        // Hashed Password
        const salt = await bcrypt.genSalt(10)
        const HashedPass = await bcrypt.hash(password, salt)

        // Save new user into database
        const user = new User({ name, email, phnumber, password: HashedPass })
        const savedUser = await user.save()
        console.log(savedUser)
        return res.send(savedUser)
    }
    catch (err) {
        return res.status(400).send(err)
    }
})

module.exports = router