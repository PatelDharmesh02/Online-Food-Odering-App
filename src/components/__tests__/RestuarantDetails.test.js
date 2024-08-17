import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import RestaurantDetails from "../RestaurantDetails";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { StaticRouter } from "react-router-dom/server";
import { RESTUARANTS_MENU } from "../../mocks/restuarantsData";
import Header from "../Header";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(RESTUARANTS_MENU);
    },
  });
});

test("Shimmer should load on Restuarants menu page", () => {
  const restroDetails = render(
    <StaticRouter>
      <Provider store={store}>
        <RestaurantDetails />
      </Provider>
    </StaticRouter>
  );
  const shimmer = restroDetails.getByTestId("shimmer");
  expect(shimmer).toBeInTheDocument();
});

test("Add to cart button should work and change the cart items", async () => {
  const restroDetails = render(
    <StaticRouter>
      <Provider store={store}>
        <Header />
        <RestaurantDetails />
      </Provider>
    </StaticRouter>
  );
  await waitFor(() => restroDetails.getByTestId("item-list"));
  const addToCartBtn = restroDetails.getAllByTestId("add-to-cart-btn");

  fireEvent.click(addToCartBtn[0]);
  fireEvent.click(addToCartBtn[1]);
  fireEvent.click(addToCartBtn[2]);

  const cart = restroDetails.getByTestId("cart");
  expect(cart.innerHTML).toBe("Cart - 3");
});
