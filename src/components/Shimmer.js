import React from "react";
import RestaurantCard from "./RestuarantCard";

const Shimmer = () => {
  const array = new Array(20);
  array.fill(1);
  return (
    <div className="restaurants">
      {array.map((arr, index) => {
        return <div key={index} className="shimmer"></div>;
      })}
    </div>
  );
};

export default Shimmer;
