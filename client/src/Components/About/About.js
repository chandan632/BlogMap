import React from 'react';
import Navbar from './../Navbar/Navbar';
import { Container } from 'react-bootstrap';
import './about.css';

function About() {
    return (
        <>
            <Navbar />
            <Container className="maincontainerabout" fluid={true}>
                <div className="text-center subcontainer d-flex justify-content-center align-items-center flex-column">
                    <h4 className="contactdetails">About Us</h4>
                    <hr className="hr" />
                    <p>We are a team of Web Developer.</p>
                    <p>Our team is committed for giving best user experience ever.</p>
                    <p>We focused to give you quality content.</p>
                    <p>Write your experience here and let world to know who are you.</p>
                </div>
            </Container>
        </>
    )
}

export default About
