const router = require("express").Router()
const Blog = require("./../model/Blog")

router.post("/findblog/:id", async (req, res) => {
    try {
        const id = req.params.id
        const blogs = await Blog.find({ author: id })
        res.send(blogs)
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

module.exports = router