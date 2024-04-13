export const filterData = (searchText, allRestuarants) => {
  const filterData = allRestuarants?.filter((resto) =>
    resto.info.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return filterData;
};
