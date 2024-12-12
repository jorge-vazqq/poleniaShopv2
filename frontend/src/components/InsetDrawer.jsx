import * as React from "react";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import Stack from "@mui/joy/Stack";
import { Grid } from "@mui/joy";

import { Row, Col, ListGroup, Image, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Card from "@mui/joy/Card";
import { useDispatch, useSelector } from "react-redux";

import Sheet from "@mui/joy/Sheet";

export default function DrawerFilters({ open, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    onClose(); // Close the drawer
    setTimeout(() => {
      navigate("/login?redirect=/shipping"); // Navigate after drawer animation completes
    }, 300); // Match this to the drawer's close animation duration
  };

  return (
    <React.Fragment>
      <Drawer
        size="md"
        variant="plain"
        open={open}
        onClose={onClose}
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              p: { md: 3, sm: 0 },
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <DialogTitle>Cart</DialogTitle>
          <ModalClose onClick={onClose} />
          <Divider sx={{ mt: "auto" }} />
          <DialogContent sx={{ gap: 2 }}>
            <Card className="card">
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link
                            to={`/product/${item._id}`}
                            className="custom-link"
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={2}>
                          <p>${item.price}</p>
                        </Col>
                        <Col md={2}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              addToCartHandler(item, Number(e.target.value))
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={2}>
                          <Button
                            onClick={() => removeFromCartHandler(item._id)}
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card>
          </DialogContent>

          <Grid container spacing={2} sx={{ width: "100%" }}>
            <Grid xs={12}>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                items)
              </h2>
            </Grid>
            <Grid xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
              <p>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </Grid>
          </Grid>

          <Divider />
          <Stack direction="row-reverse">
            <Button
              type="button"
              disabled={cartItems.length === 0}
              onClick={() => {
                checkoutHandler();
              }}
            >
              Proceed to Checkout
            </Button>
          </Stack>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
