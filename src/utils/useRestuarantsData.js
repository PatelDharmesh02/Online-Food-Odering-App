import { useState, useEffect } from "react";

const useRestuarantsData = () => {
  const [allRestuarants, setAllRestuarants] = useState([]);

  useEffect(() => {
    async function getRestaurants() {
      const data = await fetch(process.env.REACT_APP_RESTUARANTS_DATA_URL);
      const restros = await data.json();
      setAllRestuarants(restros);
    }
    getRestaurants();
  }, []);

  return allRestuarants;
};

export default useRestuarantsData;
