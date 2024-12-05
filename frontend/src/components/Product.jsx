import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded product-card">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} className="custom-link">
          <Card.Title as="div" className="card-title">
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as="div" className="card-text">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3" className="card-price">
          ${product.price}
          </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
