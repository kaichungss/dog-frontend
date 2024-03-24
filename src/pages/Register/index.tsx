import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Box from '../../components/Box';
import styles from "./index.module.css";
import { useNavigate } from 'react-router-dom';
import { httpPost } from '../../api/request';


const Register: React.FC = () => {
  const navigate = useNavigate();
  const time = 60;
  const [seconds, setSeconds] = useState<number>(time);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    code: '',
    role: 'public'
  });
  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleCheckboxChange = (e: { target: { name: any; checked: any; }; }) => {
    const {name, checked} = e.target;
    console.log(checked)
    const role = checked ? 'worker' : 'public';
    setFormData({
      ...formData,
      [name]: role
    });
  };
  useEffect(() => {
    let timer: NodeJS.Timer
    if (disabled) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 1) {
            setSeconds(time);
            setDisabled(false);
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [disabled]);

  const handleSubmit = async (event: FormEvent) => {
    event.stopPropagation();
    const data = await httpPost<string>("/register/insert", formData);
    if (data) {
      alert("success")
      navigate("/login")
    }
  }
  const sendCode = async (event: FormEvent) => {
    event.stopPropagation();
    setDisabled(true);
    const data = await httpPost<string>("/register/code", {email: formData.email});
    if (data) {
      alert("registration code:" + data)
    }
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.register}>
      <Box>
        <h2 className={styles.title}>Register</h2>
        <Form autoComplete="off">
          <Form.Group className="mb-3" controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange}
                          placeholder="Enter username"/>
          </Form.Group>
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
          <Form.Group className="mb-3" controlId="formGroupCheckbox">
            <Form.Label>Identity</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="charity worker"
              name="role"
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          <InputGroup className="mb-3">
            <Form.Control placeholder="registration code" name="code" value={formData.code}
                          onChange={handleInputChange}/>
            <Button variant="outline-secondary" id="send-registration" onClick={sendCode} disabled={disabled}>
              {disabled ? `${seconds} seconds click` : 'send'}
            </Button>
          </InputGroup>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="button" onClick={handleSubmit}>
              register
            </Button>
          </div>
        </Form>
      </Box>
    </div>
  );
};

export default Register;
