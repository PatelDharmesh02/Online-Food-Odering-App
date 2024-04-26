import React from "react";
import RestaurantCard from "./RestuarantCard";

const Shimmer = ({ name }) => {
  const array = new Array(20);
  array.fill(1);
  switch (name) {
    case "menuPage":
      return (
        <div className="m-4 shadow-inner bg-slate-200 grow-1 h-screen rounded-md animate-pulse"></div>
      );
      break;
    default:
      return (
        <div className="flex flex-wrap gap-5 justify-center">
          {array.map((arr, index) => {
            return (
              <div
                key={index}
                className="w-60 min-h-80 bg-slate-200 shadow-lg rounded-lg animate-pulse"
              ></div>
            );
          })}
        </div>
      );
  }
};

export default Shimmer;
