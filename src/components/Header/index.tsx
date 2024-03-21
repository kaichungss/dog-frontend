import React, { ReactNode } from "react";
import { Nav, Navbar } from "react-bootstrap";

interface ContainerProps {
  children: ReactNode;
}

const Header: React.FC<ContainerProps> = ({children}) => {
  return (
    <div className="Header">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">My Website</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#link1" style={{color: 'white'}}>Link 1</Nav.Link>
          <Nav.Link href="#link2" style={{color: 'white'}}>Link 2</Nav.Link>
        </Nav>
      </Navbar>
      {children}
    </div>
  );
};

export default Header;
