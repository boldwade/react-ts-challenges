import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { About } from "./About";
import { ContactUs } from "./contact-us";
import { Challenge1 } from "./sherman-coding-challenges/challenge-1";
import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Challenge2 } from "./sherman-coding-challenges/challenge-2";
import { Challenge3 } from "./sherman-coding-challenges/challenge-3";
import { Challenge } from "./sherman-coding-challenges/challenge-template";
import { Challenge4 } from "./sherman-coding-challenges/challenge-4";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="challenge">
                    <Route path="1" element={<Challenge1 />} />
                    <Route path="2" element={<Challenge2 />} />
                    <Route path="3" element={<Challenge3 />} />
                    <Route path="4" element={<Challenge4 />} />
                </Route>
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Route>
        </Routes>
    )
}

const renderChallengeMenuItem = (_: unknown, index: number) =>
    <NavDropdown.Item key={index} as={NavLink} to={`challenge/${index + 1}`}>Challenge {index + 1}</NavDropdown.Item>;

const Layout = () => {
    return (
        <>
            <h1>Test Project</h1>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-0">
                            <Nav.Link as={NavLink} to='/home'>Home</Nav.Link>
                            <Nav.Link as={NavLink} to='/about'>About</Nav.Link>
                            <NavDropdown title="Sherman Challenges" id="basic-nav-dropdown">
                                {Array.from({ length: 9 }).map(renderChallengeMenuItem)}
                            </NavDropdown>
                            <Nav.Link as={NavLink} to='/contact'>Contact Us</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main style={{ padding: '1rem 1rem' }}>
                <Outlet />
            </main>
        </>
    );
};
