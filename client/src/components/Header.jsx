import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
const Header = () => {
  return (
    <>
      <Navbar className="bg-[#d4b725]">
        <Container>
          <Navbar.Brand href="#home" className="font-semibold">
            <NavLink to="/">OTPAuth</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <NavLink to="/register">Register</NavLink>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
