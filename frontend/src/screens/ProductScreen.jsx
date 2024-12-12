import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  Row,
  Col,
  Image,
} from "react-bootstrap";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import { useDispatch } from "react-redux";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { toast } from 'react-toastify';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Product successfully added to the cart!');
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
        <Row>
          <Col md={9}>
            <Card orientation="horizontal" className="card">
              <Col>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col>
                <List>
                  <ListItem>
                    <h3>{product.name}</h3>
                  </ListItem>
                  <ListDivider inset="gutter" />
                  <ListItem>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListItem>
                  <ListDivider inset="gutter" />
                  <ListItem>
                    <p>Price: ${product.price}</p>
                  </ListItem>
                  <ListDivider inset="gutter" />
                  <ListItem>
                    <p>Description: {product.description}</p>
                  </ListItem>
                </List>
              </Col>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="card">
              <List>
                <ListItem>
                  <ListItemContent>
                    <p>Price:</p>
                  </ListItemContent>

                  <ListItemContent>
                    <b>${product.price}</b>
                  </ListItemContent>
                </ListItem>

                <ListItem>
                  <ListItemContent>
                    <p>Status:</p>
                  </ListItemContent>

                  <ListItemContent>
                    <b>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </b>
                  </ListItemContent>
                </ListItem>

                {product.countInStock > 0 && (
                  <ListItem>
                    <ListItemContent>
                      <p>Qty:</p>
                    </ListItemContent>
                    <ListItemContent>
                      <Select
                        value={qty}
                        onChange={(event, newValue) => setQty(newValue)}
                        disabled={product.countInStock === 0}
                      >
                        {product.countInStock > 0 ? (
                          [...Array(product.countInStock).keys()].map((x) => (
                            <Option key={x + 1} value={x + 1}>
                              {x + 1}
                            </Option>
                          ))
                        ) : (
                          <Option value={0}>Out of Stock</Option>
                        )}
                      </Select>
                    </ListItemContent>
                  </ListItem>
                )}
                <ListItem>
                  <Button
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                    
                  >
                    Añadir al carrito
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
