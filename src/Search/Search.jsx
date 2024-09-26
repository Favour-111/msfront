import React, { useContext, useState } from "react";
import "./Search.css";
import Nav from "../Nav/Nav";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Items from "../Items/Items";
import all_product from "../All_Product/all_product";
import Recent from "../RecentItm/Recent";
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { ContextApi } from "../ShopContext/ShopContext";
function Search() {
  const RecentProduct = all_product.slice(0, 8);
  const { WishList, addtowishList, RemoveList } = useContext(ContextApi);
  const [isOpen, SetIsOpen] = useState(false);
  const [input, SetInput] = useState("");
  console.log(input);

  return (
    <div>
      <Nav />
      <div className="Search_Container">
        <div className="Description">Find anything in MealSection</div>
        <div className="input-container">
          <div>
            <div></div>
            <input
              placeholder="i am looking for..."
              id="disabledInput"
              className="input_box shadow-sm form-control"
              onChange={(e) => {
                SetInput(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="Category">
        <div className="Category_container">
          <div className="category_Items">
            <div className="d-flex align-items-center gap-3">
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8TCne_TOJzZy3BVCiRQVKwWB3n15DjJa1g&s"
                  alt=""
                />
              </div>
              <div>
                <div>Drinks</div>
                <div className="opacity-50">200 added</div>
              </div>
            </div>
            <div>
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="category_Items">
            <div className="d-flex align-items-center gap-3">
              <div>
                <img
                  src="https://static01.nyt.com/images/2019/09/25/dining/23eggrex2/23eggrex2-superJumbo.jpg"
                  alt=""
                />
              </div>
              <div>
                <div>Proteins</div>
                <div className="opacity-50">150 added</div>
              </div>
            </div>
            <div>
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="category_Items">
            <div className="d-flex align-items-center gap-3">
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPu-NoRIk6h03p5DPBDYL8V8VQHgYqpbaBQ&s"
                  alt=""
                />
              </div>
              <div>
                <div>pastries</div>
                <div className="opacity-50">150 added</div>
              </div>
            </div>
            <div>
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="category_Items">
            <div className="d-flex align-items-center gap-3">
              <div>
                <img
                  src="https://www.onceuponachef.com/images/2014/10/jasmine-rice-1.jpg"
                  alt=""
                />
              </div>
              <div>
                <div>cabohydrates</div>
                <div className="opacity-50">120 added</div>
              </div>
            </div>
            <div>
              <MdKeyboardArrowRight />
            </div>
          </div>
          <div className="category_Items">
            <div className="d-flex align-items-center gap-3">
              <div>
                <img
                  src="https://theperfecttide.com/wp-content/uploads/2022/06/DSC_5536-1-scaled.jpg"
                  alt=""
                />
              </div>
              <div>
                <div>junk food</div>
                <div className="opacity-50">110 added</div>
              </div>
            </div>
            <div>
              <MdKeyboardArrowRight />
            </div>
          </div>
        </div>

        {/* Trending */}
        <div className="Recent_Product">
          <div className="head ms-2">Recent-Product</div>
          <div className="Recent_Product_container">
            <div className="Recent_Items ">
              {
                /* <Items />
                 */
                RecentProduct.map((itm) => {
                  if (itm === null) {
                  } else {
                    return (
                      <Recent
                        id={itm.id}
                        title={itm.title}
                        image={itm.image}
                        category={itm.category}
                        description={itm.description}
                      />
                    );
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
