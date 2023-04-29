import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
function ConversationRoom({ users, setSelectedRoom, selectedRoom }) {
  const roomMessages = [
    { content: "hi1", from: "id1", to: "id2", createAt: 12345 },
  ];
  const user = {
    image:
      "https://icon2.cleanpng.com/20180615/hxf/kisspng-avatar-user-profile-male-logo-profile-icon-5b238cafcb8559.4398361515290564318336.jpg",
    name: "siva",
    _id: 1,
    lastSeen: 1682441599000,
    mobile: 9500852762,
    email: "new@gmail.com",
  };
  const [currentRoom, setCurrentRoom] = useState(user);
  let toMail;
  useEffect(() => {
    console.log("selected room", selectedRoom);
    toMail = selectedRoom
      .split("_")
      .filter((email) => localStorage.getItem("chatEmail") !== email);
    console.log("toMail", toMail);
    setCurrentRoom(users.find((user) => user.email === toMail[0]));
  }, [selectedRoom]);
  return (
    <div className="conversation-room">
      <div className="conversation-room-header header">
        <div className="left">
          <img
            src={
              currentRoom.image ||
              "https://icon2.cleanpng.com/20180615/hxf/kisspng-avatar-user-profile-male-logo-profile-icon-5b238cafcb8559.4398361515290564318336.jpg"
            }
            alt={`${currentRoom.name}`}
          />
          <div className="name-mobile">
            <span>
              {currentRoom.name} - {currentRoom.mobile}
            </span>
            <span>{currentRoom.lastSeen}</span>
          </div>
        </div>
        <div className="right">
          <IconButton sx={{ color: "white" }} aria-label="back">
            <ArrowBackIcon onClick={() => setSelectedRoom(null)} />
          </IconButton>
        </div>
      </div>
      <div className="conversation-room-body">
        <div className="messages-container">
          {roomMessages.map((message) => (
            <Message message={message} />
          ))}
        </div>
      </div>
      <div className="conversation-room-footer p-4">
        {/* <input type="text" /> */}
        <TextField fullWidth label="Enter Message" id="message-input" />
        <SendIcon color="primary" />
      </div>
    </div>
  );
}

function Message({ message }) {
  return (
    <div className="message-wrapper">
      <p>{message.content}</p>
      <p>FROM {message.from}</p>
      <p>{message.createAt}</p>
    </div>
  );
}

export { ConversationRoom };
