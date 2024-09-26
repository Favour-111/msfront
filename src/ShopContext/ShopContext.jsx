import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const getCartItem = () => {
  let cart = {};
  for (let i = 1; i < 400 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
const getWishList = () => {
  let List = {};
  for (let i = 1; i < 400 + 1; i++) {
    List[i] = 0;
  }
  return List;
};

export const ContextApi = createContext(null);
const ShopContext = (props) => {
  //product state
  const [all_product, setProduct] = useState([]);
  const getALlProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getalProducts`);
      if (response) {
        setProduct(response.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getALlProduct();
  }, []);
  const [cartItms, setCartItms] = useState(getCartItem());
  const [WishList, setWishList] = useState(getWishList());

  const addToCart = (itemId) => {
    setCartItms((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  const Remove = (itemId) => {
    setCartItms((prev) => ({
      ...prev,
      [itemId]: Math.max(0, prev[itemId] - 1),
    }));
  };
  const addtowishList = (itemId) => {
    setWishList((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  const RemoveList = (itemId) => {
    setWishList((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
  };
  const totalCartItems = () => {
    let total = 0;
    for (const cart in cartItms) {
      if (cartItms[cart] > 0) {
        total += cartItms[cart];
      }
    }
    return total;
  };
  //total wishList items
  const totalWishList = () => {
    let total = 0;
    for (const itm in WishList) {
      if (WishList[itm] > 0) {
        total += WishList[itm];
      }
    }
    return total;
  };
  const deleteCart = (itemId) => {
    setCartItms((prev) => ({ ...prev, [itemId]: 0 }));
  };
  const getTotalValue = () => {
    let totalAmount = 0;
    for (const item in cartItms) {
      if (cartItms[item] > 0) {
        let totalValue = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += totalValue.price * cartItms[item];
      }
    }
    return totalAmount;
  };

  const values = {
    cartItms,
    WishList,
    addtowishList,
    RemoveList,
    totalCartItems,
    setCartItms,
    addToCart,
    Remove,
    deleteCart,
    getTotalValue,
    totalWishList,
  };
  return (
    <ContextApi.Provider value={values}>{props.children}</ContextApi.Provider>
  );
};

export default ShopContext;