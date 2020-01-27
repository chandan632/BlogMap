const router = require("express").Router()
const Blog = require("./../model/Blog")

router.post("/search", async (req, res) => {
    try {
        let blogs = await Blog.find()
        blogs = blogs.filter(blog => blog.visibility === "public")
        res.send({ blogs })
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

router.post("/searchtitle/:text", async (req, res) => {
    try {
        const text = req.params.text.toLowerCase()
        const blogs = await Blog.find()
        console.log(blogs)
        const title = []
        blogs.forEach(blog => {
            blogTitle = blog.title.toLowerCase()
            if (blogTitle.includes(text)) {
                title.push(blog.title)
            }
        })
        res.send({ title })
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

module.exports = router