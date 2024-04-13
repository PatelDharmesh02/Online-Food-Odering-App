import RestaurantCard from "./RestuarantCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import { filterData } from "../utils/helper";
import useRestuarantsData from "../utils/useRestuarantsData";
import useStatus from "../utils/useStatus";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [restuarants, setRestuarants] = useState([]);

  const allRestuarants =  useRestuarantsData();
  const isOnline = useStatus();
  
  useEffect(() => {
    setRestuarants(allRestuarants);
  }, [allRestuarants])


  return (
    isOnline ? 
    <>
      <div className="search-bar">
        <input
          type="text"
          className="search-box"
          placeholder="Search Restuarants..."
          value={searchText}
          onChange={(e) => {
            setSearchText((prev) => (prev = e.target.value));
            if(e.target.value === "") {
              setRestuarants(allRestuarants);
            }
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            const filteredData = filterData(searchText, allRestuarants);
            setRestuarants(filteredData);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurants">
        {restuarants?.length === 0 ? (
          <Shimmer />
        ) : (
          restuarants?.map((restaurant) => {
            return (
              <Link
                className="restuarant-card-link"
                to={"/restaurant/" + restaurant.info.id}
                key={restaurant.info.id}
                style={{ textDecoration: "none", fontFamily: "cursive" }}
              >
                <RestaurantCard {...restaurant.info} />
              </Link>
            );
          })
        )}
      </div>
    </>
    :
    <>
      <h1 style={{fontFamily: "cursive", fontWeight: "bolder", "fontSize": "20px"}}>You are Offline🥲. Please Check Your Internet Connection🛜!!</h1>
    </>
  );
};

export default Body;
