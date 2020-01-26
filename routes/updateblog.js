const router = require("express").Router()
const Blog = require("./../model/Blog")

router.post("/updateblog", async (req, res) => {
    try {
        const title = req.body.title
        const category = req.body.category
        const visibility = req.body.visibility
        const content = req.body.content
        const tags = req.body.tags
        const id = req.body.id
        const createdAt = Date.now()
        const updateblog = await Blog.findOneAndUpdate({ _id: id }, { title, category, visibility, content, tags, createdAt })
        if (!updateblog) {
            res.send({ error: "no blog found" })
        }
        res.send({ status: "ok" })
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

module.exports = router