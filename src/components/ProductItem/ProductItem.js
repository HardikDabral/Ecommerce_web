import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/cartSlice';
import styles from './ProductItem.module.css';
import Carousel from 'react-bootstrap/Carousel';

const ProductItem = (props) => {
  const {
    title,
    description,
    images,
    price,
    rating,
    category,
    brand,
    stock,
    discountPercentage,
  } = props;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const dispatch = useDispatch(); // allows components to dispatch actions to the Redux store

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: props.id,
        title: props.title,
        price: props.price,
        description: props.description,
        images: props.images,
        rating: props.rating,
        category: props.category,
        brand: props.brand,
        stock: props.stock,
      })
    );
  };

  const handleImageSelect = (selectedIndex) => {
    setSelectedImageIndex(selectedIndex);
  };

  return (
    <div className={["card my-1", styles[['card-height']]].join(" ")}>
      <Carousel
        activeIndex={selectedImageIndex}
        onSelect={handleImageSelect}
        className={styles.carousel}
        interval={null}  // Disable automatic sliding
        prevIcon={<span className={`carousel-control-prev-icon ${styles['carousel-control-prev-icon']}`} />}
        nextIcon={<span className={`carousel-control-next-icon ${styles['carousel-control-next-icon']}`} />}
        indicators={false}
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className={["d-block w-100", styles['img']].join(" ")}
              src={image}
              alt=""
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}...</p>
        <span className={["badge bg-success my-1", styles['badge']].join(" ")}>
          {rating}
          <i className="ph-fill ph-star mx-1"></i>
        </span>
        <div className="mt-2 flex-grow-1">
          <p className="card-text">
            <small className="text-muted">{`Brand: ${brand}`}</small>
          </p>
          <p className="card-text">
            <small className="text-muted">{`Category: ${category}`}</small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              {stock > 0 ? `In Stock (${stock} available)` : 'Out of Stock'}
            </small>
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className={["price-containermy-3", styles['price']].join(" ")}>
            <p className="card-text">
              Price ₹{price}
              <small className={[" mx-1", styles['discount']].join(" ")}>
                {`${discountPercentage}`} % off
              </small>
              <button className="btn btn-outline-primary my-1 mx-4" onClick={handleAddToCart}>
                Add to Cart <i className="ph-duotone ph-shopping-cart"></i>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
