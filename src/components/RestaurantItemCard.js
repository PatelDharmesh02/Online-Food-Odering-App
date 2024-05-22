import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { addItem, manageItemCount, removeItem } from "../redux/cartSlice";

const RestaurantItemCard = (props) => {
  const {
    name,
    imageId,
    price,
    finalPrice,
    defaultPrice,
    id,
    alreadyAdded,
    count,
  } = props;
  const itemPrice = parseInt((price || defaultPrice || finalPrice) / 100);
  const [added, setAdded] = useState(false);
  const [itemCount, setItemCount] = useState(count || 1);
  const dispatch = useDispatch();

  const handleAdded = (item, price) => {
    dispatch(addItem({ ...item, price: price, count: 1 }));
    setItemCount(1);
    setAdded(true);
  };
  const handleAddItemCount = (id) => {
    setItemCount(itemCount + 1);
    dispatch(manageItemCount({ id, count: itemCount + 1 }));
  };
  const handleRemoveItemCount = (id) => {
    if (itemCount === 1) {
      setAdded(false);
      dispatch(removeItem(id));
    } else {
      setItemCount(itemCount - 1);
      dispatch(manageItemCount({ id, count: itemCount - 1 }));
    }
  };

  useEffect(() => {
    if (alreadyAdded) {
      setAdded(true);
      setItemCount(count);
    }
  }, [alreadyAdded, count, ]);

  return (
    <div className={`flex justify-between gap-3 items-center p-1 px-2 mt-1 bg-white rounded-lg shadow-md ${props?.style || "mb-3"}`}>
      <img src={IMG_CDN_URL + imageId} className="min-w-28 max-w-28 h-24" />
      <p className="text-base font-bold">
        {name} ₹ {itemPrice}/-
      </p>
      <div>
        {added || alreadyAdded ?(
          <div className="flex items-center justify-center gap-0.5">
            <button
              className="bg-red-500 p-1 md:p-2 w-7 h-7 rounded-md font-medium text-white flex justify-center items-center"
              onClick={() => handleRemoveItemCount(id)}
            >
              -
            </button>
            <p className="p-1 md:p-2 w-7 h-7 bg-slate-200 rounded-md flex justify-center items-center">
              {itemCount}
            </p>
            <button
              className="bg-red-500 p-1 md:p-2 w-7 h-7 rounded-md font-medium text-white flex justify-center items-center"
              onClick={() => handleAddItemCount(id)}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="bg-red-500 md:p-2 rounded-full md:font-medium text-white text-xs md:text-sm min-w-20 text-nowrap"
            onClick={() => handleAdded(props, itemPrice)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default RestaurantItemCard;
