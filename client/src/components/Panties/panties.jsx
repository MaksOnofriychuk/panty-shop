import React, { useEffect, useState } from "react";
import Card from "../Card/card";
// import Button from "../Button/button";
import SkeletonLoader from "../Loader/skeletonLoader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchPanties } from "../../redux/panties";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import "./panties.scss";

const Panties = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const { loading, panties } = useSelector((state) => state.panties);

  useEffect(() => {
    dispatch(fetchPanties());
  }, [dispatch]);

  // const handleMoreProduct = () => {
  //   dispatch(fetchMorePanties(6));
  // };
  const pantiesCount = panties.length;

  const pageSize = 6;

  const pageCount = pantiesCount / pageSize;

  const pages = _.range(1, pageCount + 1);

  const handlePageIndex = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 30);
  };

  const paginatedPanties = paginate(panties, currentPage, pageSize);

  return (
    <>
      <div className="content__items">
        {loading ? (
          <>
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div key={i}>
                  <SkeletonLoader />
                </div>
              ))}
          </>
        ) : (
          paginatedPanties.map((item) => <Card key={item._id} item={item} />)
        )}
      </div>
      <div className="content__button">
        {/* <Button
          onClick={handleMoreProduct}
          className="button button--add button--more"
        >
          Показать еще
        </Button> */}
        <div className="pagin">
          <ul className="ul__pagin">
            {pages.map((page) => (
              <li
                key={page}
                onClick={() => handlePageIndex(page)}
                className={
                  currentPage === page
                    ? "ul__pagin-li active-pagin"
                    : "ul__pagin-li"
                }
              >
                <span>{page}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Panties;
