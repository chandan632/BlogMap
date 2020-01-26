import React from 'react';
import './profile.css';
import jwt from 'jsonwebtoken';
import MyNavbar from './../Navbar/Navbar';
import { MdPeople } from 'react-icons/md';
import { FaPencilAlt, FaTrashAlt, FaPen } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { Container, Row, Col, Tab, Nav, Jumbotron, Table, Card, Form, Button, Alert } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

export class Profile extends React.Component {
    state = {
        name: '',
        email: '',
        phnumber: '',
        id: '',
        password: '',
        confirmpassword: '',
        blogs: [],
        error: false,
        logout: false,
        passworderror: false,
        passwordsuccess: false
    }
    componentDidMount() {
        const storedToken = localStorage.getItem("auth_token")
        if (!storedToken) {
            return this.setState({
                logout: true
            })
        }
        const token = storedToken.replace("Bearer ", "")
        const decode = jwt.decode(token)
        if (decode.exp < Date.now() / 1000) {
            localStorage.removeItem("user")
            return this.setState({
                logout: true
            })
        }
        if (!localStorage.getItem("user")) {
            localStorage.setItem("user", JSON.stringify(this.props.location.data))
        }
        const storedUser = localStorage.getItem("user")
        let user = undefined
        if (storedUser) {
            user = JSON.parse(storedUser)
        }
        if (!user) {
            return this.setState({
                error: true
            })
        }
        this.setState({
            name: user.name,
            email: user.email,
            phnumber: user.phnumber,
            id: user.UserID
        })
        fetch(`http://127.0.0.1:5002/findblog/${user.UserID}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    blogs: [...res]
                })
            })
            .then(err => console.log(err))
    }
    passwordHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    confirmpasswordHandler = (event) => {
        this.setState({
            confirmpassword: event.target.value
        })
    }
    confirmpasswordsubmitHandler = (event) => {
        event.preventDefault()
        if (this.state.confirmpassword !== this.state.password) {
            return this.setState({
                passworderror: true
            })
        }
        fetch("http://127.0.0.1:5002/changedpassword", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: this.state.password, email: this.state.email })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    return this.setState({
                        passworderror: true
                    })
                }
                this.setState({
                    passwordsuccess: true,
                    password: '',
                    confirmpassword: ''
                })
            })
            .catch(err => console.log(err))
    }
    deleteHandler = (event) => {
        let id = event.target.id
        if (id) {
            this.setState({
                blogs: this.state.blogs.filter(blog => blog._id !== id)
            })
        }
        else {
            id = event.target.parentElement.id
            this.setState({
                blogs: this.state.blogs.filter(blog => blog._id !== id)
            })
        }
        fetch(`http://127.0.0.1:5002/deleteblog/${id}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    // editHandler = (event) => {
    //     let id = event.target.id
    //     if(!id){
    //         id = event.target.parentElement.id
    //     }

    // }
    render() {
        if (this.state.passworderror || this.state.passwordsuccess) {
            setTimeout(() => {
                this.setState({
                    passworderror: false,
                    passwordsuccess: false
                })
            }, 2000)
        }
        return (
            <div>
                {
                    this.state.error ? <Redirect to="/" /> : null
                }
                {
                    this.state.logout ? <Redirect to="/login" /> : null
                }
                <MyNavbar />
                <Container fluid={true} >
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
                        <Row>
                            <Col sm={3} className="profiletab">
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first" className="mytab"><MdPeople /> Profile</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second" className="mytab"><FaPencilAlt /> Blogs</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third" className="mytab"><FiLock /> Changed Password</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <Jumbotron className="d-flex justify-content-center">
                                            <Card className="w-50 mt-4">
                                                <Card.Header className="text-center">Your Details</Card.Header>
                                                <Card.Body>
                                                    <Card.Text>Name: {this.state.name} <br /> Email: {this.state.email} <br /> Phone Number: {this.state.phnumber}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Jumbotron>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        {
                                            this.state.blogs.length === 0 ? <p className="text-center mt-5">No blog posted yet</p> : <><h3 className="text-center">All Your Blogs</h3>
                                                <Table responsive>
                                                    <thead>
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Title</th>
                                                            <th>Visibility</th>
                                                            <th>Edit</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.blogs.map((blog, index) => {
                                                                return <tr key={blog._id}>
                                                                    <td>{index}</td>
                                                                    <td>{blog.title}</td>
                                                                    <td>{blog.visibility}</td>
                                                                    <td><Link to={{ pathname: "/edit", id: `${blog._id}` }}><FaPen className="edit" id={blog._id} /></Link></td>
                                                                    <td><FaTrashAlt className="delete" id={blog._id} onClick={this.deleteHandler} /></td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </Table></>
                                        }
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third" className="d-flex justify-content-center">
                                        <Card className="w-50 mt-4">
                                            <Card.Header className="text-center">Change Your Password</Card.Header>
                                            <Card.Body>
                                                <Form onSubmit={this.confirmpasswordsubmitHandler}>
                                                    <Form.Group>
                                                        <Form.Label>New Password</Form.Label>
                                                        <Form.Control type="password" value={this.state.password} onChange={this.passwordHandler} />
                                                    </Form.Group>
                                                    <Form.Group>
                                                        <Form.Label>Confirm</Form.Label>
                                                        <Form.Control type="password" value={this.state.confirmpassword} onChange={this.confirmpasswordHandler} />
                                                    </Form.Group>
                                                    <Button type="submit">Save</Button>
                                                    {
                                                        this.state.passworderror ? <Alert variant="danger" className="w-50 float-right p-2">Something went wrong</Alert> : null
                                                    }
                                                    {
                                                        this.state.passwordsuccess ? <Alert variant="success" className="w-50 float-right p-2">Password Updated Successfully!</Alert> : null
                                                    }
                                                </Form>
                                            </Card.Body>
                                        </Card>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </div>
        )
    }
}

export default Profile
