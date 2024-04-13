import { useState, useEffect } from "react";
import { RESTUARANT_DATA_URL } from "../constants";

const useRestuarantsData = () => {
  const [allRestuarants, setAllRestuarants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(RESTUARANT_DATA_URL);
    const json = await data.json();
    const restros =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setAllRestuarants(restros);
  }

  return allRestuarants;
};

export default useRestuarantsData;