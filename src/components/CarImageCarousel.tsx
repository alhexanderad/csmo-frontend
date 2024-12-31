import React from 'react';
import Slider from 'react-slick';
import { CarImage } from '../types/car';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CarImageCarouselProps {
  images: CarImage[];
  altText: string;
}

const CarImageCarousel: React.FC<CarImageCarouselProps> = ({ images, altText }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id} className="carousel-slide">
            <img src={image.image} alt={altText} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarImageCarousel;