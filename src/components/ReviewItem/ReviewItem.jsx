import React from 'react';
import './Review.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";


const ReviewItem = ({ product, handelRemoveFromCart }) => {
  const { _id, img, price, name, quantity } = product;
  return (
    <div className="review-item">
      <img src={img} alt="" />
      <div className="review-info">
        <p className="product-title">{name}</p>
        <p>
          Price: <span className="orange">${price}</span>
        </p>
        <p>
          Order Quantity: <span className="orange">{quantity}</span>
        </p>
      </div>
      <button onClick={()=>handelRemoveFromCart(_id)} className="btn-delete">
        {" "}
        <FontAwesomeIcon className="delete-icon" icon={faTrashAlt} />{" "}
      </button>
      
    </div>
  );
};

export default ReviewItem;