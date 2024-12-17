import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const AboutUsScreen = () => {
  return (
    <Container>
      <Row className="text-center my-5">
        <Col>
          <h1>About Us</h1>
          <p>Learn more about who we are and what we do.</p>
        </Col>
      </Row>

      <Row className="my-4">
        <Col md={6}>
          <h2>Who We Are</h2>
          <p>
            We are a passionate team dedicated to providing the best products to our customers. Our mission is to bring quality and value to every home.
          </p>
        </Col>
        <Col md={6}>
          <img 
            src="/images/sample.jpg" 
            alt="About Us Image" 
            className="img-fluid" 
          />
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <h2>Our Mission</h2>
          <p>
            We aim to offer top-quality products, exceptional customer service, and to make a positive impact on the community.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUsScreen;
