import { Link } from "react-router-dom";
import useStatus from "../utils/useStatus";
import logo from "../assets/Platter.png";
import { useSelector } from "react-redux";
import {
  ConnectWithoutContactOutlined,
  EventOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Profile from "./Profile";

const Header = () => {
  const items = useSelector((store) => store.cart.items);
  const isOnline = useStatus();
  
  return (
    <div className="md:flex justify-between pl-3 pr-3 shadow-lg bg-white rounded-lg sticky top-0 right-0 left-0  z-10">
      <Link to="/">
        <div className="flex items-center p-2 gap-2 justify-center">
          <img
            data-testid="logo"
            className="w-12 h-12 md:w-20 md:h-20"
            alt="logo"
            src={logo}
          />
          <p className="font-light text-2xl md:text-4xl font-serif">Platter</p>
        </div>
      </Link>
      <div className="flex justify-between items-center gap-4 pb-2 md:pb-0">
        <div className="text-sm md:text-normal flex gap:1 md:gap-2 items-center bg-yellow-100 p-1 md:p-2 rounded-full">
          Status:
          {isOnline ? (
            <div className="w-5 h-5 bg-green-600 rounded-full border-4 border-white"></div>
          ) : (
            <div className="w-5 h-5 bg-red-600 rounded-full border-4 border-white"></div>
          )}
        </div>
        <ul className="flex gap-4">
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link className="font-medium flex items-center gap-1" to="/">
              <HomeOutlined />
              <span>Home</span>
            </Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link className="font-medium flex items-center gap-1" to="/about">
              <EventOutlined />
              <span>About</span>
            </Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link className="font-medium flex items-center gap-1" to="/contact">
              <ConnectWithoutContactOutlined /> <span>Contact</span>
            </Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link
              className="font-medium flex items-center gap-1"
              data-testid="cart"
              to="/cart"
            >
              <ShoppingCartOutlined />
              <span>Cart -</span> {items?.length}
            </Link>
          </li>
        </ul>
      </div>
      <Profile />
    </div>
  );
};

export default Header;
