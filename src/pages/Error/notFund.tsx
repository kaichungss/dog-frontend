import React from 'react';
import { Alert, Container } from "react-bootstrap";

const NotFund: React.FC = () => {
  return (
    <div>
      <Container
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Alert variant="danger">
          <h2>404 - Not Found</h2>
          <p>The page you are looking for does not exist.</p>
        </Alert>
      </Container>
    </div>
  );
};

export default NotFund;
