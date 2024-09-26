import React, { useContext, useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa6";
import { ContextApi } from "../ShopContext/ShopContext";
import "./Items.css";
import { TbCurrencyNaira } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
function Items(props) {
  const { addToCart, cartItms, Remove, WishList, addtowishList, RemoveList } =
    useContext(ContextApi);
  const { Pname, price, image, id, category, availability } = props;

  // State to store selected product details
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false); // State to show success message

  //wish List toggle
  const toggleWhishList = () => {
    if (WishList[id] > 0) {
      RemoveList(id);
    } else {
      addtowishList(id);
    }
  };
  const Opencart = (product) => {
    setSelectedProduct(product); // Set the selected product details
    setShowSuccess(false); // Reset the success message when opening the cart
  };

  const closeCart = () => {
    setSelectedProduct(null); // Clear the selected product details
  };

  const cartAdded = () => {
    setShowSuccess(true); // Show the success message
    setTimeout(() => {
      closeCart();
      setShowSuccess(false); // Hide the success message after 2 seconds
    }, 500);
  };

  return (
    <>
      {selectedProduct && (
        <div className={`overlay ${selectedProduct ? "overlaydisplay" : ""}`}>
          <div className="cancelBody" onClick={closeCart}>
            <IoClose className="cancel mb-2" />
          </div>
          <img
            src={`https://mernback-1-221g.onrender.com/uploads/${selectedProduct.image}`}
            alt={selectedProduct.Pname}
          />
          <div className="name">{selectedProduct.Pname}</div>
          <div className="category">{selectedProduct.category}</div>
          <div className="price">
            <TbCurrencyNaira />
            {selectedProduct.price}
          </div>
          <div className="bottom">
            <div className="quantityBox">
              <button onClick={() => Remove(id)}>
                <FaMinus className="text-dark" />
              </button>
              <div>{cartItms[id]}</div>
              <button onClick={() => addToCart(id)}>
                <FaPlus className="text-dark" />
              </button>
            </div>
            <div className="total mx-3" onClick={cartAdded}>
              Add {Math.ceil(selectedProduct.price * cartItms[id])}
            </div>
          </div>
          {showSuccess && (
            <div className="successMessage">
              Successfully added {selectedProduct.Pname} to cart!
            </div>
          )}
        </div>
      )}

      <div className="List" key={id}>
        <div>
          <img
            src={`https://mernback-1-221g.onrender.com/uploads/${image}`}
            alt=""
            className="product_img"
          />
        </div>
        <div className="com">
          <div>
            <div className="name">{Pname}......</div>
            <div className="category">{category}</div>
            <div className="d-flex align-items-center justify-content-between mt-3">
              <div className="price d-flex align-items-center mt-1">
                <TbCurrencyNaira />
                {price}
              </div>
            </div>
          </div>
          {availability === "inStock" ? (
            <div className="buttons">
              {cartItms[id] > 0 ? (
                <button className="addCart">in cart</button>
              ) : (
                <button
                  className="addCart"
                  onClick={() => Opencart({ Pname, price, image, category })}
                >
                  <IoAdd />
                  add
                </button>
              )}
              <div>
                <button className="wishListBtn" onClick={toggleWhishList}>
                  {WishList[id] > 0 ? (
                    <FaHeart size={20} color="red" />
                  ) : (
                    <CiHeart size={24} />
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="out-of-stock">out of stock</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Items;
