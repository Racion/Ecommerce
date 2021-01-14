import React, { useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { getReviews } from "../../Redux/Action/reviewActions.js";
import { useDispatch, useSelector } from "react-redux";

const Ratings = ({ productId }) => {
  const dispatch = useDispatch();
  const califications = useSelector((state) => state.review.reviews);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const reviewsFiltered = califications.filter(
    (c) => c.productId === productId
  );

  const prom =
    reviewsFiltered.reduce((acc, count) => {
      return acc + count.value;
    }, 0) / reviewsFiltered.length;
  const rating = parseFloat(prom.toFixed(2));

  return (
    <div>
      <Rating
        name="read-only"
        value={rating}
        precision={0.1}
        readOnly
        icon={<SportsEsportsIcon fontSize="inherit" />}
        style={{ color: "#1d7bff" }}
      />
    </div>
  );
};

export default Ratings;
