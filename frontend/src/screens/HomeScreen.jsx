import { Row, Col, Container } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PromoCarousel from '../components/PromoCarousel';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import screensStyles from '../styles/screensStyles.css';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  // Mock promo data - replace with dynamic data if available
  const promoData = [
    {
      image: '/images/promo1.jpg',
      title: 'Summer Sale',
      description: 'Enjoy up to 50% off on selected items!',
    },
    {
      image: '/images/promo2.jpg',
      title: 'New Arrivals',
      description: 'Discover the latest trends in our collection.',
    },
    {
      image: '/images/promo3.jpg',
      title: 'Exclusive Deals',
      description: 'Only available for a limited time. Don’t miss out!',
    },
  ];

  return (
    <div className="home-screen">
      <Container fluid className="promo-container">
        <PromoCarousel promos={promoData} />
      </Container>

      <Container className="products-container">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <header>
              <h1>Latest Products</h1>
              <p>Browse our collection of top-quality products!</p>
            </header>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default HomeScreen;
