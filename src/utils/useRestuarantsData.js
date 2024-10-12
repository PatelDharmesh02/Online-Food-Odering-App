import { useState, useEffect } from "react";
import { RESTUARANTS_DATA_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantsData } from "../redux/restaurantsSlice";

const useRestuarantsData = () => {
  const [allRestuarants, setAllRestuarants] = useState([]);
  const restaurantsData = useSelector(state => state.restaurants.restaurantsData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurantsData && restaurantsData.length > 0) {
      setAllRestuarants(restaurantsData);
    } else {
      getRestaurants();
    }
  }, []);

  async function getRestaurants() {
    const data = await fetch("http://localhost:5000/restaurants");
    const restros = await data.json();
    debugger
    setAllRestuarants(restros);
    dispatch(updateRestaurantsData(restros));
  }

  return allRestuarants;
};

export default useRestuarantsData;