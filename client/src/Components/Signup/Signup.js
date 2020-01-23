import React from 'react';
import validator from 'validator';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './signup.css'

class Signup extends React.Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        phnumber: '',
        password: '',
        complete: false,
        error: false
    }
    firstnameHandler = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }
    lastnameHandler = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }
    emailHandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    phnumberHandler = (event) => {
        this.setState({
            phnumber: event.target.value
        })
    }
    passwordHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    signupformHandler = (event) => {
        event.preventDefault()
        fetch("http://127.0.0.1:5002/signup", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(res => {
                if (res.errors) {
                    return this.setState({
                        firstname: '',
                        lastname: '',
                        email: '',
                        phnumber: '',
                        password: '',
                        complete: false,
                        error: true
                    })
                }
                this.setState({
                    complete: true,
                    error: false
                })
            })
            .catch(err => {
                this.setState({
                    error: true
                })
            })
    }
    componentDidMount() {
        document.querySelector("#email").onchange = (event) => {
            const email = event.target.value
            if (!validator.isEmail(email)) {
                return this.setState({
                    email,
                    error: true
                })
            }
        }
        document.querySelector("#phnumber").onchange = (event) => {
            const number = event.target.value
            if (number.toString().length < 10) {
                return this.setState({
                    error: true
                })
            }
        }
    }
    render() {
        if (this.state.error) {
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 2000)
        }

        return (
            <>
                {
                    this.state.complete ? <Redirect to="/login" /> : null
                }
                <Container fluid={true} className="bgstyle">
                    <Card className="signupcard">
                        <Card.Body>
                            <Card.Title className="text-center">Signup To BlogMap</Card.Title>
                            <hr />
                            <Form onSubmit={this.signupformHandler}>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>First Name </Form.Label>
                                            <Form.Control type="text" placeholder="First name" value={this.state.firstname} onChange={this.firstnameHandler} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Last Name </Form.Label>
                                            <Form.Control type="text" placeholder="Last name" value={this.state.lastname} onChange={this.lastnameHandler} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="text" id="email" placeholder="example@gmail.com" value={this.state.email} onChange={this.emailHandler} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Mobile number</Form.Label>
                                    <Form.Control type="number" id="phnumber" placeholder="9702146387" value={this.state.phnumber} onChange={this.phnumberHandler} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={this.state.password} onChange={this.passwordHandler} />
                                </Form.Group>
                                <Button type="submit">Create Account</Button>
                                {
                                    this.state.error ? <Alert variant="danger" className="w-lg-50 float-lg-right">Something went wrong</Alert> : null
                                }
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <small>Already Have An Account? <Link to="/login">Login</Link></small>
                        </Card.Footer>
                    </Card>
                </Container>
            </>
        )
    }
}

export default Signup
