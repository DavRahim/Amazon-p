import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import './Order.css'
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const savedCard = useLoaderData();
    const [cart, setCart] = useState(savedCard);
    
    const handelRemoveFromCart = (id)=>{
        console.log(id)
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining)
        removeFromDb(id)
    }

const handelClearCart = () =>{
    setCart([])
    deleteShoppingCart()
}

    return (
      <div className="shop-container">
        <div className="review-container">
          {cart.map((product) => (
            <ReviewItem
              key={product._id}
              product={product}
              handelRemoveFromCart={handelRemoveFromCart}
            ></ReviewItem>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handelClearCart={handelClearCart}>
          <Link to="/checkout">
            <button className='btn-proceed'>Proceed Checkout </button>
          </Link>
          
          </Cart>
        </div>
      </div>
    );
};

export default Orders;