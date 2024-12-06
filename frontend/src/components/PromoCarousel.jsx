import { Carousel } from 'react-bootstrap';
import componentsStyles from '../styles/componentsStyles.css'

const PromoCarousel = ({ promos }) => {
  return (
    <Carousel className='carousel'>
      {promos.map((promo, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={promo.image}
            alt={`Promo ${index + 1}`}
          />
          <Carousel.Caption>
            <h3 id='carousel-caption'>{promo.title}</h3>
            <p id='carousel-caption'>{promo.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default PromoCarousel;
