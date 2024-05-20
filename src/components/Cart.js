import { useSelector } from "react-redux";
import RestaurantItemCard from "./RestaurantItemCard";
import EmptyCartLogo from "../assets/EmptyCartIcon.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Cart = () => {
  const items = useSelector((store) => store.cart?.items);
  const totalPrice = useSelector((store) => store.cart?.totalPrice);

  return items.length > 0 ? (
    <>
      <div className="lg:flex ml-2 p-3 mt-4 rounded-md gap-10 lg:max-h-screen lg:overflow-hidden">
        <div className="lg:w-1/2 md:overflow-y-auto hideScrollbar shadow-lg rounded-lg">
          {items.map((item, idx) => {
            return (
              <RestaurantItemCard
                keys={idx}
                {...item}
                price={item.price * 100}
                alreadyAdded={true}
                style={idx === items.length - 1 ? "mb-0" : ""}
              />
            );
          })}
        </div>
        <div className="mb-6 md:mb-0 p-2 lg:w-1/2 rounded-lg shadow-lg md:overflow-y-auto hideScrollbar">
          <div className="grid grid-cols-3 lg:grid-cols-4 border-black border text-white bg-red-600 rounded-lg mb-2 md:mb-3">
            <div className="lg:col-span-2 flex justify-center font-bold text-base md:text-lg text-wrap">
              Item
            </div>
            <div className="flex justify-center font-bold text-lg">
              Quantity
            </div>
            <div className="flex justify-center font-bold text-lg">
              Price(₹)
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {items.map((item, idx) => {
              return (
                <div className="grid grid-cols-3 lg:grid-cols-4" key={idx}>
                  <div className="lg:col-span-2 font-medium text-base md:text-lg text-wrap">
                    {item.name}
                  </div>
                  <div className="flex justify-center items-center font-medium text-base md:text-lg">
                    {item.count}
                  </div>
                  <div className="flex justify-center items-center font-medium text-base md:text-lg">
                    {(item.count * item.price).toLocaleString("en-IN")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center items-center">
            <button className="w-1/4">
              <p className="font-semibold bg-gradient-to-r from-blue-600 via-pink-500 to-red-600 rounded-md text-white px-2 my-1">
                Proceed to pay ₹{(totalPrice).toLocaleString("en-IN")}/-
              </p>
            </button>
      </div>
    </>
  ) : (
    <div className="my-40 flex flex-col justify-center items-center gap-3">
      <img src={EmptyCartLogo} className="w-36 h-36" />
      <p className="font-bold text-2xl">Your cart is empty!!☹️</p>
      <Link to={"/"}>
        <p className="font-semibold bg-gradient-to-r from-blue-600 via-pink-500 to-red-600 rounded-md text-white px-2 my-1">
          Add items to checkout
        </p>
      </Link>
    </div>
  );
};

export default Cart;
