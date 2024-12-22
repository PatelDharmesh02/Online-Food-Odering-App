export const filterData = (searchText, allRestuarants) => {
  const filterData = allRestuarants?.filter((resto) =>
    resto?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
  );
  return filterData;
};
