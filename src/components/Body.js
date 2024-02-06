import RestaurantCard from "./RestuarantCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { restaurants } from "../constants";
import Shimmer from "./Shimmer";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [allRestuarants, setAllRestuarants] = useState([]);
  const [filteredRestuarants, setFilteredRestuarants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    const restros =
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setAllRestuarants(restros);
    setFilteredRestuarants(restros);
  }

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          className="search-box"
          placeholder="Search Restuarants..."
          value={searchText}
          onChange={(e) => {
            setSearchText((prev) => (prev = e.target.value));
            if (e.target.value === "") setFilteredRestuarants(allRestuarants);

            // const filterData = allRestuarants?.filter((resto) =>
            //   resto.info.name.toLowerCase().includes(e.target.value.toLowerCase())
            // );
            // setFilteredRestuarants((prev) => (prev = filterData));
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            const filterData = allRestuarants?.filter((resto) =>
              resto.info.name.toLowerCase().includes(searchText.toLowerCase())
            );

            setFilteredRestuarants((prev) => (prev = filterData));
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurants">
        {filteredRestuarants.length === 0 ? (
          <Shimmer />
        ) : (
          filteredRestuarants?.map((restaurant) => {
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
  );
};

export default Body;
