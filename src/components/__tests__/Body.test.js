import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Body from "../Body";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { StaticRouter } from "react-router-dom/server";
import { RESTUARANTS_DATA } from "../../mocks/restuarantsData";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(RESTUARANTS_DATA);
    },
  });
});

test("shimmer should load on Homepage", () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );
  const shimmer = body.getByTestId("shimmer");
  expect(shimmer.children.length).toBe(20);
});

test("Restuarants should load on Homepage", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );
  await waitFor(() => body.getByTestId("res-list"));
  const restaurants = body.getByTestId("res-list");
  expect(restaurants.children.length).toBe(20);
});

test("Search restuarants should work on click of search button with input pizza", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );
  await waitFor(() => body.getByTestId("res-list"));
  const searchBox = body.getByTestId("searchBox");
  fireEvent.change(searchBox, {
    target: { value: "pizza" },
  });
  const searchButton = body.getByTestId("search-btn");
  fireEvent.click(searchButton);

  const restaurants = body.getByTestId("res-list");
  expect(restaurants.children.length).toBe(4);
});
