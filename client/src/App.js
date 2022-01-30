import React from "react";
import { Route } from "react-router-dom";
import Header from "./components/Header/header";
import Home from "./pages/Home/home";
import Panty  from "./pages/Panty/panty";
import Cart from "./pages/Cart/cart";
import Ordering from "./pages/Ordering/ordering";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route exact path="/" component={Home} />
        <Route path="/panty/:id" component={Panty} />
        <Route path="/cart" component={Cart} />
        <Route path="/ordering" component={Ordering} />
      </div>
    </div>
  );
}

export default App;
