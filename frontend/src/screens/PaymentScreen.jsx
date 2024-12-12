import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import { ListDivider } from "@mui/joy";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Card className='card'>
      <h1>Payment Method</h1>
      <ListDivider />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend"><h2>Select Method</h2></Form.Label>
          
          <Col>
          <p>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            </p>
          </Col>
        </Form.Group>

        <Button type="submit">
          Continue
        </Button>
      </Form>
      </Card>
    </FormContainer>
  );
};

export default PaymentScreen;
