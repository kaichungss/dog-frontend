import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Outlet, useLocation } from "react-router-dom";
import styles from "./index.module.css";

const System: React.FC = () => {
  const pathname = useLocation().pathname;
  return (
    <div className={styles.system}>
      <Navbar bg="dark" variant="dark" className={styles.navbar}>
        <Navbar.Brand>Dog View</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/system/view" active={pathname === "/system/view"}>view</Nav.Link>
          <Nav.Link href="/system/favorites" active={pathname === "/system/favorites"}>favorites</Nav.Link>
          {localStorage.getItem("role") === 'worker' &&
            <Nav.Link href="/system/publish" active={pathname === "/system/publish"}>publish</Nav.Link>}
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            <Nav.Link href="/login">logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className={styles.out}>
        <Outlet/>
      </div>
    </div>
  );
};

export default System;
