import axios from "axios";
import { useEffect, useState } from "react";

const useRestuarantDetails = (id) => {
  const [restuarantInfo, setRestaurantInfo] = useState(null);
  const [restaurantMenu, setRestaurantMenu] = useState(null);

  useEffect(() => {
    const getRestaurantDetails = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_RESTUARANT_DETAILS_URL + id
      );
      const restroInfo = data?.info;
      const restroMenu = data?.menu;
      setRestaurantInfo(restroInfo);
      setRestaurantMenu(restroMenu);
    };
    getRestaurantDetails();
  }, []);

  return [restuarantInfo, restaurantMenu];
};

export default useRestuarantDetails;
