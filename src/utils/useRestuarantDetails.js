import { useEffect, useState } from "react";

const useRestuarantDetails = (id) => {
  const [restuarantInfo, setRestaurantInfo] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState(null);

  useEffect(() => {
    getRestaurantDetails();
  }, []);

  const getRestaurantDetails = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9715987&lng=77.5945627&restaurantId=" +
        id +
        "&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data?.json();
    setRestaurantInfo(json?.data?.cards?.[2]?.card?.card?.info);
    setRestaurantMenu(
      json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    );
  };

  return [restuarantInfo, restaurantMenu];
};

export default useRestuarantDetails;