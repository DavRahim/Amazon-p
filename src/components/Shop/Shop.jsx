import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { totalProducts } = useLoaderData();
  // const itemsPerPage = 10; //TODO: make it dynamic

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const pageNumber = [...Array(totalPages).keys()];

  // console.log(totalProducts);

  /***
   * done: 1. Determine the total number items:
   * TODO:  2. Decide on the number of items per page;
   * DONE: 3. Calculate the total number of pages
   *
   */

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  //server data load get
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);

    fetch(`http://localhost:5000/productsByIds`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProduct) => {
        const saveCart = [];
        // step 1 : get the add product
        for (const id in storedCart) {
          //step 2 : get the  product state by using id
          const addProduct = cartProduct.find((product) => product._id === id);
          if (addProduct) {
            //step 3 : add quantity
            const quantity = storedCart[id];
            addProduct.quantity = quantity;
            // step 4: add the added product to the cart
            saveCart.push(addProduct);
          }
          console.log("aa", addProduct);
        }
        //step 5: save the cart
        setCart(saveCart);
      });
  }, []);

  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product._id);
  };

  const handelClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 20];
  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handelClearCart={handelClearCart}>
            <Link to="/orders">
              <button className="btn-proceed">Review Order</button>
            </Link>
          </Cart>
        </div>
      </div>

      {/* pagination */}
      <div className="pagination">
        <p>
          <small>current page:{currentPage}</small>
        </p>
        {pageNumber.map((number) => (
          <button
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
