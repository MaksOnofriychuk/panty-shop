import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSortBy } from "../../redux/actions/filtersAction";
import "./sortPopup.scss";

const SortPopup = () => {
  const dispatch = useDispatch();

  const { sortBy } = useSelector((state) => state.product);

  const sortItems = [
    { id: 1, type: "cheap", name: "от дорогих к дешовым", order: "desc" },
    { id: 2, type: "expensive", name: "от дешовых к дорогим", order: "asc" },
  ];

  const handleSort = (types, orders) => {
    const sortObj = {
      types,
      orders,
    };
    dispatch(setSortBy(sortObj));
  };

  console.log(sortBy);

  return (
    <div className="sort__popup">
      <ul>
        {sortItems.map((item) => (
          <li
            className={sortBy === item.type ? "active" : ""}
            onClick={() => handleSort(item.type, item.order)}
            key={item.id}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortPopup;
