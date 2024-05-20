import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateRestaurantsDetails } from "../redux/restaurantsSlice";

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
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9621948&lng=77.7115841&restaurantId=" +
        id +
        "&catalog_qa=undefined&isMenuUx4=true&submitAction=ENTER"
    );
    const json = await data?.json();
    const restroInfo = json?.data?.cards?.[2]?.card?.card?.info;
    const restroMenu =
      json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
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
