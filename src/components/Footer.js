import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="text-gray-800 bg-gray-300 ml-1 mt-10 shadow-md rounded-md">
      <div className="px-4 py-8 flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:flex justify-center items-center flex-col">
          <h2 className="font-bold text-xl mb-2"><Link to={"about"}>About Us</Link></h2>
          <p>
            Ditch the takeout menus! Platter is your convenient online food
            ordering app. Discover a wide range of restaurants, browse menus,
            and get delicious meals delivered straight to your doorstep. It's
            the hassle-free way to satisfy your cravings. Try! Platter today
            and experience a world of culinary options at your fingertips!
          </p>
          <Link
            to="/contact"
            className="text-blue-500 hover:underline"
          >
            Contact Us
          </Link>
        </div>
        <div className="w-full md:w-1/2 md:flex justify-start items-center flex-col">
          <h2 className="font-bold text-xl mb-2">Links</h2>
          <ul className="list-none">
            <li>
              <Link
                to=""
                className="text-gray-600 hover:underline"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="text-gray-600 hover:underline"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="text-gray-600 hover:underline"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center py-4">
        <p>&copy; 2024 Platter. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
