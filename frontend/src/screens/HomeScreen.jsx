import { Row, Col, Container } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Button } from "@mui/joy";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import Paginate from "../components/Paginate";
import screensStyles from "../styles/screensStyles.css";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div className="home-screen">
      <Container className="products-container">
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link to="/">
            <Button className="mb-4">Go Back</Button>
          </Link>
        )}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <header>
              <h1>Latest Products</h1>
              <p>Browse our collection of top-quality products!</p>
            </header>
            <Row>
              {data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default HomeScreen;
