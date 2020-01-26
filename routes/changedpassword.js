const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("./../model/Users")

router.post("/changedpassword", async (req, res) => {
    try {
        const password = req.body.password
        const email = req.body.email

        const salt = await bcrypt.genSalt(10)
        const HashedPass = await bcrypt.hash(password, salt)
        const updatedUser = await User.findOneAndUpdate({ email }, { password: HashedPass })
        if (updatedUser) {
            return res.send({ status: "ok" })
        }
        res.send({ error: "something went wrong" })
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

module.exports = router