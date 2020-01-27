const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./../model/Users")

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        let userExists = await User.findOne({ email })
        if (!userExists) return res.send({ error: "User does't exists" })

        const checkPass = await bcrypt.compare(password, userExists.password)
        if (checkPass) {
            const token = jwt.sign({ UserID: userExists._id, name: userExists.name, email, phnumber: userExists.phnumber }, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
            const user = {
                UserID: userExists._id,
                name: userExists.name,
                email: userExists.email,
                phnumber: userExists.phnumber
            }
            return res.send({ token, userExists: user })
        }
        else
            return res.send({ error: "User not found" })

    } catch (err) {
        return res.status(400).send({ error: err })
    }
})

module.exports = router