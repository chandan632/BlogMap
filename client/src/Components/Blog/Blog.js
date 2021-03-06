import React from 'react';
import moment from 'moment';
import './blog.css';
import Navbar from './../Navbar/Navbar';
import { Card } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Blog extends React.Component {
    state = {
        data: ''
    }
    componentDidMount() {
        const storedblog = localStorage.getItem("blog")
        if (!storedblog) {
            localStorage.setItem("blog", JSON.stringify(this.props.location.data))
            this.setState({
                data: this.props.location.data
            })
        }
        else {
            this.setState({
                data: JSON.parse(storedblog)
            })
        }
    }
    render() {
        return (
            <>
                <Navbar />
                {
                    this.state.data === undefined ? <Redirect to="/" />
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
