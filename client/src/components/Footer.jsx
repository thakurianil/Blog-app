import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4 mt-4">
      <Container>
        <Row className="mt-3">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} Blog App. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
