import {Outlet} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

export default function Layout(){

    return <>
        <Navbar bg='Light' expand="lg">
            <Container>
                <Navbar.Brand href='/'>
                    Project Management
                </Navbar.Brand>
                <Navbar.Toggle aria-controls=  "basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href='/' >User</Nav.Link>
                        <Nav.Link href='/projects' >Projects</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
        <Outlet/>

        </>
        }

