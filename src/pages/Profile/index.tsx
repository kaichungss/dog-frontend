import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const ProfilePage = () => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{localStorage.getItem("username")}</Card.Title>
              <Card.Text>
                Email: {localStorage.getItem("email")} <br/>
                Role: {localStorage.getItem("role")}<br/>
                {localStorage.getItem("role") === 'worker' && ("ORG: " + localStorage.getItem("org_name"))}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
