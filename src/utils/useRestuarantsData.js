import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderState } from "../redux/restaurantsSlice";

const useRestuarantsData = () => {
  const [allRestuarants, setAllRestuarants] = useState([]);
  const dispatch = useDispatch();
  const selectedAddress = useSelector((state) => state.user.selectedAddress);

  useEffect(() => {
    async function getRestaurants() {
      dispatch(setLoaderState(true));
      const { data } = await axios.get(
        process.env.REACT_APP_RESTUARANTS_DATA_URL
      );
      dispatch(setLoaderState(false));
      setAllRestuarants(data);
    }
    getRestaurants();
  }, [selectedAddress]);

  return allRestuarants;
};

export default useRestuarantsData;
