import React from 'react';
import { Navbar, Nav, Form, Button, Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { GoPlus } from 'react-icons/go';
import './navbar.css'

class MyNavbar extends React.Component {
    state = {
        name: '',
        isLoggedIn: false,
        logout: false,
        data: '',
        search: '',
        blogs: [],
        searchTitle: [],
        open: false
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
            name: decodedData.name,
            data: decodedData,
            isLoggedIn: true
        })
        fetch("http://127.0.0.1:5002/search", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    blogs: res.blogs
                })
            })
    }
    logoutHandler = () => {
        localStorage.removeItem('auth_token')
        this.setState({
            logout: true
        })
    }
    inputHandler = (event) => {
        this.setState({
            search: event.target.value
        })
    }
    oninputHandler = (event) => {
        const text = event.target.value.trim().toLowerCase()
        if (text) {
            let title = []
            this.state.blogs.forEach(blog => {
                if (blog.title.toLowerCase().includes(text)) {
                    title.push(blog.title)
                }
            })
            this.setState({
                searchTitle: [...new Set(title)],
                open: true
            })
        }
        else {
            this.setState({
                searchTitle: [],
                open: true
            })
        }
    }

    render() {
        document.addEventListener("click", (e) => {
            if (!e.target.classList.contains("search")) {
                this.setState({
                    open: false
                })
            }
        })
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
                        <Form inline className="formcontrol mr-5" onSubmit={this.formsubmitHandler}>
                            <Form.Control type="text" value={this.state.search} onInput={this.oninputHandler} onChange={this.inputHandler} onClick={this.openHandler} placeholder="search" className="ml-sm-2" />
                            <Button variant="outline-primary" type="submit">Search</Button>
                        </Form>
                        {
                            this.props.page === "addblog" || !this.state.isLoggedIn ? null : <Link to="/addblog" className="navlink"><GoPlus className="addicon" /></Link>
                        }
                        <Nav className="ml-lg-4 userhandle">
                            {
                                this.state.name !== '' ?
                                    <>
                                        <Link to={{ pathname: '/profile', data: this.state.data }}><Nav.Item className="navlink">{this.state.name}</Nav.Item></Link>
                                        <Nav.Item className="navlink" onClick={this.logoutHandler}>Logout</Nav.Item>
                                    </> : <>
                                        <Nav.Item><Link to="login" className="navlink">Login</Link></Nav.Item>
                                        <Nav.Item><Link to="/signup" className="navlink">Signup</Link></Nav.Item>
                                    </>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {
                    this.state.open ? <div className="searchbox  search">
                        <Card className="search">
                            <Card.Header className="text-center search">Title</Card.Header>
                            <Card.Body className="search">
                                {
                                    this.state.searchTitle.length > 0 ? <>
                                        {
                                            this.state.searchTitle.map((title, index) => {
                                                return <Link key={index} className="hovereffect text-dark search" to={{ pathname: "/categoryblog", title: `${title}` }}><p className="search">{title}</p></Link>
                                            })
                                        }
                                    </> : <p className="search">No title found</p>
                                }
                            </Card.Body>
                        </Card>
                    </div> : null
                }
            </>
        )
    }
}

export default MyNavbar;