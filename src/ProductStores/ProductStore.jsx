import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import "./ProductStore.css";
import { RiArrowRightSLine } from "react-icons/ri";
import axios from "axios";
import Items from "../Items/Items";
import Trending from "../Trending/Trending";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const ProductStore = ({ Store }) => {
  const [category, setCategory] = useState("All");
  const [loader, SetLoader] = useState(false);
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Page state
  const productPerPage = 10; // Set how many products per page

  // Fetch all products
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
      if (newProduct.vendor === Store) {
        if (category === "All" || newProduct.category === category) {
          setProduct((prevProducts) => [...prevProducts, newProduct]);
        }
      }
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
  }, [category, Store]);

  // Pagination and Filter Logic
  const filteredProducts = product.filter((item) =>
    category === "All"
      ? item.vendor === Store
      : item.vendor === Store && item.category === category
  );

  // Reset page to 1 when category or store changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, Store]);

  // Calculate total products for current page
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // Change page
  };

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Nav />
      <div className="Body">
        <div className="breadcrumb-container">
          <div className="bread-crumbs_content">
            <div className="Description">
              {" "}
              What would you like
              <div className="description-other-text">to order</div>{" "}
            </div>
            <div style={{ fontSize: 16, fontWeight: "500" }}>
              Home <RiArrowRightSLine /> Vendors <RiArrowRightSLine /> {Store}
            </div>
          </div>
        </div>
        <div className="explore">
          <div className="explore-header">🎉Explore Popular Product</div>
        </div>
        <div className="Popular-container">
          <Trending Store={Store} />
        </div>
        <div className="category-type-container">
          <div style={{ position: "relative" }}>
            <div className="Product_SUbhead text-center">
              {Store} {""} product
            </div>
            <div className="Our-Product-head">Our Product</div>
          </div>
          <div className="category-type my-3">
            <div
              className={
                category === "All"
                  ? "category-type-item-active"
                  : "category-type-item"
              }
              onClick={() => setCategory("All")}
            >
              All
            </div>
            <div
              className={
                category === "Carbohydrate"
                  ? "category-type-item-active"
                  : "category-type-item"
              }
              onClick={() => setCategory("Carbohydrate")}
            >
              Carbohydrate
            </div>
            <div
              className={
                category === "Drink"
                  ? "category-type-item-active"
                  : "category-type-item"
              }
              onClick={() => setCategory("Drink")}
            >
              Drinks
            </div>
            <div
              className={
                category === "junks"
                  ? "category-type-item-active"
                  : "category-type-item"
              }
              onClick={() => setCategory("junks")}
            >
              Pastries & junks
            </div>
            <div
              className={
                category === "Protein"
                  ? "category-type-item-active"
                  : "category-type-item"
              }
              onClick={() => setCategory("Protein")}
            >
              Proteins
            </div>
          </div>
        </div>
        {loader ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="products">
            <div className="our-product-container mt-3">
              {currentProduct.length === 0 ? (
                <>No product found</>
              ) : (
                currentProduct.map((item) => (
                  <Items
                    key={item.id}
                    Pname={item.Pname}
                    price={item.price}
                    image={item.image}
                    id={item.id}
                    availability={item.availability}
                  />
                ))
              )}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-container">
              {pageNumbers.map((number) => (
                <div
                  key={number}
                  className={`page-item ${
                    number === currentPage ? "active" : ""
                  }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductStore;
