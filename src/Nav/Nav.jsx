import React, { useEffect, useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Nav.css";
import { IoClose, IoHeartOutline } from "react-icons/io5";
//logo import
import logo from "../assets/WhatsApp Image 2024-08-24 at 20.18.12_988ce6f9.jpg";
//importing background
import { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { ContextApi } from "../ShopContext/ShopContext";
import { RiShoppingBag3Line } from "react-icons/ri";
const Nav = () => {
  //date state
  const [time, setTime] = useState(new Date());
  //naav state
  const [IsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // Create an interval that updates the time every second
    const timer = setInterval(() => {
      setTime(new Date()); // Update the time state
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  //use context
  const { totalWishList, totalCartItems } = useContext(ContextApi);
  return (
    <>
      <div className="nav-position_container">
        {/* extra information  */}
        <div className="information d-flex gap-2 ps-3 p-1 ">
          <div className="text-light">
            <FiPhone className="mx-1" />
            {""}
            +234 701 323 4960
          </div>
          <div className="text-light">
            <FiPhone className="mx-1" />
            {""}
            +234 702 521 9103
          </div>
          <div className="text-light">
            <FiMail className="mx-1" size={15} />
            {""}
            <a href="mealsection@gmail.com">Mealsection@gmail.com</a>
          </div>
        </div>
        {/* nav body  */}

        <div className="nav_container shadow-sm">
          <Link to="/store">
            <img src={logo} alt="" />
          </Link>
          {/* navigation item  */}
          <div className="Navigation_Container">
            <ul>
              <li>
                <Link className="Link" to="/store">
                  Home
                </Link>
              </li>

              <li>
                <Link className="Link" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="Link" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="Link" to="/FAQ">
                  FAQ
                </Link>
              </li>
            </ul>
            <Link
              to="/wishList"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IoHeartOutline className="mb-2 " color="red" />
              <div className="Cart_COunt mb-2">{totalWishList()}</div>
            </Link>
            <Link
              to="/cart"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <RiShoppingBag3Line className="mb-2 " color="red" />
              <div className="Cart_COunt mb-2">{totalCartItems()}</div>
            </Link>
            <button className="btn btn-danger">{formatTime(time)}</button>
          </div>
        </div>
      </div>
      {/* nav on a small screen  */}
      <div className="nav-sm">
        <div className="information-sm d-flex gap-2 ps-3 p-1 ">
          <div className="text-light">
            <FiPhone className="mx-1" />
            {""}
            +234 701 323 4960
          </div>
          <div className="text-light">
            <FiPhone className="mx-1" />
            {""}
            +234 702 521 9103
          </div>
          <div className="text-light">
            <FiMail className="mx-1" size={15} />
            {""}
            <a href="mealsection@gmail.com">Mealsection@gmail.com</a>
          </div>
        </div>
        <div className="nav-cont-sm">
          <Link to="/store">
            <img src={logo} className="nav-logo-sm" alt="" />
          </Link>
          <div
            className="hamburger shadow-sm"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <RxHamburgerMenu />
          </div>
        </div>

        <div
          className={
            !IsOpen
              ? "navigation-box-sm shadow"
              : "navigation-box-sm-active shadow"
          }
        >
          <div className="close-btn-cont d-flex align-items-end justify-content-end p-3">
            <div
              className="close-btn shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              <IoClose size={20} />
            </div>
          </div>
          <div className="px-4">
            <img src={logo} className="nav-logo-sm" alt="" />
          </div>
          <div className="Navigation_Container_sm">
            <ul>
              <li>
                <Link className="Link_sm" to="/store">
                  Home
                </Link>
              </li>

              <li>
                <Link className="Link_sm" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="Link_sm" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="Link_sm" to="/FAQ">
                  FAQ
                </Link>
              </li>
              <div>
                <Link to="/cart" className="wishlistandcart">
                  Cart
                  <div className="Cart_COunt-sm mb-2">{totalCartItems()}</div>
                </Link>
                <Link to="/wishlist" className="wishlistandcart">
                  WishList
                  <div className="Cart_COunt-sm mb-2">{totalWishList()}</div>
                </Link>
              </div>

              <button className="btn btn-danger">{formatTime(time)}</button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
