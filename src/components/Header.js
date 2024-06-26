import { Link } from "react-router-dom";
import useStatus from "../utils/useStatus";
import logo from "../assets/Platter.png";
import AccountLogo from "../assets/AccountIcon.png";
import { useSelector } from "react-redux";
import { Drawer, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Title = () => {
  return (
    <Link to="/">
      <div className="flex items-center p-2 gap-2 justify-center">
        <img className="w-12 h-12 md:w-20 md:h-20" alt="logo" src={logo} />
        <p className="font-light text-2xl md:text-4xl font-serif">Platter</p>
      </div>
    </Link>
  );
};

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [login, setLogin] = useState(true);
  const isOnline = useStatus();
  const items = useSelector((store) => store.cart.items);
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const handleLogin = () => {
    if (login) {
    } else {
    }
  };
  return (
    <div className="md:flex justify-between pl-3 pr-3 shadow-lg bg-white rounded-lg sticky top-0 right-0 left-0  z-10">
      <Title />
      <div className="flex justify-between items-center gap-4 pb-2 md:pb-0">
        <div className="text-sm md:text-normal flex gap:1 md:gap-2 items-center bg-yellow-100 p-1 md:p-2 rounded-full">
          Status:
          {isOnline ? (
            <div className="w-5 h-5 bg-green-600 rounded-full border-4 border-white"></div>
          ) : (
            <div className="w-5 h-5 bg-red-600 rounded-full border-4 border-white"></div>
          )}
        </div>
        <ul className="flex gap-4">
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link to="/">Home</Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link to="/about">About</Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link to="/cart">Cart - {items?.length}</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center">
        <span
          className="font-bold text-sm p-1 md:p-2 text-wrap cursor-pointer"
          onClick={() => toggleDrawer()}
        >
          Login/SignUp
        </span>
        <Drawer
          open={openDrawer}
          anchor="right"
          PaperProps={{
            sx: {
              width: { xs: "100%", sm: "50%", md: "40%", lg: "30%" },
            },
          }}
        >
          <div>
            <div className="p-2 m-2 flex flex-col gap-10">
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={() => toggleDrawer()}
              />
              <div>
                {login ? (
                  <>
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p>
                      <span className="font-semibold">Or </span>
                      <span
                        className="text-red-600 text-sm font-semibold hover:underline cursor-pointer"
                        onClick={() => setLogin(!login)}
                      >
                        create an account
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold">Sign up</h1>
                    <p>
                      <span className="font-semibold">Or </span>
                      <span
                        className="text-red-600 text-sm font-semibold hover:underline cursor-pointer"
                        onClick={() => setLogin(!login)}
                      >
                        login to your account
                      </span>
                    </p>
                  </>
                )}
              </div>
              <div className="">
                <div className="flex flex-col gap-5">
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    type="text"
                    autoFocus
                    sx={{ width: "80%" }}
                  />
                  {!login && (
                    <>
                      <TextField
                        id="name"
                        label="Name"
                        type="text"
                        sx={{ width: "80%" }}
                      />
                      <TextField
                        id="email"
                        label="Email"
                        type="email"
                        sx={{ width: "80%" }}
                      />
                    </>
                  )}
                </div>
                <div>
                  <button
                    className="w-4/5 h-14 mt-5 bg-red-500 hover:shadow-lg rounded-md active:bg-red-600 text-white font-semibold text-base"
                    onClick={() => handleLogin()}
                  >
                    CONTINUE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
