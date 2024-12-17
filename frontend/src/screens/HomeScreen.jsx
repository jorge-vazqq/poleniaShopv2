import { Row, Col, Container, Nav } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
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

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div className="home-screen">
      <Container fluid className="py-4">
      {/* Hero Section */}
      {!keyword && (
        <div
          style={{
            textAlign: "center",
            height: '30vh',
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
            Welcome to Polenia
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "30px" }}>
            Discover premium Ginger Beer at unbeatable prices!
          </p>
            <Nav.Link href='#products'>
            <Button size="lg">
              Shop Now
            </Button>
            </Nav.Link>
        </div>
      )}

      {/* Promos Carousel */}
      {!keyword && (
        <div style={{ marginBottom: "40px" }}>

          <PromosCarousel />
        </div>
      )}

      {/* Products Section */}
      <div style={{ textAlign: "center", marginBottom: "40px" }} id="products">
        <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          {keyword ? "Search Results" : "Latest Products"}
        </h2>
        <p>{keyword ? `Showing results for "${keyword}"` : "Explore our latest additions."}</p>
        {keyword && (
          <Link to="/">
            <Button variant="outline-primary" size="sm" style={{ marginTop: "10px" }}>
              Go Back
            </Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row >
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
