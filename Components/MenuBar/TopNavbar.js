import { useEffect, useState } from 'react';
// import "./MenuBar.css";
import { Container, Nav, Navbar } from 'react-bootstrap';
import { ErgoDappConnector } from '../Requirements/Requirements';

export default function App({ ergopay }) {
    const [visible, setVisible] = useState(true);
    const [ergoPay, setErgoPay] = ergopay;
    let walletButton = <ErgoDappConnector ergopayProps={[ergoPay, setErgoPay]} color={'purple'} />;
    // if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //     walletButton = <ErgoDappConnector ergopayProps={[ergoPay, setErgoPay]} color={'purple'} />;
    // }

    const [position, setPosition] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            let moving = window.pageYOffset;
            setVisible(position > moving);
            setPosition(moving);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    const cls = visible ? 'visible' : 'hidden';

    return (
        <nav className={cls}>
            <Navbar collapseOnSelect expand="lg" bg="transparent" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav className="navbar-links">
                            <Nav.Link href="#home" className="nav-button">
                                About
                            </Nav.Link>
                            <Nav.Link href="#showcase" className="nav-button">
                                Showcase
                            </Nav.Link>
                            <Nav.Link href="#traits" className="nav-button">
                                Traits
                            </Nav.Link>
                            <Nav.Link href="#creators" className="nav-button">
                                Creators
                            </Nav.Link>
                        </Nav>
                        {walletButton}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </nav>
    );
}
