import React, { useEffect, useRef, useState } from "react";
import SortArrov from "../../assets/img/sort-arrov.svg";
import SortPopup from "../SortPopup/sortPopup";
import "./sort.scss";

const Sort = () => {
  const [visiblePopup, setVisiblePopup] = useState(false);

  const popupRef = useRef();

  const handleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const handleClick = (e) => {
    if (!e.path.includes(popupRef.current)) {
      setVisiblePopup(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClick);
  }, []);

  return (
    <div ref={popupRef} className="sort">
      <div className="sort__label">
        <img
          className={visiblePopup ? "rotated" : ""}
          width="10"
          height="6"
          src={SortArrov}
          alt="sort-arrov"
        ></img>
        <b>Сортировка по:</b>
        <span onClick={handleVisiblePopup}>цене</span>
      </div>
      {visiblePopup ? <SortPopup /> : null}
    </div>
  );
};

export default Sort;
