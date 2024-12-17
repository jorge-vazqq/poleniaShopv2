import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa"; // Social media icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-dark text-light py-3">
      <Container>
        {/* Footer Navigation */}
        <Row className="mb-3">
  {/* Quick Links Section */}
  <Col xs={12} md={4} className="mb-3 mb-md-0">
    <h5>Quick Links</h5>
    <Nav className="flex-column">
      <Nav.Link href="/about" className="text-light">About Us</Nav.Link>
      <Nav.Link href="#contact" className="text-light">Contact</Nav.Link>
      <Nav.Link href="/faq" className="text-light">FAQ</Nav.Link>
    </Nav>
  </Col>

  {/* Social Media Links Section */}
  <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
    <h5>Follow Us</h5>
    <Nav className="justify-content-center">
      <Nav.Link href="#" className="text-light" target="_blank">
        <FaFacebook size={20} />
      </Nav.Link>
      <Nav.Link href="https://www.instagram.com/poleniagingerbeer/" className="text-light" target="_blank">
        <FaInstagram size={20} />
      </Nav.Link>
    </Nav>
  </Col>

  {/* Contact Information Section (aligned to the right) */}
  <Col xs={12} md={4} className="text-center text-md-end mb-3 mb-md-0">
    <h5>Contact</h5>
    <p>Email: support@polenia.com</p>
    <p>Phone: (123) 456-7890</p>
  </Col>
</Row>


        {/* Footer Bottom */}
        <Row>
          <Col className="text-center">
            <p className="mb-0">Polenia &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
