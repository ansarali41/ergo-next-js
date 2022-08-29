import React, { useState } from 'react';
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { Slide } from 'react-reveal';
import showcaseData from '../../Data/ShowcaseData';
// import './Showcase.css';

const Showcase = () => {
    const [data, setData] = useState(showcaseData);
    return (
        <div className="main-container showcase-container" id="showcase">
            {/* added slide left animation */}
            <Slide left>
                {/* showcase header */}
                <div className="d-flex justify-content-center">
                    <h2 className="showcase-title">Showcase</h2>
                </div>

                {/* showcase elements*/}
                <Container fluid>
                    <CardGroup className="d-flex justify-content-center">
                        <Row className="d-flex justify-content-evenly">
                            {data.map(item => (
                                <Col key={item.id} sm={10} md={3} lg={3} className="py-4">
                                    <Card className="bg-transparent">
                                        <Card.Img className="showcase-card-img" variant="top" src={item.image} />
                                        <Card.Body className="showcase-card-body">
                                            <p className="card-title">{item.title}</p>
                                            <Card.Text className="showcase-card-text" variant="">
                                                {item.description}
                                            </Card.Text>
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

export default Showcase;
