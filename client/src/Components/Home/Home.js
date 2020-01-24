import React from 'react';
import Navbar from './../Navbar/Navbar';
import './home.css'
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import moment from 'moment';

class Home extends React.Component {
    state = {
        blogpost: []
    }
    componentDidMount() {
        fetch("http://127.0.0.1:5002/home", {
            method: "post",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    blogpost: [...res]
                })
                console.log(this.state.blogpost)
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <Navbar />
                <Container fluid={true}>
                    <Row className="justify-content-around">
                        <Col className="tags" xs={2}>
                            <h3 className="text-center">Tags</h3>
                            <Button className="rounded rounded-pill m-1 px-3 text-center" variant="danger">#java</Button>
                            <Button className="rounded rounded-pill m-1 px-3 text-center" variant="success">#python</Button>
                            <Button className="rounded rounded-pill m-1 px-3 text-center" variant="primary">#javascript</Button>
                            <Button className="rounded rounded-pill m-1 px-3 text-center" variant="secondary">#c</Button>
                        </Col>
                        <Col>
                            <h2 className="text-center">Excel your skills</h2>
                            <hr className="w-50" />
                            {
                                this.state.blogpost.map((blog, index) => {
                                    return <div key={blog.title} className="float-left ">
                                        <Card className="mx-2">
                                            <Card.Header>
                                                <span>{blog.title}</span>
                                                <span className="float-right">{blog.visibility}</span>
                                            </Card.Header>
                                            <Card.Body>
                                                <h4>Category: <span className="fontsize">{blog.category}</span></h4>
                                            </Card.Body>
                                            <Card.Footer>{moment(blog.createdAt).format('YYYY-MM-DD')}</Card.Footer>
                                        </Card>
                                    </div>
                                })
                            }
                        </Col>
                        <Col className="category" xs={2}>
                            <h3 className="text-center">Category</h3>
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}



export default Home;