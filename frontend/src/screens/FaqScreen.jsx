import React from "react";
import { Button } from "@mui/joy";
import { Container, Row, Col, Accordion, } from "react-bootstrap";

const FaqScreen = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={12} className="text-center">
          <h1>Frequently Asked Questions</h1>
          <p>Here are some common questions we get about our ginger beer.</p>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is ginger beer?</Accordion.Header>
              <Accordion.Body>
                Ginger beer is a non-alcoholic beverage made with ginger, sugar, and water, fermented to create a refreshing, spicy, and fizzy drink. It's a great alternative to sodas and is perfect for mixing with cocktails or enjoying on its own.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Is your ginger beer alcoholic?</Accordion.Header>
              <Accordion.Body>
                No, our ginger beer is completely non-alcoholic! It's brewed with a natural fermentation process that gives it a fizzy kick but contains no alcohol. You can enjoy it just like a soda or mix it into your favorite mocktails and cocktails.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>What are the ingredients in your ginger beer?</Accordion.Header>
              <Accordion.Body>
                Our ginger beer is made from all-natural ingredients, including fresh ginger, sugar, water, and natural spices. We pride ourselves on creating a product that's free from artificial preservatives and additives, delivering an authentic and refreshing taste.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Where can I buy your ginger beer?</Accordion.Header>
              <Accordion.Body>
                Our ginger beer is available in a variety of online and retail stores. You can purchase directly from our website or check out our store locator to find the nearest retailer near you.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>Is your ginger beer gluten-free?</Accordion.Header>
              <Accordion.Body>
                Yes, our ginger beer is gluten-free. We carefully select ingredients to ensure that it’s safe for those with gluten sensitivities or dietary restrictions.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>How should I store my ginger beer?</Accordion.Header>
              <Accordion.Body>
                Store your ginger beer in a cool, dry place away from direct sunlight. Once opened, keep it in the refrigerator to maintain its freshness and enjoy it within a few days.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>Do you offer bulk orders or wholesale pricing?</Accordion.Header>
              <Accordion.Body>
                Yes, we do offer bulk orders and wholesale pricing for businesses. Please contact us directly through our website or email us at sales@polenia.com to discuss your requirements and pricing options.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col className="text-center">
        <Button component="a" href="/" size="lg">
            Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FaqScreen;
