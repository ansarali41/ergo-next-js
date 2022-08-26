import React, { useState } from 'react';
import { Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { Zoom } from 'react-reveal';
import TraitsData from '../../Data/TraitsData';
// import './Traits.css';

const Traits = () => {
    const [data, setData] = useState(TraitsData);

    // gif hover effect
    const [isHover1, setIsHover1] = useState(false);
    const [isHover2, setIsHover2] = useState(false);
    const [isHover3, setIsHover3] = useState(false);

    const onMouseEnter = id => {
        if (id === 1) setIsHover1(true);
        else if (id === 2) setIsHover2(true);
        else if (id === 3) setIsHover3(true);
    };

    const onMouseLeave = id => {
        if (id === 1) setIsHover1(false);
        else if (id === 2) setIsHover2(false);
        else if (id === 3) setIsHover3(false);
    };
    return (
        <div className="main-container Traits-container fade-in-fwd" id="traits">
            {/* Traits header */}

            {/* added zoom in animation */}
            <Zoom>
                <div>
                    <h2 className="Traits-title text-center">Traits: Explained</h2>
                    <p className="text-center Traits-text">
                        Each ErgoSapien is generated programmatically using the various traits such as headgear, expression, color, and <br /> more. The rarer traits are defined
                        below
                    </p>
                </div>

                {/* Traits elements*/}
                <Container fluid>
                    <CardGroup>
                        <Row className="d-flex justify-content-evenly">
                            {/* 1st card */}
                            <Col sm={10} md={3} lg={3}>
                                <Card className="bg-transparent">
                                    <Card.Img
                                        className="Traits-card-img"
                                        variant="top"
                                        src={isHover1 ? data[0].gif : data[0].image}
                                        onMouseEnter={() => onMouseEnter(1)}
                                        onMouseLeave={() => onMouseLeave(1)}
                                    />

                                    <Card.Body className="Traits-card-body">
                                        <p className="card-title">{data[0].title}</p>
                                        <Card.Text className="traits-card-text">{data[0].description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* 2nd card */}
                            <Col sm={10} md={3} lg={3}>
                                <Card className="bg-transparent">
                                    <Card.Img
                                        className="Traits-card-img"
                                        variant="top"
                                        src={isHover2 ? data[1].gif : data[1].image}
                                        onMouseEnter={() => onMouseEnter(2)}
                                        onMouseLeave={() => onMouseLeave(2)}
                                    />

                                    <Card.Body className="Traits-card-body">
                                        <p className="card-title">{data[1].title}</p>
                                        <Card.Text className="traits-card-text">{data[1].description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* 3rd card */}
                            <Col sm={10} md={3} lg={3}>
                                <Card className="bg-transparent">
                                    <Card.Img
                                        className="Traits-card-img"
                                        variant="top"
                                        src={isHover3 ? data[2].gif : data[2].image}
                                        onMouseEnter={() => onMouseEnter(3)}
                                        onMouseLeave={() => onMouseLeave(3)}
                                    />

                                    <Card.Body className="Traits-card-body">
                                        <p className="card-title">{data[2].title}</p>
                                        <Card.Text className="traits-card-text">{data[2].description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </CardGroup>
                </Container>
            </Zoom>
        </div>
    );
};

export default Traits;
