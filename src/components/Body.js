import RestaurantCard from "./RestuarantCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import { filterData } from "../utils/helper";
import useRestuarantsData from "../utils/useRestuarantsData";
import useStatus from "../utils/useStatus";
import SearchIcon from "../assets/SearchIcon.png";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [restuarants, setRestuarants] = useState([]);

  const allRestuarants = useRestuarantsData();
  const isOnline = useStatus();

  useEffect(() => {
    setRestuarants(allRestuarants);
  }, [allRestuarants]);

  return isOnline ? (
    <>
      <div className="m-3 flex items-center justify-center">
        <div className="flex p-1 m-2 items-center bg-slate-200 rounded-full">
          <img className="w-6" src={SearchIcon} />
          <input
            id="searchBox"
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
          className="ml-2 p-2 bg-slate-100 rounded-full text-sm"
          onClick={() => {
            const filteredData = filterData(searchText, allRestuarants);
            setRestuarants(filteredData);
          }}
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {restuarants?.length === 0 ? (
          <Shimmer />
        ) : (
          restuarants?.map((restaurant) => {
            return (
              <Link
                className="restuarant-card-link"
                to={"/restaurant/" + restaurant.info.id}
                key={restaurant.info.id}
              >
                <RestaurantCard {...restaurant.info} />
              </Link>
            );
          })
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
