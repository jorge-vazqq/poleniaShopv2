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
import "../styles/screensStyles.css";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [heroVisible, setHeroVisible] = useState(false); // New state

  // Fetch promos first
  const { data: promosData, isLoading: promosLoading } = useGetPromosQuery();

  // Fetch products
  const {
    data: productsData,
    isLoading: productsLoading,
    error,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  useEffect(() => {
    // Trigger logo animation on component mount
    setHeroVisible(true);
  }, []);

  return (
    <div className="home-screen">
      <Container fluid className="py-4">
        {/* Hero Section */}
        {!keyword && (
          <div
            className={`hero ${heroVisible ? "slide-up" : ""}`} // Add dynamic class
          >
            <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
              Welcome to Polenia
            </h1>
            <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
              Discover premium Ginger Beer at unbeatable prices!
            </p>
            <Nav.Link
              href="#products"
              style={{
                display: "inline-block", // Ensure it only wraps the button
                padding: 0, // Remove extra padding
                margin: 0, // Remove extra margin
              }}
            >
              <Button size="lg">Shop Now</Button>
            </Nav.Link>
          </div>
        )}

        {/* Promos Carousel */}
        {!keyword && (
          <div
            style={{
              minHeight: "60vh",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <PromosCarousel />
          </div>
        )}

        {/* Products Section */}
        <div
          style={{ textAlign: "center", marginBottom: "40px" }}
          id="products"
        >
          <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
            {keyword ? "Search Results" : "Latest Products"}
          </h2>
          <p>
            {keyword
              ? `Showing results for "${keyword}"`
              : "Explore our latest additions."}
          </p>
          {keyword && (
            <Link to="/">
              <Button
                variant="outline-primary"
                size="sm"
                style={{ marginTop: "10px" }}
              >
                Go Back
              </Button>
            </Link>
          )}
        </div>

        {productsLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Row>
              {productsData.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={productsData.pages}
              page={productsData.page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </Container>
    </div>
  );
};

export default HomeScreen;
