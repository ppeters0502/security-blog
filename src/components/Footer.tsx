import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <Row className="footer bg-dark text-white" style={{ marginTop: '50px' }}>
      <Container>
        <Col md={{ span: 6, offset: 3 }}>
          <p style={{ textAlign: 'center', marginTop: '10px' }}>
            © 2022 Copyright:{' '}
            <a className="text-white" href="/">
              Scream Into The Void Today
            </a>
          </p>
        </Col>
      </Container>
    </Row>
  );
};

export default Footer;
