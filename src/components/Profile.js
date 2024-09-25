import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Popover, Button, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
  const userData = useSelector((store) => store.user.userData);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Avatar
        sx={{ cursor: "pointer" }}
        src={AccountCircleIcon}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
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
        <div className="p-4 w-96">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              gap: "20px"
            }}
          >
            <Avatar
              src="/path-to-profile-photo.jpg" // Path to the user's profile photo
              alt="Profile Picture"
              sx={{ width: 60, height: 60}}
            />
            <div>
              <Typography variant="h6">Hi, Patel!</Typography>
              <Typography variant="body2">
                {userData?.email}
              </Typography>
            </div>
          </div>

          {/* Buttons for changing profile information */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <Button variant="outlined" startIcon={<EditIcon />}>
              Change Email
            </Button>
            <Button variant="outlined" startIcon={<EditIcon />}>
              Change Name
            </Button>
            <Button variant="outlined" startIcon={<EditIcon />}>
              Change Address
            </Button>
          </div>

          {/* Logout Button */}
          <Button
            variant="contained"
            color="error"
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={() => alert("Logged out")}
          >
            Log Out
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default Profile;
