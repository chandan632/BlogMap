const router = require('express').Router()
const requireToken = require('./../middlewares/requireToken')
const Blog = require('./../model/Blog')

router.post('/addblog', requireToken, async (req, res) => {
    try {
        const title = req.body.title
        const category = req.body.category
        const visibility = req.body.visibility
        const content = req.body.content
        const tags = req.body.tags
        const blog = new Blog({
            title,
            category,
            visibility,
            content,
            tags,
            author: req.user._id,
            name: req.user.name
        })
        const savedBlog = await blog.save()
        res.send(savedBlog)
    } catch (err) {
        res.status(400).send({ error: err })
    }
})


module.exports = router