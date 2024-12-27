import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "../css/NavBar.css";

export const NavBar: React.FC = () => {
  return (
    <Navbar>       
          <Navbar.Brand href="#home">My_Farm</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>            
            <Nav.Link href="#products">Products</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav>
       
      </Navbar>
  );
};
