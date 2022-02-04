import React, { useEffect } from "react";
import Button from "../../components/Button/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  clearCartItems,
  deleteProductInCart,
  plusCartItem,
  minusCartItem,
  getItems,
} from "../../redux/cart";

import CartBasket from "../../assets/img/cart-basket.svg";
import ClearBasket from "../../assets/img/clear-basket.svg";
import DeleteIcon from "../../assets/img/delete-icon.svg";
import emptyCart from "../../assets/img/empty-cart.png";

import "./cart.scss";
import Promotion from "../../components/Promotion/promotion";

const Cart = () => {
  const dispatch = useDispatch();

  const { items, totalPrice, sellTotalPrice, totalCount } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const addedPizzas = items
    ? Object.keys(items).map((key) => items[key].items[0])
    : [];

  const clearCart = () => {
    if (window.confirm("Вы действительно хотите очистить корзину?")) {
      dispatch(clearCartItems());
    }
  };

  const deleteItem = (id) => {
    if (window.confirm("Вы действительно хотите удалить?")) {
      dispatch(deleteProductInCart(id));
    }
  };

  const handlePlusItem = (id) => {
    dispatch(plusCartItem(id));
  };

  const handleMinusItem = (id) => {
    dispatch(minusCartItem(id));
  };

  return (
    <div className="container container--cart">
      <div className="cart">
        {totalCount > 0 ? (
          <>
            <Promotion />
            <div className="cart__top">
              <h2 className="content__title">
                <img
                  className="cart__top-img"
                  src={CartBasket}
                  alt="cart-basket"
                ></img>
                Корзина
              </h2>
              <div className="cart__clear">
                <img
                  width="20"
                  height="20"
                  src={ClearBasket}
                  alt="clear-basket"
                ></img>

                <span onClick={clearCart}>Очистить корзину</span>
              </div>
            </div>
            <div className="cart__wrap">
              {addedPizzas.map((item) => (
                <div key={item.id} className="cart__item">
                  <div className="cart__item-img">
                    <img src={item.img} alt="трусики" />
                  </div>
                  <div className="cart__wrap-info">
                    <div className="cart__item-info">
                      <h3>трусики: {item.name}</h3>
                      <p>Размер: {item.size}</p>
                    </div>
                    <div className="k">
                      <div className="cart__item-count">
                        <Button
                          onClick={() => handleMinusItem(item.id)}
                          className="button button--outline cart__item-count-minus"
                        >
                          <span className="cart__item-count-minus">-</span>
                        </Button>
                        <b>{items[item.id].items.length}</b>
                        <Button
                          onClick={() => handlePlusItem(item.id)}
                          className="button button--outline cart__item-count-plus"
                        >
                          <span className="cart__item-count-plus">+</span>
                        </Button>
                      </div>
                      <div className="cart__item-price">
                        <b>{items[item.id].totalPrice} грн</b>
                      </div>
                      <div className="cart__item-remove">
                        <Button
                          onClick={() => deleteItem(item.id)}
                          className="button--circle"
                          outline
                        >
                          <img
                            width="10"
                            height="10"
                            src={DeleteIcon}
                            alt="delete-icon"
                          ></img>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart__bottom">
              <div className="cart__bottom-details">
                <span>
                  Всего трусиков: <b>{totalCount} шт.</b>
                </span>

                <span className="cart__details-price">
                  Сумма заказа:&nbsp;
                  {sellTotalPrice ? <b className="old">{totalPrice} </b> : ""}
                  <b>{sellTotalPrice ? sellTotalPrice : totalPrice}</b>
                </span>
              </div>
              <div className="cart__bottom-buttons">
                <Link to="/">
                  <Button className="button button--outline button--add go-back-btn">
                    <span>Вернуться назад</span>
                  </Button>
                </Link>
                <div className="pay-btn">
                  <Link to="/ordering">
                    <Button className="pay">Оплатить сейчас</Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="cart cart--empty">
            <h2>Корзина пустая</h2>
            <p>
              Вероятней всего, вы не заказывали ещё трусики.
              <br />
              Для того, чтобы заказать трусики, перейдите на главную страницу.
            </p>
            <img src={emptyCart} alt="Empty cart" />
            <Link to="/" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
