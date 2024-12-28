import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RestaurantItemCard from "./RestaurantItemCard";
import EmptyCartLogo from "../assets/EmptyCartIcon.png";
import { Snackbar, Alert } from "@mui/material";
import { RAZORPAY_SCRIPT_API } from "../constants";
import logo from "../assets/Platter.png";
import { Link } from "react-router-dom";
import { toggleAuthDrawer } from "../redux/userSlice";
import { clearCart } from "../redux/cartSlice";
import axios from "axios";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((store) => store.cart?.items);
  const totalPrice = useSelector((store) => store.cart?.totalPrice);
  const { userData } = useSelector((store) => store.user);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [alertContent, setAlertContent] = useState({});

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handlePayment = async () => {
    if (!userData) {
      dispatch(toggleAuthDrawer(true));
      return;
    }
    const res = await loadScript(RAZORPAY_SCRIPT_API);

    if (!res) {
      setAlertContent({
        variant: "filled",
        severity: "error",
        children: "Failed to RazorPay Payment Gateway!!",
      });
      setShowSnackbar(true);
      return;
    }

    const result = await axios.post(process.env.REACT_APP_CREATE_ORDER, {
      items: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.count,
      })),
      totalPrice,
      userId: userData.uid,
    });

    if (!result) {
      setAlertContent({
        variant: "filled",
        severity: "error",
        children: "Failed to Create Order!!",
      });
      setShowSnackbar(true);
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: amount.toString(),
      currency: currency,
      name: "Platter Limited",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        const result = await axios.post(
          process.env.REACT_APP_ORDER_SUCCESS,
          data
        );
        if (result.status === 200) {
          setAlertContent({
            variant: "filled",
            severity: "success",
            children: "Order Placed Successfully!!",
          });
          setShowSnackbar(true);
          setTimeout(() => {
            dispatch(clearCart());
            navigate("/");
          }, 1500);
        } else {
          setAlertContent({
            variant: "filled",
            severity: "error",
            children: "Failed to Place Order!!",
          });
          setShowSnackbar(true);
        }
      },
      prefill: {
        name: userData?.displayName ?? "",
        email: "Platter.com",
        contact: "+91-9988776655",
      },
      notes: {
        address: "Platter Corporate Office",
      },
      theme: {
        color: "#FFD580",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

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
        <button className="w-1/4" onClick={handlePayment}>
          <p className="font-semibold bg-gradient-to-r from-blue-600 via-pink-500 to-red-600 rounded-md text-white px-2 my-1">
            Proceed to pay ₹{totalPrice.toLocaleString("en-IN")}/-
          </p>
        </button>
      </div>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert {...alertContent} />
      </Snackbar>
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
