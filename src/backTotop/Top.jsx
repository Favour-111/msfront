import React, { useEffect, useState } from "react";
import "./Top.css";
import { FiArrowUp } from "react-icons/fi";
const Top = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll smoothly to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div className="Arrow_Container">
      {isVisible && (
        <div className="ArrowBody" onClick={scrollToTop}>
          <FiArrowUp />
        </div>
      )}
    </div>
  );
};

export default Top;
