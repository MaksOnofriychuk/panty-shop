import React from "react";
import Panties from "../../components/Panties/panties";
import Promotion from "../../components/Promotion/promotion";
import Categories from "../../components/Categories/categories";
import "./home.scss";

const Home = () => {
  return (
    <div className="container">
      <div className="content__top">
        {/* <Categories /> */}
        {/* <Sort /> */}
      </div>
      <Promotion />
      <p className="sub__promotion">
        по условиям этой акции цвет идёт на наше усмотрение
      </p>
      <h2 className="content__title">Все трусики</h2>
      <Panties />
    </div>
  );
};

export default Home;
