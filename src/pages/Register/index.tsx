import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import Box from '../../components/Box';
import styles from "./index.module.css";
import { useNavigate } from 'react-router-dom';
import { ORG, orgName, registerInsert } from "../../api/register";


const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    code: '',
    role: 'public',
    org_id: -1
  });

  const [orgList, setOrgList] = useState<ORG[]>([]);
  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleCheckboxChange = (e: { target: { name: any; checked: any; }; }) => {
    const {name, checked} = e.target;
    const role = checked ? 'worker' : 'public';
    setFormData({
      ...formData,
      [name]: role
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.stopPropagation();
    const info = {...formData}
    if (info.role !== "worker") {
      info.org_id = -1;
    }
    const data = await registerInsert(info);
    if (data) {
      navigate("/login")
    }
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    searchOrg()
  }, [])
  const searchOrg = async () => {
    const data = await orgName();
    if (data) {
      setFormData({...formData, org_id: data[0].id})
      setOrgList(data)
    }
  }
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
          {formData.role === 'worker' && (
            <>
              <Form.Group className="mb-3" controlId="formGroupOrganization">
                <Form.Label>Organization</Form.Label>
                <Form.Control as="select" name="org_id"
                              onChange={handleInputChange}>
                  {orgList.map((org, index) => (
                    <option key={index} value={org.id}>{org.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Code</Form.Label>
                <Form.Control placeholder="registration code" name="code" value={formData.code}
                              onChange={handleInputChange}/>
              </Form.Group>
            </>
          )
          }
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
