import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const NoDataPage: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <Alert variant="info">
            <Alert.Heading>no data yet</Alert.Heading>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default NoDataPage;
