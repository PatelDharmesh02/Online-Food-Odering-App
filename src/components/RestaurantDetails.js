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
    <div className="restaurant-details">
      <div className="restaurant-info">
        <h1>{restaurantInfo?.name}</h1>
        <img
          className="restaurant-details-image"
          src={IMG_CDN_URL + restaurantInfo?.cloudinaryImageId}
        />
        <h3>{restaurantInfo?.areaName} </h3>
        <h3>{restaurantInfo?.city} </h3>
        <h3>{restaurantInfo?.avgRating} Stars</h3>
        <h3>{restaurantInfo?.costForTwoMessage}</h3>
      </div>
      <hr/>
        <h2>Restaurant Menu:</h2>
      <div className="restaurant-menu">
        {restaurantMenu
          .filter((item) => item.card.card.title !== undefined)
          .map((menu, index) => {
            return (
              <div key={index}>
                <h4>{menu.card.card.title}</h4>
                {menu?.card?.card?.itemCards?.map((item, idx) => {
                  return <li key={idx}>{item.card.info.name}</li>;
                })}
              </div>
            );
          })}
      </div>
    </div>
  ) : (<Shimmer />)
};

export default RestaurantDetails;