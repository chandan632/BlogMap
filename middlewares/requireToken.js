const jwt = require("jsonwebtoken")
const User = require("./../model/Users")

module.exports = (req, res, next) => {
    const { auth_token } = req.headers

    if (!auth_token)
        return res.status(401).send({ error: "You must be logged in!" })

    const token = auth_token.replace("Bearer ", "")

    jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
        if (err)
            return res.status(401).send({ error: "You must be logged in!" })
        const { UserID } = payload
        const user = await User.findById({ _id: UserID })
        req.user = user
        next()
    })
}