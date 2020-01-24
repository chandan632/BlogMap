import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { GoPlus } from 'react-icons/go';
import './navbar.css'

class MyNavbar extends React.Component {
    state = {
        name: '',
        isLoggedIn: false,
        logout: false
    }
    componentDidMount() {
        const storedToken = localStorage.getItem("auth_token")
        if (!storedToken) {
            return
        }
        const token = storedToken.replace("Bearer ", "")
        const decode = jwt.decode(token)
        if (decode.exp < Date.now() / 1000) {
            return this.setState({
                logout: true
            })
        }
        const decodedData = jwt.verify(token, "dcdiuvc273457346344*&*&#%#*&%#&dsgviufgv")
        this.setState({
            name: decodedData.name
        })
    }
    logoutHandler = () => {
        localStorage.removeItem('auth_token')
        this.setState({
            logout: true
        })
    }
    render() {
        return (
            <>
                {
                    this.state.logout ? <Redirect to="/login" /> : null
                }
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand><Link to="/" className="brand">BlogMap</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-lg-auto userhandle" >
                            <Nav.Item ><Link to="/" className="navlink">Home</Link></Nav.Item>
                            <Nav.Item ><Link to="/contact" className="navlink">Contact</Link></Nav.Item>
                            <Nav.Item ><Link to="about" className="navlink">About</Link></Nav.Item>
                        </Nav>
                        <Form inline className="formcontrol mr-5">
                            <Form.Control type="text" placeholder="search" className="ml-sm-2" />
                            <Button variant="outline-primary">Search</Button>
                        </Form>
                        {
                            this.props.page === "addblog" ? null : <Link to="/addblog" className="navlink"><GoPlus className="addicon" /></Link>
                        }
                        <Nav className="ml-lg-4 userhandle">
                            {
                                this.state.name !== '' ?
                                    <>
                                        <Nav.Item className="navlink">{this.state.name}</Nav.Item>
                                        <Nav.Item className="navlink" onClick={this.logoutHandler}>Logout</Nav.Item>
                                    </> : <>
                                        <Nav.Item><Link to="login" className="navlink">Login</Link></Nav.Item>
                                        <Nav.Item><Link to="/signup" className="navlink">Signup</Link></Nav.Item>
                                    </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}

export default MyNavbar;