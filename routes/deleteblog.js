const router = require("express").Router()
const Blog = require("./../model/Blog")

router.post("/deleteblog/:id", async (req, res) => {
    try {
        const _id = req.params.id
        const deletedBlog = await Blog.findOneAndDelete({ _id })
        if (!deletedBlog) {
            return res.status(400).send({ error: "blog not found" })
        }
        res.send({ status: "ok" })
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

module.exports = router