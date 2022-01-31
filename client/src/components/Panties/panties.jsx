import React, { useEffect } from "react";
import Card from "../Card/card";
import Button from "../Button/button";
import SkeletonLoader from "../Loader/skeletonLoader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchMorePanties, fetchPanties } from "../../redux/panties";
import "./panties.scss";

const Panties = () => {
  
  const dispatch = useDispatch();

  const { loading, panties, visibleProductCount } = useSelector(
    (state) => state.panties
  );

  useEffect(() => {
    dispatch(fetchPanties());
  }, [dispatch]);

  const handleMoreProduct = () => {
    dispatch(fetchMorePanties(6));
  };

  const paginatedPanties = panties.slice(0, visibleProductCount);

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
        <Button
          onClick={handleMoreProduct}
          className="button button--add button--more"
        >
          Показать еще
        </Button>
      </div>
    </>
  );
};

export default Panties;
