import { useEffect, useState } from "react";

const useRestuarantDetails = (id) => {
  const [restuarantInfo, setRestaurantInfo] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState(null);

  useEffect(() => {
    const getRestaurantDetails = async () => {
      const data = await fetch(
        process.env.REACT_APP_RESTUARANT_DETAILS_URL + id
      );
      const json = await data?.json();
      const restroInfo = json?.info;
      const restroMenu = json?.menu;
      setRestaurantInfo(restroInfo);
      setRestaurantMenu(restroMenu);
    };
    getRestaurantDetails();
  }, []);

  return [restuarantInfo, restaurantMenu];
};

export default useRestuarantDetails;
