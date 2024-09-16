import { useSelector } from "react-redux";
import { Avatar, Popover } from "@mui/material";
import AccountIcon from "../assets/AccountIcon.png";
import { useRef, useState } from "react";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const userData = useSelector((store) => store.user.userData);
  const avatarRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Avatar
        ref={avatarRef}
        sx={{ cursor: "pointer" }}
        src={AccountIcon}
        onClick={() => setOpen(true)}
      />
      <Popover
        id={"profile-popover"}
        open={open}
        anchorEl={avatarRef}
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
