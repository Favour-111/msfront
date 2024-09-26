import React, { useState } from "react";
import "./VendorPage.css";
import { CiLock } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Vendors from "../Vendors/Vendors";

const VendorLogin = () => {
  const router = useNavigate();
  // form state
  const [login, setLogin] = useState("");

  const handleInput = (e) => {
    setLogin(e.target.value);
  };

  // comparing password
  const handleSubmit = (e) => {
    e.preventDefault();

    if (login === "") {
      toast.error("Input is required");
    } else {
      // Find the vendor that matches the password
      const vendor = Vendors.find(
        (vendor) =>
          vendor.name.toLocaleLowerCase() === login.toLocaleLowerCase()
      );

      if (vendor) {
        // Navigate to the vendor's page based on their name or path
        router(`/Admin/${vendor.name}`);
      } else {
        toast.error("Invalid login");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="vendor-login-head">Vendor Login</div>
        <div className="vendor-login-container shadow-sm">
          <form onSubmit={handleSubmit}>
            <label>Password</label>
            <div className="d-flex align-items-center gap-2 form-input">
              <CiLock size={20} />
              <input
                type="password"
                placeholder="Input Vendor Password..."
                name="password"
                onChange={handleInput}
              />
            </div>
            <button className="Vendor-login-submit" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VendorLogin;
