import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import './category.css';
import { Link } from 'react-router-dom';

export class Category extends Component {
    state = {
        computer: [],
        programming: [],
        fashion: [],
        technology: [],
        movie: [],
        story: [],
        books: [],
        electronics: []
    }
    componentDidMount() {
        fetch("http://127.0.0.1:5002/category", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    computer: res.computer,
                    programming: res.programming,
                    fashion: res.fashion,
                    technology: res.technology,
                    movie: res.movie,
                    story: res.story,
                    books: res.books,
                    electronics: res.electronics
                })
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                <Accordion>
                    <Card>
                        <Accordion.Toggle as={Card.Header} className="cursor" eventKey="0">Computer</Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {
                                    this.state.computer.length > 0 ? <>
                                        {
                                            this.state.computer.map((item, index) => {
                                                return <Link key={index} className="hovereffect" to={{ pathname: "/categoryblog", title: `${item}` }}><p className="text-dark" key={index}>{item}</p></Link>
                                            })
                                        }
                                    </> : <Card.Text>No Blog Found For This Category</Card.Text>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} className="cursor" eventKey="1">Programming</Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                {
                                    this.state.programming.length > 0 ? <>
                                        {
                                            this.state.programming.map((item, index) => {
                                                return <Link key={index} className="hovereffect" to={{ pathname: "/categoryblog", title: `${item}` }}><p className="text-dark " >{item}</p></Link>
                                            })
                                        }
                                    </> : <Card.Text>No Blog Found For This Category</Card.Text>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} className="cursor" eventKey="2">Fashion</Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                {
                                    this.state.fashion.length > 0 ? <>
                                        {
                                            this.state.fashion.map((item, index) => {
                                                return <Link key={index} className="hovereffect" to={{ pathname: "/categoryblog", title: `${item}` }}><p className="text-dark" key={index}>{item}</p></Link>
                                            })
                                        }
                                    </> : <Card.Text>No Blog Found For This Category</Card.Text>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} className="cursor" eventKey="3">Technology</Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                {
                                    this.state.technology.length > 0 ? <>
                                        {
                                            this.state.technology.map((item, index) => {
                                                return <Link key={index} className="hovereffect" to={{ pathname: "/categoryblog", title: `${item}` }}><p className="text-dark" key={index}>{item}</p></Link>
                                            })
                                        }
                                    </> : <Card.Text>No Blog Found For This Category</Card.Text>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} className="cursor" eventKey="4">Movie</Accordion.Toggle>
                        <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                {
                                    this.state.movie.length > 0 ? <>
                                        {
                                            this.state.movie.map((item, index) => {
                                                return <Link key={index} className="hovereffect" to={{ pathname: "/categoryblog", title: `${item}` }}><p className="text-dark" key={index}>{item}</p></Link>
                                            })
                                        }
                                    </> : <Card.Text>No Blog Found For This Category</Card.Text>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} className="cursor" eventKey="5">Story</Accordion.Toggle>
                        <Accordion.Collapse eventKey="5">
                            <Card.Body>
                                {
                                    this.state.story.length > 0 ? <>
                                        {
                                            this.state.story.map((item, index) => {
                                                return <Link key={index} className="hovereffect" to={{ pathname: "/categoryblog", title: `${item}` }}><p className="text-dark" key={index}>{item}</p></Link>
                                            })
                                        }
                                    </> : <Card.Text>No Blog Found For This Category</Card.Text>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} className="cursor" eventKey="6">Books</Accordion.Toggle>
                        <Accordion.Collapse eventKey="6">
                            <Card.Body>
                                {
                                    this.state.books.length > 0 ? <>
                                        {
                                            this.state.books.map((item, index) => {
                                                return <Link key={index} className="hovereffect" to={{ pathname: "/categoryblog", title: `${item}` }}><p key={index}>{item}</p></Link>
                                            })
                                        }
                                    </> : <Card.Text>No Blog Found For This Category</Card.Text>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} className="cursor" eventKey="7">Electronics</Accordion.Toggle>
                        <Accordion.Collapse eventKey="7">
                            <Card.Body>
                                {
                                    this.state.electronics.length > 0 ? <>
                                        {
                                            this.state.electronics.map((item, index) => {
                                                return <Link key={index} className="hovereffect" to={{ pathname: "/categoryblog", title: `${item}` }}><p key={index}>{item}</p></Link>
                                            })
                                        }
                                    </> : <Card.Text>No Blog Found For This Category</Card.Text>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        )
    }
}

export default Category
