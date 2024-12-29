import { ExpandMore, LocationOn, Close } from "@mui/icons-material";
import { Drawer, TextField } from "@mui/material";
import axios from "axios";
import React, { useRef } from "react";
import { useState, useCallback, useMemo } from "react";
import { setSelectedAddress } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const AddressBar = () => {
  const [address, setAddress] = useState("Bengaluru, Karnataka, India");
  const [searchResult, setSearchResult] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const searchQueryRef = useRef(null);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const handleAddressSelect = useCallback(
    (data) => {
      handleClose();
      dispatch(setSelectedAddress(data));
      setAddress(data);
    },
    [handleClose]
  );

  const debounce = useCallback((callback, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }, []);

  const fetchLocation = useCallback(async () => {
    if (
      (!searchQueryRef.current && !searchQueryRef.current.value) ||
      searchQueryRef.current.value.length < 3
    ) {
      setSearchResult([]);
      return;
    }

    try {
      const { data } = await axios.get(
        `https://api.locationiq.com/v1/autocomplete?autocomplete=1&key=${process.env.REACT_APP_LOCATION_SEARCH_API_TOKEN}&format=json&countrycodes=in&q=${searchQueryRef.current.value}&limit=5`
      );
      setSearchResult(data);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  }, []);

  const handleSearch = debounce(fetchLocation, 500);

  const AddressCard = useMemo(() => {
    return ({ data }) => (
      <div
        className="w-full max-w-md p-2 min-h-24 rounded-md bg-white shadow-md flex items-center"
        onClick={() => handleAddressSelect(data)}
      >
        <div className="flex items-center gap-2">
          <LocationOn />
          <p>{data}</p>
        </div>
      </div>
    );
  }, [handleAddressSelect]);

  return (
    <>
      <div
        className="min-w-96 flex justify-center gap-4 cursor-pointer items-center h-10 p-1 md:p-2 bg-slate-100 rounded-full"
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
      >
        <LocationOn />
        <p className="w-80 text-ellipsis overflow-hidden whitespace-nowrap">
          {address}
        </p>
        <ExpandMore />
      </div>
      <Drawer
        open={openDrawer}
        anchor="left"
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: "50%", md: "40%", lg: "30%" },
          },
        }}
        onClose={handleClose}
      >
        <div className="p-2 m-2 flex flex-col gap-10 items-center">
          <Close
            sx={{ cursor: "pointer" }}
            onClick={handleClose}
            style={{ alignSelf: "flex-end" }}
          />
          <TextField
            inputRef={searchQueryRef}
            id="locationSearchText"
            label="Search Location"
            placeholder="Search for area, street or city..."
            type="text"
            autoFocus
            autoComplete="Name"
            sx={{ width: "80%" }}
            onChange={handleSearch}
          />
          <div className="flex gap-4 flex-col">
            {searchResult.map((item) => {
              return <AddressCard data={item?.display_name} />;
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default AddressBar;
