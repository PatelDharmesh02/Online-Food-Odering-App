/**
  --- Bundler Workings ---

 * HMR - Hot Module Replacement
 * File Watcher Algorithms - c++
 * Bundling
 * Minify the code
 * Cleaning our code (ex: remove console logs)
 * DEV and Production build
 * Superfast building algorithms
 * Image Optimization
 * Caching while development
 * Compression
 * Make Compatible with older versions of browsers
 * HTTPS on dev
 * Auto manages PORT numbers
 * Consistent Hashing Algorithms
 * Zero Config
 
**/

/**

  Header
    - logo
    - Nav items
      - Home
      - About
      - Contact
      - Cart
  
  Body
    - search Bar
    - RestaurantsLists
      - RestaurantsCard
       - Image
       - Name
       - Rating
       - cuisines

  Footer
    - References Links
    - Copyright


**/

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Error from "./components/Error";
import RestaurantDetails from "./components/RestaurantDetails";
import { createBrowserRouter, Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetails />
      }
    ]
  }
]);

export default appRouter;
