import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Box from '../../components/Box';
import styles from "./index.module.css";
import { useNavigate } from 'react-router-dom';
import { httpPost } from '../../api/request';

interface Token {
  token: string;
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
  }, [])
  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (event: FormEvent) => {
    event.stopPropagation();
    const data = await httpPost<Token>("/login", formData);
    if (data != null) {
      localStorage.setItem("accessToken", data.token);
      navigate("/system/view")
    }
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.login}>
      <Box>
        <h2 className={styles.title}>Login</h2>
        <Form autoComplete="off">
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" value={formData.email} onChange={handleInputChange}
                          placeholder="Enter email address"/>
          </Form.Group>
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
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="button" onClick={handleSubmit}>
              login
            </Button>
          </div>
          <div className={styles.register}>
            <a href={"/register"}>register</a>
          </div>
        </Form>
      </Box>
    </div>
  );
};

export default Login;
