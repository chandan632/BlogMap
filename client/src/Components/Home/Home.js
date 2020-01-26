import React from 'react';
import Navbar from './../Navbar/Navbar';
import './home.css'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Tags from './../Tags/Tags';
import Category from './../Category/Category';

class Home extends React.Component {
    state = {
        blogpost: []
    }
    componentDidMount() {
        const storedBlogs = localStorage.getItem("blogpost")
        if (!storedBlogs) {
            fetch("http://127.0.0.1:5002/home", {
                method: "post",
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        blogpost: res.filter(blog => blog.visibility === "public")
                    })
                    localStorage.setItem("blogpost", JSON.stringify(this.state.blogpost))
                })
                .catch(err => console.log(err))
        }
        else {
            this.setState({
                blogpost: JSON.parse(storedBlogs)
            })
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <Container fluid={true} className="homebg">
                    <Row className="justify-content-around">
                        <Col className="tags" xs={2}>
                            <Tags />
                        </Col>
                        <Col>
                            <h2 className="text-center text-light">Excel your skills</h2>
                            <hr className="w-50" />
                            {
                                this.state.blogpost.map((blog, index) => {
                                    return <div key={blog.title} className="float-left ">
                                        <Link to={{ pathname: '/blog', data: blog }} className="hovereffect">
                                            <Card className="mx-lg-4 mb-3 text-dark">
                                                <Card.Header>
                                                    <span>{blog.title}</span>
                                                </Card.Header>
                                                <Card.Body>
                                                    <h4>Category: <span className="fontsize">{blog.category}</span></h4>
                                                </Card.Body>
                                                <Card.Footer><small>CreatedBy: {blog.name}</small><br /><small>CreatedAt: {moment(blog.createdAt).format('YYYY-MM-DD')}</small></Card.Footer>
                                            </Card>
                                        </Link>
                                    </div>
                                })
                            }
                        </Col>
                        <Col className="category" xs={2}>
                            <h3 className="text-center">Category</h3>
                            <Category />
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}



export default Home;