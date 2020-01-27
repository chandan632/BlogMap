import React from 'react';
import validator from 'validator';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import './login.css'

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        error: false,
        allset: false
    }
    emailHandler = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    passwordHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    loginHandler = (event) => {
        event.preventDefault()
        if (this.state.email === "" || this.state.password === "") {
            return this.setState({
                error: true
            })
        }
        fetch("http://127.0.0.1:5002/login", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return this.setState({
                        error: true
                    })
                }
                const token = "Bearer " + res.token
                localStorage.setItem('auth_token', token)
                localStorage.setItem("user", JSON.stringify(res.userExists))
                this.setState({
                    allset: true
                })
            })
            .catch(err => {
                return this.setState({
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
                    this.state.allset ? <Redirect to="/" /> : null
                }
                <Container fluid={true} className="bgstyle">
                    <Card className="logincard">
                        <Card.Body>
                            <Card.Title className="text-center">Login To BlogMap</Card.Title>
                            <hr />
                            <Form onSubmit={this.loginHandler}>
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="text" id="email" placeholder="example@gmail.com" value={this.state.email} onChange={this.emailHandler} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={this.state.password} onChange={this.passwordHandler} />
                                </Form.Group>
                                <Button type="submit">Login</Button>
                                {
                                    this.state.error ? <Alert variant="warning" className="w-lg-50 float-lg-right">Something went wrong</Alert> : null
                                }
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <small>New to BlogMap? <Link to="/signup">Create an account</Link></small>
                        </Card.Footer>
                    </Card>
                </Container>
            </>
        )
    }
}

export default Login
