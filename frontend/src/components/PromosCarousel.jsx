import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetPromosQuery } from '../slices/promosApiSlice';  // Use promosApiSlice

const PromoCarousel = () => {
  const { data: promos, isLoading, error } = useGetPromosQuery();  // Fetch promos instead of products

  return isLoading ? (
    <div style={{ height: '60vh', backgroundColor: '#f3f3f3' }} className="d-flex align-items-center justify-content-center">
      <span>Loading...</span>
    </div>
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4' style={{ backgroundColor: 'transparent' }}>
      {promos.map((promo) => (
        <Carousel.Item key={promo._id}>
          <Link to={`/promo/${promo._id}`}>
            <Image
              src={promo.image}
              alt={promo.title}
              style={{
                maxHeight: '60vh',
                objectFit: 'contain',
                width: '100%',
              }}
              fluid
            />
            <Carousel.Caption className='carousel-caption'>
              <h2
                className='text-white text-right'
                style={{ margin: 0 }}
                dangerouslySetInnerHTML={{ __html: promo.title }}
              />
              <p
                style={{ margin: 0 }}
                dangerouslySetInnerHTML={{ __html: promo.description }}
              />
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PromoCarousel;
