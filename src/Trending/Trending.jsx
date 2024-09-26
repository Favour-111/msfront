import React, { useContext, useEffect, useState } from "react";
import "./Trending.css";
import { FaHeart, FaPlusCircle, FaStar } from "react-icons/fa";
import { ContextApi } from "../ShopContext/ShopContext";
import { IoClose } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaMinus, FaPlus } from "react-icons/fa6";
import all_product from "../All_Product/all_product";
import { CiHeart } from "react-icons/ci";
import { io } from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
const Trending = ({ Store }) => {
  const [all_product, setProduct] = useState([]);
  const trendingProduct = all_product.filter((item) => item.vendor === Store);
  const [loader, SetLoader] = useState(false);
  const getAllProduct = async () => {
    try {
      SetLoader(true);
      const response = await axios.get(
        `https://mernback-1-221g.onrender.com/getalProducts`
      );
      if (response) {
        setProduct(response.data.response);
      } else {
        toast.error("Internet error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      SetLoader(false);
    }
  };

  useEffect(() => {
    getAllProduct();

    const socket = io("https://mernback-1-221g.onrender.com");

    // Listen for real-time updates (product added or deleted)
    socket.on("productAdded", (newProduct) => {
      setProduct((prevProducts) => [...prevProducts, newProduct]);
    });

    socket.on("productDelete", (deletedProductId) => {
      setProduct((prevProducts) =>
        prevProducts.filter((product) => product._id !== deletedProductId)
      );
    });
    socket.on("ProductUpdated", (updatedProduct) => {
      setProduct((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );
    });
    return () => {
      socket.disconnect();
    };
  }, [Store]);
  const { addToCart, cartItms, Remove, WishList, addtowishList, RemoveList } =
    useContext(ContextApi);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const Opencart = (product) => {
    setSelectedProduct(product);
    setShowSuccess(false);
  };

  const closeCart = () => {
    setSelectedProduct(null);
  };

  const cartAdded = () => {
    setShowSuccess(true);
    setTimeout(() => {
      closeCart();
      setShowSuccess(false);
    }, 500);
  };
  const toggleWhishList = (id) => {
    if (WishList[id] > 0) {
      RemoveList(id);
    } else {
      addtowishList(id);
    }
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
              <button onClick={() => Remove(selectedProduct.id)}>
                <FaMinus className="text-dark" />
              </button>
              <div>{cartItms[selectedProduct.id] || 0}</div>
              <button onClick={() => addToCart(selectedProduct.id)}>
                <FaPlus className="text-dark" />
              </button>
            </div>
            <div className="total mx-3" onClick={cartAdded}>
              Add{" "}
              {Math.ceil(
                selectedProduct.price * (cartItms[selectedProduct.id] || 0)
              )}
            </div>
          </div>
          {showSuccess && (
            <div className="successMessage">
              Successfully added {selectedProduct.Pname} to cart!
            </div>
          )}
        </div>
      )}

      {loader ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="trending-container">
          {trendingProduct
            .filter((item) => item.category === "Drink")
            .map((item, index) => (
              <div className="Trending_Product_container" key={index}>
                <div className="image-container mt-4">
                  <img
                    src={`https://mernback-1-221g.onrender.com/uploads/${item.image}`}
                    className=""
                    alt={item.Pname}
                  />
                </div>
                <div className="product-name">{item.Pname}</div>
                <div className="price-add">
                  <div className="price">
                    <TbCurrencyNaira />
                    {item.price}
                  </div>
                  {item.availability === "inStock" ? (
                    <div className="add-to-cart">
                      <FaPlusCircle
                        size={30}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          Opencart({
                            Pname: item.Pname,
                            price: item.price,
                            image: item.image,
                            category: item.category,
                            id: item.id,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className="out-of-stock">Out...</div>
                  )}
                </div>
                <button
                  className="wishListBtn"
                  onClick={() => toggleWhishList(item.id)}
                >
                  {WishList[item.id] > 0 ? (
                    <FaHeart size={20} color="red" />
                  ) : (
                    <CiHeart size={24} />
                  )}
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Trending;
