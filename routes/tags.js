const router = require("express").Router()
const Blog = require("./../model/Blog")

router.post("/tags", async (req, res) => {
    try {
        const blogs = await Blog.find()
        let tags = []
        blogs.forEach(blog => {
            if (blog.tags.includes(",")) {
                blog.tags.split(",").forEach(tag => {
                    tag = tag.trim()
                    if (tag[0] != "#") {
                        tag = "#" + tag
                    }
                    tags.push(tag)
                })
            } else {
                let tagmap = blog.tags.trim()
                if (tagmap[0] != "#") {
                    tagmap = "#" + tagmap
                }
                tags.push(tagmap)
            }
        })
        res.send({ tags })
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

module.exports = router