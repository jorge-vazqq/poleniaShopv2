import { Link } from "react-router-dom";
import Rating from "./Rating";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

const Product = ({ product }) => {
  return (
    <Card className='card'>
      <Link to={`/product/${product._id}`} className="custom-link">
        <img
          src={product.image}
          alt={product.name}
          style={{
            marginBottom:'2%',
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
      

      <CardContent>
        <Link to={`/product/${product._id}`} className="custom-link">
          <Typography className='card-title' level="h5" component="div" sx={{ mb: 1 }}>
            {product.name}
          </Typography>
        </Link>

        <Typography level="body2" sx={{ mb: 1 }}>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Typography>

        <Typography level="h6">
          ${product.price}
        </Typography>
      </CardContent>
      </Link>
    </Card>
  );
};

export default Product;
