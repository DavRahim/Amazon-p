import React from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const Cart = ({ cart, handelClearCart, children }) => {
  //   const { cart } = props;
  let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    product.quantity = product.quantity || 1;
    totalPrice += product.price * product.quantity;
    totalShipping += product.shipping;
    quantity += product.quantity;
  }
  const tax = (totalPrice * 7) / 100;
  const grandTotal = totalPrice + totalShipping + tax;
  return (
    <div className="cart">
      <h4>Order Summary</h4>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: $ {totalPrice}</p>
      <p>Total Shipping: $ {totalShipping}</p>
      <p>Tax:{tax.toFixed(2)}</p>
      <h6>Grand Total: {grandTotal}</h6>
      <button onClick={handelClearCart} className="btn-clear">
        <span>clear cart</span>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      {
        children
      }
    </div>
  );
};

export default Cart;
