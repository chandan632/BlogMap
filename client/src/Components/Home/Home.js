import React from 'react';
import Navbar from './../Navbar/Navbar';
import './home.css'
import { Container, Row, Col } from 'react-bootstrap';
import Tags from './../Tags/Tags';
import Category from './../Category/Category';
import BlogPost from './../BlogPost/BlogPost'

class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <Container fluid={true} className="homebg">
                    <Row className="justify-content-around">
                        <Col className="tags" xs={2}>
                            <Tags />
                        </Col>
                        <Col>
                            <BlogPost />
                        </Col>
                        <Col className="category" xs={2}>
                            <h3 className="text-center">Category</h3>
                            <Category />
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}



export default Home;