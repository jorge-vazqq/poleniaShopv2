import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, Form } from "react-bootstrap";
import Card from "@mui/joy/Card";
import Button from "@mui/joy/Button";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { addToCart } from "../slices/cartSlice";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import DrawerFilters from "../components/InsetDrawer";
import "react-quill/dist/quill.snow.css";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    /*toast.success("Product successfully added to the cart!");*/
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row id="product-container">
            <Col md={9} id="product-details">
              <Card orientation="stack" className="card">
                <Row>
                  <Col>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      id="product-image"
                    />
                  </Col>
                  <Col>
                    <List id="product-info">
                      <ListItem>
                        <h3 className="product-name">{product.name}</h3>
                      </ListItem>
                      <ListItem>
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                      </ListItem>
                      <ListDivider inset="gutter" />
                      <ListItem>
                        <p className="product-price">${product.price}</p>
                      </ListItem>
                      <ListDivider inset="gutter" />
                      <ListItem>
                        <p className="product-description">
                          {product.description}
                        </p>
                      </ListItem>
                    </List>
                  </Col>
                </Row>
                <Row id="product-review">
                  <Col md={9}>
                    <List>
                      <h2 className="review-header">Reviews</h2>
                      <ListDivider inset="gutter" />
                      {product.reviews.length === 0 && (
                        <Message>No Reviews</Message>
                      )}
                      {product.reviews.map((review) => (
                        <ListItem key={review._id} className="review-item">
                          <Row>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                          </Row>
                        </ListItem>
                      ))}
                      <h2 className="review-header">Write a customer review</h2>
                      <ListDivider inset="gutter" />
                      <ListItem>
                        {loadingProductReview && <Loader />}
                        {userInfo ? (
                          <Form onSubmit={submitHandler} className="review-form">
                            <Form.Group controlId="rating" className="my-2">
                              <Form.Label>Rating</Form.Label>
                              <Form.Control
                                as="select"
                                required
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value="">Select...</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Very Good</option>
                                <option value="5">5 - Excellent</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="comment" className="my-2">
                              <Form.Label>Comment</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                              ></Form.Control>
                            </Form.Group>
                            <Button
                              disabled={loadingProductReview}
                              type="submit"
                            >
                              Submit
                            </Button>
                          </Form>
                        ) : (
                          <Message>
                            Please <Link to="/login">sign in</Link> to write a
                            review{" "}
                          </Message>
                        )}
                      </ListItem>
                    </List>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col md={3} id="product-actions">
              <Card className="card">
                <List>
                  <ListItem>
                    <ListItemContent>
                      <b className="product-price">${product.price}</b>
                    </ListItemContent>
                  </ListItem>
                  <ListItem>
                    <ListItemContent>
                      <b className="stock-status">
                        {product.countInStock > 0
                          ? "Disponible"
                          : "No disponible por el momento"}
                      </b>
                    </ListItemContent>
                  </ListItem>
                  {product.countInStock > 0 && (
                    <ListItem>
                      <ListItemContent>
                        <Select
                          className='select'
                          value={qty}
                          onChange={(event, newValue) => setQty(newValue)}
                          disabled={product.countInStock === 0}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <Option key={x + 1} value={x + 1}>
                              {x + 1}
                            </Option>
                          ))}
                        </Select>
                      </ListItemContent>
                    </ListItem>
                  )}
                  <ListItem>
                    <Button
                      disabled={product.countInStock === 0}
                      onClick={() => {
                        toggleDrawer();
                        addToCartHandler();
                      }}
                    >
                      Añadir al carrito
                    </Button>
                    <DrawerFilters
                      open={drawerOpen}
                      onClose={() => setDrawerOpen(false)}
                    />
                  </ListItem>
                </List>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
