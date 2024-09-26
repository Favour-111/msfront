import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { FaArrowLeftLong, FaMinus, FaPlus } from "react-icons/fa6";
import Nav from "../Nav/Nav";
import { ContextApi } from "../ShopContext/ShopContext";
import { FiTrash2 } from "react-icons/fi";
import { TbCurrencyNaira } from "react-icons/tb";
import img from "../assets/no-product.png";
import axios from "axios";
import swal from "sweetalert";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function Cart() {
  const Navigate = useNavigate();
  //all-product state
  const [all_product, setProduct] = useState([]);
  const [loader, SetLoader] = useState(false);
  const getALlProduct = async () => {
    try {
      SetLoader(true);
      const response = await axios.get(`http://localhost:5000/getalProducts`);
      if (response) {
        setProduct(response.data.response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      SetLoader(false);
    }
  };

  useEffect(() => {
    getALlProduct();
  }, []);
  const { cartItms, addToCart, Remove, deleteCart, getTotalValue } =
    useContext(ContextApi);
  const [packselect, setPack] = useState("Small");
  const [price, setPrice] = useState(100);
  const cartProducts = all_product.filter((itm) => cartItms[itm.id] > 0);
  const serviceFee = Math.floor(0.1 * (getTotalValue() + price));
  const total = Math.floor(300 + price + getTotalValue() + serviceFee);
  let today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  // Update price based on selected size
  const handleSelect = (e) => {
    const size = e.target.value;
    setPack(size);
    if (size === "Small") {
      setPrice(100);
    } else if (size === "Big") {
      setPrice(200);
    }
  };
  const CheckOut = () => {
    const vendors = cartProducts.map((product) => product.vendor);
    const uniqueVendors = [...new Set(vendors)]; // Get unique vendors
    console.log(uniqueVendors);

    if (uniqueVendors.length === 1) {
      // All products have the same vendor
      // Navigate to the checkout page
      Navigate("/Order_payment", {
        //passing reciptId amd PackPrice as Props
        state: {
          receiptID: Date.now(),
          PackPrice: price,
          total: total,
          cartItem: cartProducts,
          vendor: uniqueVendors,
        },
      }); // You can replace this with your checkout page path
    } else {
      // Show error message
      swal({
        title: "Error!",
        text: "Orders from multiple vendors cannot be placed simultaneously",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <Nav />
      <div className="pageBody">
        <div>
          <div
            className="badger mb-3 px-3"
            onClick={() => {
              window.history.back();
            }}
          >
            <MdOutlineKeyboardArrowLeft size={30} />
          </div>
          <div className="orderbody">
            <div>
              Your Order <div className="YourOrder"></div>
            </div>
            <div>
              Checkout <div className="YourOrder2"></div>
            </div>
          </div>
          <div className="details">Order Summary</div>
          <div className="px-5 pt-3">
            <div>
              <button
                className="btn  continue py-2"
                onClick={() => {
                  window.history.back();
                }}
              >
                Continue Shopping
              </button>
              <br />
              <select
                name="packSize"
                className="form-select w-50 mt-4"
                value={packselect}
                onChange={handleSelect}
              >
                <option value="Small">Small</option>
                <option value="Big">Big</option>
              </select>
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
          <div className="cart-ItmBody">
            <div className="ordersummary">
              {cartProducts.length > 0 ? (
                cartProducts.map((itm) => (
                  <div key={itm.id} className="">
                    <div className="cartItms">
                      <div className="img d-flex">
                        <img
                          src={`http://localhost:5000/uploads/${itm.image}`}
                          alt={itm.Pname}
                        />
                        <div className="ms-3">
                          <div className="name">{itm.Pname}</div>
                          <div className="ms-1 totalPrice">
                            <TbCurrencyNaira />
                            {Math.floor(itm.price * cartItms[itm.id])}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="delete"
                          onClick={() => deleteCart(itm.id)}
                        >
                          <FiTrash2 color="red" />
                        </div>
                        <div className="counter-container2">
                          <div onClick={() => addToCart(itm.id)}>
                            <FaPlus size={10} />
                          </div>
                          <div className="counter2">{cartItms[itm.id]}</div>
                          <div onClick={() => Remove(itm.id)}>
                            <FaMinus size={10} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-products text-center mt-5">
                  <img src={img} alt="" width={150} />
                  <br />
                  No products found in your cart.
                </div>
              )}
            </div>
            <div className="recipt">
              <p className="text-uppercase">
                thank you for choosing mealsection
              </p>
              <div>Receipt ID:{Date.now()}</div>
              <div className="my-4">Date :{date}</div>
              <hr />
              <div className="">
                Item Total : <TbCurrencyNaira />
                {Math.floor(getTotalValue())}
              </div>
              <hr />
              <div className="delivery-fee">
                Delivery Fee : <TbCurrencyNaira />
                {300}
              </div>

              <hr />
              <div className="delivery-fee">
                Pack Price : <TbCurrencyNaira />
                {price}
              </div>
              <hr />
              <div className="delivery-fee">
                Service Fee : <TbCurrencyNaira />
                {serviceFee}
              </div>

              <hr />
              <div className="sub-total">
                Sub Total : <TbCurrencyNaira />
                {total}
              </div>
              <button className="checkout" onClick={() => CheckOut()}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
