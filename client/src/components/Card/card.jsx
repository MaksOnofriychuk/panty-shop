import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import Button from "../Button/button";
import { SIZES } from "../../utils/constants";
import "./card.scss";
import { addProductToCart } from "../../redux/cart";

const Card = ({ item }) => {
  const dispatch = useDispatch();

  const [activeSizeIndex, setActiveSize] = useState(null);

  const onSizeSelect = (index) => {
    setActiveSize(index);
  };

  const handleAddToCart = () => {
    dispatch(
      addProductToCart({
        id: item._id,
        name: item.name,
        size: SIZES[activeSizeIndex],
        price: item.price,
        img: item.photos[0],
      })
    );
  };

  return (
    <div className="card-block">
      <Link to={`/panty/${item._id}`}>
        <img
          className="card-block__image"
          src={item.photos[0]}
          alt="one-card"
        />
      </Link>
      <h4 className="card-block__title">Трусики-{item.name}</h4>
      <div className="card-block__selector">
        <ul>
          {SIZES.map((s, index) => (
            <li
              className={activeSizeIndex === index ? "active" : ""}
              onClick={() => onSizeSelect(index)}
              key={index}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-block__bottom">
        <div className="card-block__price">от {item.price} грн</div>
        <Button
          onClick={handleAddToCart}
          className="button button--outline button--add"
        >
          <span>Добавить</span>
        </Button>
      </div>
    </div>
  );
};

export default Card;