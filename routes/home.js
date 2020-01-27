const router = require("express").Router()
const Blog = require("./../model/Blog")

router.post('/home', async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.send({ blogs })
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

module.exports = router