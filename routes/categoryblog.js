const router = require("express").Router()
const Blog = require("./../model/Blog")

router.post("/categoryblog/:title", async (req, res) => {
    try {
        const title = req.params.title
        const blog = await Blog.findOne({ title })
        if (!blog) {
            res.status(400).send({ error: "no blog found" })
        }
        res.send(blog)
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

module.exports = router