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

/**
  --   For Optimizing the Large Scale Applications we are using the following concepts   --

 * Chunking
 * Code Splitting
 * Dynaminc Bundling
 * Lazy loading
 * On Demand Loading
 * Dynamic Import
 
**/

import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Error from "./components/Error";
import Profile from "./components/ProfileClass";
import RestaurantDetails from "./components/RestaurantDetails";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import Shimmer from "./components/Shimmer";
import { lazy, Suspense } from "react";
import store from "./redux/store";
import Cart from "./components/Cart";
const About = lazy(() => import("./components/About"));
const ContactUs = lazy(() => import("./components/ContactUs"));

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
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
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Shimmer />}>
            <About />
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Shimmer />}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetails />,
      },
      {
        path: "/cart",
        element: <Cart />
      },
    ],
  },
]);

export default appRouter;
