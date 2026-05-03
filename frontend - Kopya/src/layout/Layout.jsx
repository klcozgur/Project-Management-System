import { Outlet, Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Layout() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Project Management</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Users</Nav.Link>
                            <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-3">
                <Outlet />
            </Container>
        </>
    );
}
