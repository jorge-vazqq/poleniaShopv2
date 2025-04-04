import { useState, useEffect } from "react";
import { Row, Col, Container, Nav } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useGetPromosQuery } from "../slices/promosApiSlice";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Button } from "@mui/joy";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import PromosCarousel from "../components/PromosCarousel";
import Paginate from "../components/Paginate";


const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [heroVisible, setHeroVisible] = useState(false);

  const { data: promosData, isLoading: promosLoading } = useGetPromosQuery();
  const {
    data: productsData,
    isLoading: productsLoading,
    error,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  useEffect(() => {
    setHeroVisible(true);
  }, []);

  return (
    <div className="home-screen">
      <Container fluid className="py-4">
        {!keyword && (
          <div className={`hero ${heroVisible ? "slide-up" : ""}`}>
            <h1 className="hero-title">Welcome to Polenia</h1>
            <p className="hero-subtitle">Discover premium Ginger Beer at unbeatable prices!</p>
            <Nav.Link href="#products" className="hero-shop-now-link">
              <Button size="lg">Shop Now</Button>
            </Nav.Link>
          </div>
        )}

        {!keyword && (
          <div className="promos-carousel-container">
            <PromosCarousel />
          </div>
        )}

        <div className="products-section" id="products">
          <h2 className="products-title">
            {keyword ? "Search Results" : "Latest Products"}
          </h2>
          <p className="products-description">
            {keyword ? `Showing results for "${keyword}"` : "Explore our latest additions."}
          </p>
          {keyword && (
            <Link to="/">
              <Button variant="outline-primary" size="sm" className="go-back-button">
                Go Back
              </Button>
            </Link>
          )}
        </div>

        {productsLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <Row>
              {productsData.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={productsData.pages} page={productsData.page} keyword={keyword || ""} />
          </>
        )}
      </Container>
    </div>
  );
};

export default HomeScreen;