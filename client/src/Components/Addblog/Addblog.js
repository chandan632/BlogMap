import React, { Component } from 'react';
import MyNavbar from './../Navbar/Navbar';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';

export class Addblog extends Component {
    render() {
        return (
            <>
                <MyNavbar page="addblog" />
                <Container className="my-3">
                    <Card>
                        <Card.Header className="text-center">Add Your Blog</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Title Of Blog</Form.Label>
                                    <Form.Control type="text" placeholder="Title Of Your Sweet Blog" />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Category</Form.Label>
                                            <Form.Control as="select">
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
                                            <Form.Control as="select">
                                                <option value="public">public</option>
                                                <option value="private">private</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group>
                                    <Form.Label>Write Here ..</Form.Label>
                                    <Form.Control as="textarea" rows="10" placeholder="Your blog content goes here .."></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tags</Form.Label>
                                    <Form.Control type="text" placeholder="#java, #python" />
                                </Form.Group>
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
