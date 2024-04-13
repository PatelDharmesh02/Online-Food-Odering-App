import { Link } from "react-router-dom";
import useStatus from "../utils/useStatus";

const Title = () => {
  return (
    <Link to="/">
      <img
        className="logo"
        alt="logo"
        src="https://files.yappe.in/place/full/food-villa-family-restaurant-hotel-4642683.webp"
      />
    </Link>
  );
};


const Header = () => {

  const isOnline = useStatus();

  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <div className="status-tracker">
          Status:
          {isOnline ? (
            <div className="online-status"></div>
          ) : (
            <div className="offline-status"></div>
          )}
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
