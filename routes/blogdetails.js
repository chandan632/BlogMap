const router = require("express").Router()
const Blog = require("./../model/Blog")

router.post("/blogdetails/:id", async (req, res) => {
    try {
        const id = req.params.id
        const blogDetails = await Blog.findOne({ _id: id })
        if (!blogDetails) {
            res.status(400).send({ error: "no blog found" })
        }
        res.send(blogDetails)
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

module.exports = router