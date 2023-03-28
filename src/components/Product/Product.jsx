import React from 'react';
import './Product.css'

const Product = (props) => {
    console.log(props.product);
    const { img, name, seller, quantity, price, ratings } = props.product;

    return (
      <div className="product">
        <img src={img} alt="" />
        <div className='product-info'> 
          <h6 className="product-name">{name.slice(0, 15)}</h6>
          <p>Price: ${price}</p>
          <p>Manufacture: {seller}</p>
          <p>Ratings: {ratings} stars</p>
        </div>
        <button className='btn-cart'>Add to Cart</button>
      </div>
    );
};

export default Product;