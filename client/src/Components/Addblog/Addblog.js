import React, { Component } from 'react';
import MyNavbar from './../Navbar/Navbar';
import { Container, Card, Form, Row, Col, Button, Alert } from 'react-bootstrap';

export class Addblog extends Component {
    state = {
        title: '',
        category: '',
        visibility: '',
        content: '',
        tags: '',
        error: false,
        success: false
    }
    titleHandler = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    categoryHandler = (event) => {
        this.setState({
            category: event.target.value
        })
    }
    visibilityHandler = (event) => {
        this.setState({
            visibility: event.target.value
        })
    }
    contentHandler = (event) => {
        this.setState({
            content: event.target.value
        })
    }
    tagsHandler = (event) => {
        this.setState({
            tags: event.target.value
        })
    }
    submitHandler = (event) => {
        event.preventDefault()
        if (this.state.title === '' || this.state.category === '' || this.state.visibility === '' || this.state.content === '' || this.state.tags === '') {
            return this.setState({
                error: true
            })
        }
        const token = localStorage.getItem('auth_token')
        fetch("http://127.0.0.1:5002/addblog", {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'auth_token': token },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return this.setState({
                        error: true
                    })
                }
                this.setState({
                    success: true
                })
            })
            .catch(err => {
                return this.setState({
                    error: true
                })
            })

        this.setState({
            title: '',
            category: '',
            visibility: '',
            content: '',
            tags: ''
        })
    }
    render() {
        if (this.state.error || this.state.success) {
            setTimeout(() => {
                this.setState({
                    error: false,
                    success: false
                })
            }, 2000)
        }
        return (
            <>
                <MyNavbar page="addblog" />
                <Container className="my-3">
                    <Card>
                        <Card.Header className="text-center">Add Your Blog</Card.Header>
                        <Card.Body>
                            <Form onSubmit={this.submitHandler}>
                                <Form.Group>
                                    <Form.Label>Title Of Blog</Form.Label>
                                    <Form.Control type="text" placeholder="Title Of Your Sweet Blog" value={this.state.title} onChange={this.titleHandler} />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control as="select" value={this.state.category} onChange={this.categoryHandler}>
                                                <option value="Computer">Computer</option>
                                                <option value="Programming">Programming</option>
                                                <option value="Fashion">Fashion</option>
                                                <option value="Technology">Technology</option>
                                                <option value="Movie">Movie</option>
                                                <option value="Story">Story</option>
                                                <option value="Books">Books</option>
                                                <option value="Electronics">Electronics</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Visibility</Form.Label>
                                            <Form.Control as="select" value={this.state.visibility} onChange={this.visibilityHandler}>
                                                <option value="public">public</option>
                                                <option value="private">private</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group>
                                    <Form.Label>Write Here ..</Form.Label>
                                    <Form.Control as="textarea" rows="10" placeholder="Your blog content goes here .." value={this.state.content} onChange={this.contentHandler}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tags</Form.Label>
                                    <Form.Control type="text" placeholder="#java, #python" value={this.state.tags} onChange={this.tagsHandler} />
                                </Form.Group>
                                {
                                    this.state.error ? <Alert variant="warning" className="w-lg-50 float-lg-left">Something went wrong !</Alert> : null
                                }
                                {
                                    this.state.success ? <Alert variant="success" className="w-lg-50 float-lg-left">Blog created successfully !</Alert> : null
                                }
                                <Button type="submit" className="float-right">Create Post</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        )
    }
}

export default Addblog
