import { NavLink, Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { About } from "./About";
import { ContactUs } from "./contact-us";
import React, { lazy } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";
import { ChallengeLayout } from "./sherman-coding-challenges/challenge-layout";
import { Challenge1 } from "./sherman-coding-challenges/challenge-1";
const Challenge2 = lazy(() => import('./sherman-coding-challenges/challenge-2'));
const Challenge3 = lazy(() => import('./sherman-coding-challenges/challenge-3'));
const Challenge4 = lazy(() => import('./sherman-coding-challenges/challenge-4'));
const Challenge5 = lazy(() => import('./sherman-coding-challenges/challenge-5'));
const Challenge6 = lazy(() => import('./sherman-coding-challenges/challenge-6'));
const Challenge7 = lazy(() => import('./sherman-coding-challenges/challenge-7'));
const Challenge8 = lazy(() => import('./sherman-coding-challenges/challenge-8'));
const Challenge9 = lazy(() => import('./sherman-coding-challenges/challenge-9'));
const Challenge10 = lazy(() => import('./sherman-coding-challenges/challenge-10'));
const Challenge11 = lazy(() => import('./sherman-coding-challenges/challenge-11'));
// const Challenge12 = lazy(() => import('./sherman-coding-challenges/challenge-12'));
// const Challenge13 = lazy(() => import('./sherman-coding-challenges/challenge-13'));
// const Challenge14 = lazy(() => import('./sherman-coding-challenges/challenge-14'));
// const Challenge15 = lazy(() => import('./sherman-coding-challenges/challenge-15'));

export const AppRoutes = () => {
    return (
        <React.Suspense fallback={<Spinner animation="border" />}>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<ContactUs />} />
                    <Route path="challenge" element={<ChallengeLayout />}>
                        <Route path="1" element={<Challenge1 />} />
                        <Route path="2" element={<Challenge2 />} />
                        <Route path="3" element={<Challenge3 />} />
                        <Route path="4" element={<Challenge4 />} />
                        <Route path="5" element={<Challenge5 />} />
                        <Route path="6" element={<Challenge6 />} />
                        <Route path="7" element={<Challenge7 />} />
                        <Route path="8" element={<Challenge8 />} />
                        <Route path="9" element={<Challenge9 />} />
                        <Route path="10" element={<Challenge10 />} />
                        <Route path="11" element={<Challenge11 />} />
                    </Route>
                    <Route path="*" element={<p>There's nothing here: 404!</p>} />
                </Route>
            </Routes>
        </React.Suspense>
    );
};

const renderChallengeMenuItem = (_: unknown, index: number) =>
    <NavDropdown.Item key={index} as={NavLink} to={`challenge/${index + 1}`}>Challenge {index + 1}</NavDropdown.Item>;

const Layout = () => {
    return (
        <>
            <h1>Test Project</h1>
            <Navbar bg="light" expand="sm">
                <Container fluid>
                    <Navbar.Brand href="#">Navbar</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-0">
                            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                            <NavDropdown title="Sherman Challenges" id="basic-nav-dropdown">
                                {Array.from({ length: 24 }).map(renderChallengeMenuItem)}
                            </NavDropdown>
                            <Nav.Link as={NavLink} to="/contact">Contact Us</Nav.Link>
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
