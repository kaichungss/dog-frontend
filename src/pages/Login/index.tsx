import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import Box from '../../components/Box';
import styles from "./index.module.css";
import { useNavigate } from 'react-router-dom';
import { httpPost } from '../../api/request';

interface Token {
  token: string;
  id: string;
  username: string;
  role: string;
  org_name: string;
  email: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = await httpPost<Token>("/login", formData);
    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.role);
      localStorage.setItem("id", data.id);
      localStorage.setItem("org_name", data.org_name);
      localStorage.setItem("email", data.email);
      navigate("/system")
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.login}>
      <Box>
        <h2 className={styles.title}>Login</h2>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" value={formData.email} onChange={handleInputChange}
                              placeholder="Enter email address"/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <InputGroup.Text onClick={toggleShowPassword}>
                    {showPassword ? '🙈' : '👁️'}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Col>
          </Row>
          <Row>
            <Col className={styles.register}>
              <a href={"/register"}>Register</a>
            </Col>
          </Row>
        </Form>
      </Box>
    </div>
  );
};

export default Login;
