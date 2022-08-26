import React, { useState } from 'react';
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { Slide } from 'react-reveal';
// import './Creators.css';

const Creators = () => {
    // if the data will add here then we can show the cards of creators as like showcase/traits
    const [data, setData] = useState([]);

    return (
        <div className="main-container creators-container" id="creators">
            {/* added slide left animation */}
            <Slide left>
                {/* creators header */}
                <div className="d-flex justify-content-center">
                    <h2 className="creators-title">Creators</h2>
                </div>

                {/* creators elements*/}
                <Container fluid>
                    <CardGroup>
                        <Row className="d-flex justify-content-evenly justify-content-sm-center">
                            {data.map(item => (
                                <Col key={item.id} sm={10} md={3} lg={3} className="py-4">
                                    <Card className="bg-transparent">
                                        <Card.Img className="creators-card-img" variant="top" src={item.image} />
                                        <Card.Body className="creators-card-body">
                                            <p className="card-title">{item.title}</p>
                                            <Card.Text>{item.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </CardGroup>
                </Container>
            </Slide>
        </div>
    );
};

export default Creators;
