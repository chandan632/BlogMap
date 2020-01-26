import React from 'react';
import Navbar from './../Navbar/Navbar';
import { Container } from 'react-bootstrap';
import './contact.css';

function Contact() {
    return (
        <>
            <Navbar />
            <Container fluid={true} className="maincontainer d-flex justify-content-center align-items-center">
                <div className="text-center subcontainer d-flex justify-content-center align-items-center flex-column">
                    <h4 className="contactdetails">Contact Details</h4>
                    <hr className="hr" />
                    <p>For any query and features related problem contact us</p>
                    <p>Email: chandanrout737@gmail.com</p>
                    <p>Ph Number: 8788128536</p>
                </div>
            </Container>
        </>
    )
}

export default Contact
