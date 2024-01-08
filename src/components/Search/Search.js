import React, { useState , useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart } from '../../redux/cartSlice';
import CartModal from '../CartModal/CartModel';
import Badge from 'react-bootstrap/Badge';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/cartSlice';
import styles from './Search.module.css';

const Search = ({ onSearch }) => {
  const { totalItems } = useSelector(selectCart);
  const [showCartModal, setShowCartModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [iconColor, setIconColor] = useState('#468cde');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIconColor((prevColor) => (prevColor === '#468cde' ? 'white' : '#468cde'));
    }, 1500);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleCartClick = () => {
    setShowCartModal(true);
  };
  const hideCartModal = () => {
    setShowCartModal(false);
  };

  const handleLogout = () => {
    dispatch(clearCart());
    localStorage.removeItem('authToken');
    navigate('/auth');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
      <Container>
        <Navbar.Brand href="#home">
          <span className={styles['product']}>Urban Vibes</span> <i className={["ph ph-television", styles['product-icon']].join(" ")} style={{ color: iconColor }}></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              className={["form-control me-2", styles['search-bar']].join(" ")}
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={onSearch}
            />
            <button className={["btn btn-outline-primary", styles['search-button']].join(" ")} type="submit">
              Search
            </button>

            </form>

            <div className="position-relative">
              <button className={["btn btn-outline-primary btn-sm", styles['cart-button']].join(" ")} onClick={handleCartClick}>
                <i className={["ph-fill ph-shopping-cart", styles['cart-icon']].join(" ")}></i> Cart
                {totalItems !== 0 && (
                  <Badge className={['position-absolute my-1 mx-4 top-0 end-0 translate-middle badge rounded-pill bg-primary text-white', styles['badge']].join(" ")}>
                    +{totalItems}
                  </Badge>
                )}
              </button>
              <CartModal show={showCartModal} onHide={hideCartModal} />
            </div>

            <div className="position-relative">
              <button className={["btn btn-outline-primary btn-sm", styles['logout-button']].join(" ")} onClick={handleLogout}>
                Log-out
              </button>
            </div>

         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Search;
