import React from "react";
import "./footer.css";
import { FaFacebookSquare, FaPhone, FaWhatsapp } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { IoLocation } from "react-icons/io5";
const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer-body">
          <div className="footer_disc">
            <p className="footer-header ">Meal Section</p>
            <p className="written">
              MealSection ensures a delightful culinary experience with a
              diverse menu and a user-friendly platform for easy ordering.
            </p>
          </div>

          <div className="loc my-3">
            <div
              className="fw-bold fs-4"
              style={{
                fontFamily: "Inter, sans-serif",
              }}
            >
              Navigation
            </div>
            <div className="mt-3">Home</div>
            <div>wish list</div>
            <div>cart</div>
            <div>about us</div>
          </div>
          <div className="loc">
            <div className="fw-bold fs-4">Information</div>
            <div className="mt-2">
              <FaPhone />
              :+2347013234960
            </div>
            <div>
              <CiMail />: mealsection@gmail.com
            </div>
            <div>
              <IoLocation />: Faith City, Ketu Adie-Owe, Lusada – Igbesa, Ogun
              State, Nigeria.
            </div>
          </div>
        </div>
        <div className="copy-write my-5">
          © 2024 MealSection .All Rights Reserved. Powered by Favour
        </div>
        <div className="iconsbdy">
          <FaFacebookSquare className="icons-itm" />
          <FaInstagramSquare className="icons-itm" />
          <FaWhatsapp className="icons-itm" />
          <FaPhone className="icons-itm" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
