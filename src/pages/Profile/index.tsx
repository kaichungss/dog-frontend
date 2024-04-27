import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from "./index.module.css";
import Box from "../../components/Box";
import { ORG, orgName } from "../../api/register";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/view";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: localStorage.getItem("username") || '',
    code: '',
    role: localStorage.getItem("role") || '',
    org_id: Number(localStorage.getItem("org_id"))
  });
  const [orgList, setOrgList] = useState<ORG[]>([]);
  useEffect(() => {
    searchOrg()
  }, [])
  const searchOrg = async () => {
    const data = await orgName();
    if (data) {
      setOrgList(data)
    }
  }
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
    const data = await updateUser(info);
    if (data) {
      alert("success")
      navigate("/login")
    }
  }
  return (

    <Box>
      <div className={styles.item}>
        <h2 className={styles.title}>Edit Profile</h2>
        <Form autoComplete="off">
          <Form.Group className="mb-3" controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange}
                          placeholder="Enter username"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupCheckbox">
            <Form.Label>Identity</Form.Label>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="charity worker"
              name="role"
              checked={formData.role === "worker"}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
          {formData.role === 'worker' && (
            <>
              <Form.Group className="mb-3" controlId="formGroupOrganization">
                <Form.Label>Organization</Form.Label>
                <Form.Control as="select" name="org_id"
                              onChange={handleInputChange} value={formData.org_id}>
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
              submit
            </Button>
          </div>
        </Form>
      </div>
    </Box>

  );
};

export default EditProfilePage;
