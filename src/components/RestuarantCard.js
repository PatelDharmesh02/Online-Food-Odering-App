import { IMG_CDN_URL } from "../constants";
import { Rating } from "@mui/material";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  avgRating,
  totalRatingsString,
}) => {
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
      <div className="flex gap-4">
        <Rating
          name="restuarant-rating"
          defaultValue={avgRating}
          precision={0.1}
          readOnly
        />
        <p className="font-semibold text-base">{totalRatingsString}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
