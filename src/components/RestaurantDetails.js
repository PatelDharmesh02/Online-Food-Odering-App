import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState(null);

  useEffect(() => {
    getRestuarantInfo();
  }, []);

  const getRestuarantInfo = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId="+id+"&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    setRestaurantInfo(json.data.cards[0].card.card.info);
    setRestaurantMenu(
      json.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards
    );
  };


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
        <h3>Restaurant Menu:</h3>
      </div>
      <hr/>
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
