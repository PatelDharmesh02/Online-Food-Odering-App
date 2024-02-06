import { Link } from "react-router-dom";

const Title = () => {
    return (
      <Link to ="/">
        <img
          className="logo"
          alt="logo"
          src="https://files.yappe.in/place/full/food-villa-family-restaurant-hotel-4642683.webp"
        />
      </Link>
    );
  };
  
const Header = () => {
    return (
      <div className="header">
        <Title />
        <div className="nav-items">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>Cart</li>
          </ul>
        </div>
      </div>
    );
  };

  export default Header;