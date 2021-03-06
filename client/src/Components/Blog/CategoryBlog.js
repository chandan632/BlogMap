import React from 'react';
import moment from 'moment';
import './blog.css';
import Navbar from './../Navbar/Navbar';
import { Card } from 'react-bootstrap';

class Blog extends React.Component {
    state = {
        data: ''
    }
    componentDidMount() {
        const storedBlog = localStorage.getItem("blog")
        if (!storedBlog) {
            if (this.props.location.title) {
                const title = this.props.location.title
                fetch(`http://127.0.0.1:5002/categoryblog/${title}`, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(res => res.json())
                    .then(res => {
                        localStorage.setItem("blog", JSON.stringify(res))
                        this.setState({
                            data: res
                        })
                    })
                    .catch(err => console.log(err))
            }
        }
        else {
            this.setState({
                data: JSON.parse(storedBlog)
            })
        }
    }
    render() {
        return (
            <>
                <Navbar />
                {
                    this.state.data === '' ? <p>No blog found</p>
                        :
                        <div className="d-flex justify-content-center">
                            <Card className="w-50 mt-3">
                                <Card.Header className="text-center font-weight-bold">{this.state.data.title}</Card.Header>
                                <Card.Body>
                                    <Card.Text>{this.state.data.content}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small>Created By: {this.state.data.name}</small>
                                    <small className="float-right">Created At: {moment(this.state.data.createdAt).format('YYYY-MM-DD')}</small>
                                </Card.Footer>
                            </Card>
                        </div>
                }

            </>
        )
    }
}

export default Blog
