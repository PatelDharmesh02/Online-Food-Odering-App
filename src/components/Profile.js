import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Popover } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = () => {
  const [open, setOpen] = useState(false);
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
        This is user profile
      </Popover>
    </div>
  );
};

export default Profile;
