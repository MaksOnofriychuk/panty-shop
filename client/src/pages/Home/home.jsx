import React from "react";
import Panties from "../../components/Panties/panties";
import "./home.scss";

const Home = () => {
  return (
    <div className="container">
      <div className="content__top">
        {/* <Categories /> */}
        {/* <Sort /> */}
      </div>
      <h2 className="content__title">Все трусики</h2>
      <Panties />
    </div>
  );
};

export default Home;
