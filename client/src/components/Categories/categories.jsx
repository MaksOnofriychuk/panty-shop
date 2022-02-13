import Button from "../Button/button";
import React, { useState } from "react";
import "./categories.scss";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { setCategory } from "../../redux/actions/filtersAction";

const Categories = () => {
  const [burger, setBurger] = useState(false);

  // const dispatch = useDispatch();

  // const { category } = useSelector((state) => state.product);

  const handleClick = () => {
    setBurger(!burger);
  };
  const closeFilter = () => {
    setBurger(false);
  };

  const categories = ["Все", "Трусики", "Колготки"];

  // const handleClicks = (index, cat) => {
  //   const categoryObj = {
  //     index,
  //     cat,
  //   };
  //   dispatch(setCategory(categoryObj));
  // };

  return (
    <>
      <div className="categories">
        <ul>
          {categories.map((cat, index) => (
            <li
              key={new Date() + Math.random()}
              // className={category.catIndx === index ? "active" : ""}
              // onClick={() => handleClicks(index, cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
      <div className="burger__wrap">
        <div onClick={handleClick} className="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={burger ? "menu active" : "menu"}>
          <div className="menu__title">
            <h3>Вибирете категорию</h3>
            <Button onClick={closeFilter}>X</Button>
          </div>
          <nav>
            <li>
              <Button>Все</Button>
            </li>
            <li>
              <Button>Стринги</Button>
            </li>
            <li>
              <Button>Флипы</Button>
            </li>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Categories;
