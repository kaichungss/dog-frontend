import React, { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Outlet, useLocation } from "react-router-dom";
import styles from "./index.module.css";
import { httpPost } from "../../api/request";

const System: React.FC = () => {
  const [loginS, setLoginS] = useState<boolean>();

  useEffect(() => {
    isLogin()
  })
  const isLogin = async () => {
    const data = await httpPost<boolean>("/login/is_login", {});
    if (data) {
      setLoginS(data)
    }
  };
  const pathname = useLocation().pathname;
  return (
    <div className={styles.system}>
      <Navbar bg="dark" variant="dark" expand="lg" className={styles.navbar}>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/system/view" active={pathname === "/system/view"}>view</Nav.Link>
            <Nav.Link href="/system/favorites" active={pathname === "/system/favorites"}>favorites</Nav.Link>
            {localStorage.getItem("role") === 'worker' &&
              <Nav.Link href="/system/publish" active={pathname === "/system/publish"}>publish</Nav.Link>}
            <Nav.Link href="/system/chat" active={pathname === "/system/chat"}>chat</Nav.Link>
            {loginS && localStorage.getItem("token") &&
              <Nav.Link href="/system/profile" active={pathname === "/system/profile"}>profile</Nav.Link>}
          </Nav>

          <Navbar.Collapse className="justify-content-end">
            <Nav className="mr-auto">
              <Nav.Link href={localStorage.getItem("token") && loginS ? "/" : "/login"}>
                <span
                  onClick={() => loginS && localStorage.getItem("token") && localStorage.clear()}>{localStorage.getItem("token") ? 'logout' : 'login'}</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
      <div className={styles.out}>
        <Outlet/>
      </div>
    </div>
  );
};

export default System;
