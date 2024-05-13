import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";
import useRestuarantDetails from "../utils/useRestuarantDetails";
import RestaurantItemCard from "./RestaurantItemCard";
import { useSelector } from "react-redux";

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurantInfo, restaurantMenu] = useRestuarantDetails(id);
  const items = useSelector((store) => store.cart.items);
  const cartItems = new Map();
  items.forEach((item) => cartItems.set(item.id, item.count));

  return restaurantInfo ? (
    <div className="md:flex bg-slate-200 p-6 m-4 rounded-md gap-20 shadow-inner">
      <div className="mb-6 md:mb-0 flex flex-col items-center gap-5 min-w-80">
        <h1 className="font-bold text-2xl">{restaurantInfo?.name}</h1>
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
      <div className="grow">
        {restaurantMenu
          ?.filter((item) => item?.card?.card?.title !== undefined)
          .map((menu, index) => {
            const title = menu?.card?.card?.title;
            const items = menu?.card?.card?.itemCards;
            return (
              title &&
              items && (
                <div key={index}>
                  <h4 className="font-bold text-lg">{title}</h4>
                  <div key="items" className="mb-5">
                    {items
                      .filter(
                        (item) =>
                          item?.card?.info?.price ||
                          item?.card?.info?.finalPrice ||
                          item?.card?.info?.defaultPrice
                      )
                      .map((item, idx) => {
                        let { id } = item.card?.info;
                        if (cartItems.has(id)) {
                          return (
                            <RestaurantItemCard
                              key={idx}
                              {...item.card?.info}
                              count={cartItems.get(id)}
                              alreadyAdded={cartItems.has(id)}
                            />
                          );
                        }
                        return (
                          <RestaurantItemCard key={idx} {...item.card?.info} />
                        );
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
