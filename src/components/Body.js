import RestaurantCard from "./RestuarantCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import { filterData } from "../utils/helper";
import useRestuarantsData from "../utils/useRestuarantsData";
import useStatus from "../utils/useStatus";
import SearchIcon from "../assets/SearchIcon.png";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { logoutUser, setUser } from "../redux/userSlice";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [restuarants, setRestuarants] = useState([]);
  const loader = useSelector((state) => state.restaurants.loader);

  const allRestuarants = useRestuarantsData();
  const isOnline = useStatus();
  const dispatch = useDispatch();

  useEffect(() => {
    setRestuarants(allRestuarants);
  }, [allRestuarants]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(logoutUser());
      }
    });
  }, []);

  return isOnline ? (
    <>
      <div className="m-3 flex items-center justify-center">
        <div className="flex p-1 m-2 items-center bg-slate-200 rounded-full">
          <img className="w-6" src={SearchIcon} />
          <input
            id="searchBox"
            data-testid="searchBox"
            name="searchText"
            type="text"
            className="bg-transparent focus:outline-none"
            placeholder="Search Restuarants..."
            value={searchText}
            onChange={(e) => {
              setSearchText((prev) => (prev = e.target.value));
              if (e.target.value === "") {
                setRestuarants(allRestuarants);
              }
            }}
          />
        </div>
        <button
          data-testid="search-btn"
          className="ml-2 p-2 bg-slate-100 rounded-full text-sm"
          onClick={() => {
            if (!searchText || searchText.length == 0 || searchText === "")
              return;
            const filteredData = filterData(searchText, allRestuarants);
            setRestuarants(filteredData);
          }}
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {loader || restuarants?.length === 0 ? (
          <Shimmer />
        ) : (
          <div
            data-testid="res-list"
            className="flex flex-wrap gap-5 justify-center"
          >
            {restuarants?.map((restaurant) => {
              return (
                <Link
                  className="restuarant-card-link"
                  to={"/restaurant/" + restaurant.id}
                  key={restaurant.id}
                >
                  <RestaurantCard {...restaurant} />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  ) : (
    <>
      <h1 className="font-extrabold text-3xl">
        You are Offline🥲. Please Check Your Internet Connection🛜!!
      </h1>
    </>
  );
};

export default Body;
