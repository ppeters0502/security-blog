import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className='footer py-2 bg-dark text-white fixed-bottom' style={{ marginTop: '25px' }}>
      <Row>
        <Container>
          <Col md={{ span: 6, offset: 3 }}>
            <p style={{ textAlign: 'center' }}>
              © 2022 Copyright:{' '}
              <a className="text-white" href="/">
                Scream Into The Void Today
              </a>
            </p>
          </Col>
        </Container>
      </Row>
    </footer>

  );
};

export default Footer;
