import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";
import useRestuarantDetails from "../utils/useRestuarantDetails";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurantInfo, restaurantMenu] = useRestuarantDetails(id);

  return restaurantInfo ? (
    <div className="md:flex bg-slate-200 p-6 m-4 rounded-md gap-20 shadow-inner">
      <div className="mb-6 md:mb-0 flex flex-col items-center gap-5 min-w-80">
        <h1 className="font-bold text-xl">{restaurantInfo?.name}</h1>
        <img
          className="w-80 h-80 rounded-md"
          src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId}
        />
        <h3 className="font-bold text-md">{restaurantInfo?.areaName} </h3>
        <h3 className="font-bold text-md">{restaurantInfo?.city} </h3>
        <h3 className="font-bold text-md">{restaurantInfo?.avgRating} Stars</h3>
        <h3 className="font-bold text-md">
          {restaurantInfo?.costForTwoMessage}
        </h3>
      </div>
      <div className="flex gap-10 flex-wrap">
        {restaurantMenu
          ?.filter((item) => item.card.card.title !== undefined)
          .map((menu, index) => {
            const title = menu?.card?.card?.title;
            const items = menu?.card?.card?.itemCards;
            return (
              title &&
              items && (
                <div key={index} className="flex flex-col gap-3">
                  <h4 className="font-semibold text-md">{title}</h4>
                  <div key="items">
                    {items.map((item, idx) => {
                      return <li key={idx}>{item.card.info.name}</li>;
                    })}
                  </div>
                </div>
              )
            );
          })}
      </div>
    </div>
  ) : (
    <Shimmer name="menuPage" />
  );
};

export default RestaurantDetails;
