import "../pages/user/chat.css";
import SettingsPowerRoundedIcon from "@mui/icons-material/SettingsPowerRounded";
import IconButton from "@mui/material/IconButton";
function Header() {
  return (
    <div className="chat-header">
      <img
        src="https://i.ibb.co/QDkbTJK/schat-app-logo-icon-vector.png"
        alt="chat-logo"
      />
      <IconButton color="secondary" aria-label="log out">
        <SettingsPowerRoundedIcon />
      </IconButton>
    </div>
  );
}

export { Header };
