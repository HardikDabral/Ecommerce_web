import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cartSlice';
import styles from './CartModal.module.css'

const CartModal = ({ show, onHide }) => {
    const { items } = useSelector(selectCart);
    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className={styles['center-width']}>Your Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className={styles['even-columns']}>
                    <span className={styles['even-width']}>Products</span> 
                    <span className={styles['even-width']}>Quantity</span> 
                    <span  className={styles['even-width']}>Price</span> 
                </h5>
                
                {items.map((item) => (
                    <div key={item.id}>
                        <p className={styles['even-columns']}>
                            <span className={styles['even-width']}>{item.title}</span>
                            <span className={styles['even-width']}>{item.quantity}</span>
                            <span className={styles['even-width']}><b> ₹{item.price * item.quantity}</b></span>
                        </p>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary btn-danger" onClick={onHide}>
                    Close
                </Button>
                <div className="ms-auto">
                    <p className={["font-weight-bold ", styles['product-items']].join(" ")}> <b>Total Price: ₹{totalPrice}</b></p>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default CartModal;

