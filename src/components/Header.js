import { Link } from "react-router-dom";
import useStatus from "../utils/useStatus";
import logo from "../assets/Platter.png";
import AccountLogo from "../assets/AccountIcon.png";

const Title = () => {
  return (
    <Link to="/">
      <div className="flex items-center p-2 gap-2 justify-center">
        <img className="w-14 h-14 md:w-24 md:h-24" alt="logo" src={logo} />
        <p className="font-light text-2xl md:text-4xl font-serif">Platter</p>
      </div>
    </Link>
  );
};

const Header = () => {
  const isOnline = useStatus();

  return (
    <div className="md:flex justify-between pl-3 pr-3 shadow-lg bg-white rounded-lg sticky top-0 right-0 left-0  z-10">
      <Title />
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
            <Link to="/">Home</Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link to="/about">About</Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">Cart</li>
        </ul>
      </div>
      <div className="flex items-center justify-center">
        <img src={AccountLogo} className="w-8 h-8"/>
        <span className="font-bold text-sm p-1 md:p-2 text-wrap">{"user"}</span>
      </div>
    </div>
  );
};

export default Header;
