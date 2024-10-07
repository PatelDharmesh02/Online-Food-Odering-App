import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRestaurantsDetails } from "../redux/restaurantsSlice";
import { RESTUARANT_DETAILS_URL } from "../constants";

const useRestuarantDetails = (id) => {
  const [restuarantInfo, setRestaurantInfo] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState(null);
  const restaurantsDetails = useSelector(
    (state) => state.restaurants.restaurantsDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurantsDetails.hasOwnProperty(id)) {
      setRestaurantInfo(restaurantsDetails[id].info);
      setRestaurantMenu(restaurantsDetails[id].menu);
    } else {
      getRestaurantDetails();
    }
  }, []);

  const getRestaurantDetails = async () => {
    const data = await fetch(RESTUARANT_DETAILS_URL + id);
    const json = await data?.json();
    const restroInfo = json?.info;
    const restroMenu = json?.menu;
    setRestaurantInfo(restroInfo);
    setRestaurantMenu(restroMenu);
    let payload = {};
    payload[id] = {
      info: restroInfo,
      menu: restroMenu,
    };
    dispatch(updateRestaurantsDetails({ ...restaurantsDetails, ...payload }));
  };

  return [restuarantInfo, restaurantMenu];
};

export default useRestuarantDetails;
