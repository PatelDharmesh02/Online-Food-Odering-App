import { Link } from "react-router-dom";
import useStatus from "../utils/useStatus";
import logo from "../assets/Platter.png";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  TextField,
  Popover,
  Button,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  AssignmentIndOutlined,
  Close,
  LocalMallOutlined,
  Logout,
} from "@mui/icons-material";
import { useRef, useState, useCallback } from "react";
import { ValidateData } from "../utils/validate";
import { setUser } from "../redux/userSlice";
import { auth } from "../utils/firebase";
import stringToColor from "../utils/stringToColor";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  ConnectWithoutContactOutlined,
  EventOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [login, setLogin] = useState(true);
  const [error, setError] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [alertContent, setAlertContent] = useState({});

  const items = useSelector((store) => store.cart.items);
  const userData = useSelector((store) => store.user.userData);
  const isOnline = useStatus();
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userNameRef = useRef(null);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
    setError(null);
  };

  const getProfilePhoto = useCallback(
    (user) => {
      const { photoUrl, displayName, email } = user;
      if (photoUrl) {
        return { src: photoUrl };
      }
      const letters = (displayName || email).toUpperCase().split(" ");
      return {
        sx: {
          bgcolor: stringToColor(displayName || email),
        },
        children: (function () {
          return letters.map((letter) => letter.charAt(0));
        })(),
      };
    },
    [userData]
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    signOut(auth).then(() => {
      setAlertContent({
        variant: "filled",
        severity: "success",
        children: "User logged out successfully!!",
      });
      setShowSnackbar(true);
    });
  };

  const handleSubmit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const message = ValidateData(email, password);
    setError(message);
    if (message) return;

    if (!login) {
      const userName = userNameRef.current.value;
      createUserWithEmailAndPassword(auth, email, password)
        .then((response) => {
          const user = response.user;
          updateProfile(user, {
            displayName: userName,
          })
            .then(() => {
              const user = auth.currentUser;
              dispatch(setUser(user));
              setOpenDrawer(false);
              setAlertContent({
                variant: "filled",
                severity: "success",
                children: "User signed in successfully!!",
              });
              setShowSnackbar(true);
            })
            .catch((profileError) => {
              console.error("Error updating profile:", profileError.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(`${errorCode}: ${errorMessage}`);
          console.error("Error creating user:", errorCode, errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
          dispatch(setUser(response.user));
          setOpenDrawer(false);
          setAlertContent({
            variant: "filled",
            severity: "success",
            children: "User logged in successfully!!",
          });
          setShowSnackbar(true);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(`${errorCode}:${errorMessage}`);
        });
    }
  };

  return (
    <div className="md:flex justify-between pl-3 pr-3 shadow-lg bg-white rounded-lg sticky top-0 right-0 left-0  z-10">
      <Link to="/">
        <div className="flex items-center p-2 gap-2 justify-center">
          <img
            data-testid="logo"
            className="w-12 h-12 md:w-20 md:h-20"
            alt="logo"
            src={logo}
          />
          <p className="font-light text-2xl md:text-4xl font-serif">Platter</p>
        </div>
      </Link>
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
            <Link className="font-medium flex items-center gap-1" to="/">
              <HomeOutlined />
              <span>Home</span>
            </Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link className="font-medium flex items-center gap-1" to="/about">
              <EventOutlined />
              <span>About</span>
            </Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link className="font-medium flex items-center gap-1" to="/contact">
              <ConnectWithoutContactOutlined /> <span>Contact</span>
            </Link>
          </li>
          <li className="p-1 md:p-2 bg-slate-100 rounded-full">
            <Link
              className="font-medium flex items-center gap-1"
              data-testid="cart"
              to="/cart"
            >
              <ShoppingCartOutlined />
              <span>Cart -</span> {items?.length}
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center">
        {userData ? (
          <div className="cursor-pointer">
            <Avatar
              {...getProfilePhoto(userData)}
              alt="Profile Picture"
              onClick={(e) => {
                setAnchorEl(e.target);
              }}
            />
          </div>
        ) : (
          <span
            className="font-bold text-sm p-1 md:p-2 text-wrap cursor-pointer"
            onClick={() => toggleDrawer()}
          >
            Login/SignUp
          </span>
        )}
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
              <Close
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
                        onClick={() => {
                          setLogin(!login);
                          setError(null);
                        }}
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
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col gap-5">
                  {!login && (
                    <TextField
                      inputRef={userNameRef}
                      id="fullName"
                      label="Full Name"
                      type="text"
                      autoFocus
                      autoComplete="Name"
                      sx={{ width: "80%" }}
                    />
                  )}
                  <>
                    <TextField
                      inputRef={emailRef}
                      id="email"
                      label="Email"
                      type="email"
                      sx={{ width: "80%" }}
                      autoFocus
                      autoComplete="Email"
                    />
                    <TextField
                      inputRef={passwordRef}
                      id="password"
                      label="Password"
                      type="password"
                      autoComplete="Password"
                      sx={{ width: "80%" }}
                    />
                  </>
                </div>
                {error && (
                  <p className="text-red-600 text-base font-bold mt-4">
                    {error}
                  </p>
                )}
                <div>
                  <button
                    className="w-4/5 h-14 mt-5 bg-red-500 hover:shadow-lg rounded-md active:bg-red-600 text-white font-semibold text-base"
                    onClick={handleSubmit}
                  >
                    {!login ? "Sign Up" : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Drawer>
        <Popover
          id={"profile-popover"}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="p-4 min-w-40 flex justify-center gap-2 flex-col items-center">
            <ul>
              <li className="w-full h-9 flex gap-2 items-center hover:scale-105 font-medium cursor-pointer">
                <AssignmentIndOutlined />
                <span>Profile</span>
              </li>
              <li className="w-full h-9 flex gap-2 items-center hover:scale-105 font-medium cursor-pointer">
                <LocalMallOutlined />
                <span>Orders</span>
              </li>
              <li
                className="w-full h-9 flex gap-2 items-center hover:scale-105 font-medium cursor-pointer text-red-600"
                onClick={handleLogout}
              >
                <Logout color="red" />
                <span>Log Out</span>
              </li>
            </ul>
          </div>
        </Popover>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={2000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert {...alertContent} />
        </Snackbar>
      </div>
    </div>
  );
};

export default Header;
