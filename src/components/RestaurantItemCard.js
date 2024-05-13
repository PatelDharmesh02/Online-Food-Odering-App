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
  const itemPrice = (price || defaultPrice || finalPrice) / 100;
  const [added, setAdded] = useState(false);
  const [itemCount, setItemCount] = useState(1);
  const items = useSelector((store) => store.cart.items);
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
      dispatch(removeItem(id));
      setAdded(false);
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
  }, [alreadyAdded]);
  
  return (
    <div className="flex justify-between items-center p-1 mb-3 mt-1 bg-white rounded-lg shadow-md">
      <img src={IMG_CDN_URL + imageId} className="w-40 h-24" />
      <p className="text-base font-bold">
        {name} ₹ {itemPrice}/-
      </p>
      <div>
        {added ? (
          <div className="flex items-center justify-center">
            <button
              className="bg-red-500 p-1 md:p-2 w-7 h-7 rounded-md font-medium text-white mx-1 flex justify-center items-center gap-4"
              onClick={() => handleRemoveItemCount(id)}
            >
              -
            </button>
            <p className="p-1 md:p-2 m-2 w-7 h-7 bg-slate-200 rounded-md flex justify-center items-center">
              {itemCount}
            </p>
            <button
              className="bg-red-500 p-1 md:p-2 w-7 h-7 rounded-md font-medium text-white mx-1 flex justify-center items-center"
              onClick={() => handleAddItemCount(id)}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="bg-red-500 p-1 md:p-2 rounded-full font-medium text-white mx-1"
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
