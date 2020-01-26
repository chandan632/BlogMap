const router = require("express").Router()
const Blog = require("./../model/Blog")

router.post("/category", async (req, res) => {
    try {
        const blogs = await Blog.find()
        if (!blogs) {
            return res.status(400).send({ error: "bad request" })
        }
        let computer = []
        let programming = []
        let fashion = []
        let technology = []
        let movie = []
        let story = []
        let books = []
        let electronics = []
        blogs.forEach(blog => {
            if (blog.category == "Computer" && blog.visibility == "public") {
                computer.push(blog.title)
            }
            else if (blog.category == "Programming" && blog.visibility == "public") {
                programming.push(blog.title)
            }
            else if (blog.category == "Fashion" && blog.visibility == "public") {
                fashion.push(blog.title)
            }
            else if (blog.category == "Technology" && blog.visibility == "public") {
                technology.push(blog.title)
            }
            else if (blog.category == "Movie" && blog.visibility == "public") {
                movie.push(blog.title)
            }
            else if (blog.category == "Story" && blog.visibility == "public") {
                story.push(blog.title)
            }
            else if (blog.category == "Books" && blog.visibility == "public") {
                books.push(blog.title)
            }
            else if (blog.category == "Electronics" && blog.visibility == "public") {
                electronics.push(blog.title)
            }
        })
        res.send({ computer, programming, fashion, technology, movie, story, books, electronics })
    } catch (err) {
        res.status(400).send({ error: err })
    }
})

module.exports = router