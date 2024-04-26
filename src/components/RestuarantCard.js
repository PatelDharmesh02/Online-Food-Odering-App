import { IMG_CDN_URL } from "../constants";

const RestaurantCard = ({ cloudinaryImageId, name, cuisines, avgRating }) => {
  return (
    <div className="p-3 w-60 bg-slate-200 border shadow-lg hover:shadow-2xl hover:scale-105 rounded-lg min-h-[350px] flex flex-col justify-between">
      <div>
        <img className="h-40 w-60" src={IMG_CDN_URL + cloudinaryImageId} />
        <h2 className="font-extrabold mb-3">{name}</h2>
      </div>
      {cuisines?.length > 5 ? (
        <>
          <h3 className="font-medium mb-3">
            {cuisines.slice(0, 5).join(", ")} & more...
          </h3>
        </>
      ) : (
        <>
          <h3 className="font-medium mb-3">{cuisines?.join(", ")}</h3>
        </>
      )}
      <h4 className="font-bold">{avgRating} Stars</h4>
    </div>
  );
};

export default RestaurantCard;
