import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Carousel } from "react-carousel-minimal";
import Button from "../../components/Button/button";
import { useDispatch } from "react-redux";
import { fetchPantyById } from "../../redux/panties";
import { SIZES } from "../../utils/constants";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { addProductToCart } from "../../redux/cart";
import Promotion from "../../components/Promotion/promotion";
import classNames from "classnames";
import "./panty.scss";

const Panty = () => {
  const dispatch = useDispatch();

  const params = useParams();

  const [errorSize, seterrorSize] = useState(false);

  const { id: pantyId } = params;

  const [activeSizeIndex, setActiveSize] = useState(null);

  const { panty } = useSelector((state) => state.panties);

  useEffect(() => {
    dispatch(fetchPantyById(pantyId));
  }, [dispatch, pantyId]);

  let caruselImages = [];

  panty && panty.photos.forEach((image) => caruselImages.push({ image }));

  const onSizeSelect = (index) => {
    setActiveSize(index);
  };

  const handleAddToCart = () => {
    const prodCart = {
      id: panty._id,
      name: panty.name,
      size: SIZES[activeSizeIndex],
      price: panty.price,
      img: panty.photos[0],
      code: panty.code,
    };
    if (!prodCart.size) {
      seterrorSize(true);
      return;
    } else {
      seterrorSize(false);
      dispatch(addProductToCart(prodCart));
    }
  };

  return (
    <div className="container">
      <Promotion />
      <div className="product__wrapper">
        {panty ? (
          <>
            <div className="product__left">
              <div className="product__slider">
                <div>
                  <Carousel
                    data={caruselImages}
                    time={5000}
                    width="800px"
                    height="600px"
                    radius="10px"
                    slideNumber={true}
                    slideNumberStyle={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                    dots={true}
                    pauseIconSize="40px"
                    slideBackgroundColor="darkgrey"
                    slideImageFit="cover"
                    thumbnails={true}
                    thumbnailWidth="120px"
                    thumbnailHeight="60px"
                    className="card__left-carusel"
                  />
                </div>
              </div>
            </div>

            <div className="product__right">
              <div className="product__title">
                <h2>Трусики - {panty.name}</h2>
              </div>

              <div className="product__selector">
                <ul>
                  {SIZES.map((s, index) => (
                    <li
                      className={classNames({
                        active: activeSizeIndex === index,
                        disabled: !panty.size.includes(s),
                      })}
                      onClick={() => onSizeSelect(index)}
                      key={index}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* <div className="product__description">
                <span>Цвета:</span>
                {panty.tags.map((tag) => (
                  <div key={new Date() + Math.random()}>
                    <span>{tag}</span>
                  </div>
                ))}
              </div> */}

              <div className="product__dimensional">
                <span>Размерный ряд:</span>
                <ul>
                  <li>XS - 81 - 86 см</li>
                  <li>S - 87 - 92 см</li>
                  <li>M - 93 - 97 см</li>
                  <li>L - 98 - 105 см</li>
                </ul>
              </div>

              <div className="product__price">
                <span>Цена: {panty.price} грн</span>
              </div>

              {errorSize ? (
                <div className="error__size">
                  <span className="error__size-text">Размер не выбран</span>
                </div>
              ) : null}

              <Button
                onClick={handleAddToCart}
                className="button button--outline button--add button-fullwidth"
              >
                <span>Добавить</span>
              </Button>
              <Link
                to="/"
                className="button button--outline button--add button-fullwidth"
              >
                <span>Вернуться назад</span>
              </Link>
            </div>
          </>
        ) : (
          <div>
            <div className="panty__loading">
              <h2 className="panty__loading-title">Loading...</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Panty;
