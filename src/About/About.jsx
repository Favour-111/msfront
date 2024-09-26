import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import "./About.css";
import { CiPlay1 } from "react-icons/ci";
import Footer from "../footer/Footer";
import background from "../images/Background.jpg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
const About = () => {
  //getting review state
  const [review, setReview] = useState([]);
  //loader state
  const [loader, setLoader] = useState(false);
  const getAllReviews = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "https://mernback-1-221g.onrender.com/allReivew"
      );
      setReview(response.data.message);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getAllReviews();
  }, []);
  return (
    <div>
      <Nav />
      <div className="PageBody">
        <div className="Image-Background">
          <div className="overlayBackground">
            <div className="welcome-logo">Welcome to MealSection</div>
            <div className="about-header-content">
              Enjoy Quick Delivery with
              <br />
              Meal-Section
            </div>
            <div className="instructional-Video-Icon">
              <CiPlay1 />
            </div>
          </div>
        </div>
        <div className="about-offer">
          <div className="about-offer-content">
            <div className="about-offer-head">
              Here at MealSection we Provide the best delivery service in
              Crawford University
            </div>
            <div className="about-offer-content ">
              <div className="about-offer-items">
                <IoMdCheckmarkCircleOutline color="green" />
                Enjoy fast and reliable delivery
              </div>
              <div className="about-offer-items">
                <IoMdCheckmarkCircleOutline color="green" />
                Easy to use
              </div>
            </div>
          </div>
          <div className="about-offer-images-container d-md-flex d-sm-block gap-5">
            <div className="about-offer-items-cont">
              <img
                src="https://cdn.shopify.com/s/files/1/1246/6441/files/Vendor_sourcing.jpg?v=1644447534"
                alt=""
                className="about-offer-items-image"
              />
              <div className="about-offer-items-content">
                <div className="d-flex align-items-center justify-content-center text-center mt-5 ">
                  <div>
                    10+
                    <br />
                    Vendors
                  </div>
                </div>
              </div>
            </div>
            <div className="about-offer-items-cont">
              <img
                src="https://cdn.shopify.com/s/files/1/1246/6441/files/Vendor_sourcing.jpg?v=1644447534"
                alt=""
                className="about-offer-items-image"
              />
              <div className="about-offer-items-content">
                <div className="d-flex align-items-center justify-content-center text-center mt-5 ">
                  <div>
                    10+
                    <br />
                    Vendors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="our-mission-container">
          <div>
            <img src={background} alt="" className="our-mission-img" />
          </div>
          <div className="our-mission-content">
            <div className="our-mission-head">Our Mission</div>
            <div className="our-mission-note">
              Mealsection was developed to address the unique dining needs of
              students and staff at Crawford University. We recognized that
              campus life often makes it challenging to access a variety of meal
              options conveniently and affordably. Our goal is to simplify meal
              delivery by offering a seamless service that brings a range of
              food choices directly to your hostel or campus area. Additionally,
              Mealsection aims to support the university community by providing
              employment opportunities for students, helping them earn an income
              while balancing their academic responsibilities. By connecting
              students with local vendors and ensuring timely deliveries,
              Mealsection enhances the campus dining experience and contributes
              to the overall well-being of the university community.
            </div>
          </div>
        </div>
        <div className="feed-back-container">
          <div className="header">
            <div className="feed_Back_SUbhead">Feed-Backs</div>
            <div className="feed-back-header">Customer Feedback💛</div>
          </div>
          <div
            className="p-5"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              gap: 30,
              overflow: "scroll",
              scrollbarWidth: "none",
            }}
          >
            {loader ? (
              <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              review.map((item) => {
                return (
                  <div className="feed-backs shadow-sm rounded p-3">
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <FaUserCircle color="#787878" size={60} />
                      <div>
                        <div className="user-feedback-name">{item.name}</div>
                        <div className="user-feedback-category">Student</div>
                      </div>
                    </div>
                    <div className="feed-back-content mt-4">{item.Content}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
