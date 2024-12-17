import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetPromosQuery } from '../slices/promosApiSlice';  // Use promosApiSlice

const PromoCarousel = () => {
  const { data: promos, isLoading, error } = useGetPromosQuery();  // Fetch promos instead of products

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'style={{ backgroundColor: 'transparent' }}>
      {promos.map((promo) => (  // Map through promos
        <Carousel.Item key={promo._id}>
          <Link to={`/promo/${promo._id}`}>  {/* Navigate to promo details */}
            <Image
              src={promo.image}  // Use promo image
              alt={promo.title}    // Use promo name
              style={{
                maxHeight: '60vh',
                objectFit: 'contain',  // Ensure the image is contained without overflow
                width: '100%'  // Make sure the image takes full width of its container
              }} 
              fluid
            />
            <div>
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right' style={{margin:0}} dangerouslySetInnerHTML={{
                            __html: promo.title,
                          }}/>
              <p className='' style={{margin:0}} dangerouslySetInnerHTML={{
                            __html: promo.description,
                          }} />  {/* Display promo description */}
            </Carousel.Caption>
            </div>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PromoCarousel;
