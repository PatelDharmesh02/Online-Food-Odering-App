import { useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Drawer,
  TextField,
  Popover,
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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { ValidateData } from "../utils/validate";
import { setUser, toggleAuthDrawer } from "../redux/userSlice";
import { auth } from "../utils/firebase";
import stringToColor from "../utils/stringToColor";


const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [login, setLogin] = useState(true);
  const [error, setError] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [alertContent, setAlertContent] = useState({});
  const userData = useSelector((store) => store.user.userData);
  const openDrawer = useSelector((store) => store.user.authDrawerState);
  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const userNameRef = useRef(null);

  const toggleDrawer = (state) => {
    dispatch(toggleAuthDrawer(state));
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
              dispatch(toggleAuthDrawer(false));
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
          dispatch(toggleAuthDrawer(false));
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
          onClick={() => toggleDrawer(true)}
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
              onClick={() => toggleDrawer(false)}
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
                <p className="text-red-600 text-base font-bold mt-4">{error}</p>
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
  );
};

export default Profile;
