import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { appContext, socket } from "../App.js";
function ConversationRoom() {
  const {
    currentUser,
    users,
    roomMessages,
    newMessage,
    setNewMessage,
    selectedRoom,
    setSelectedRoom,
  } = useContext(appContext);
  const [currentRoom, setCurrentRoom] = useState("");

  const sendMessage = (message) => {
    if (message) {
      socket.emit("message_room", {
        from: currentUser.email,
        to: selectedRoom,
        content: message,
        createAt: Date.now(),
      });
      setNewMessage("");
    } else {
      return;
    }
  };

  useEffect(() => {
    console.log("selectedRoom rr useE", selectedRoom);
    const a = selectedRoom
      .split(",")
      .filter((email) => email !== currentUser.email);
    setCurrentRoom(users.find((user) => user.email === a[0]));
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
            <span>
              {currentRoom.isOnline ? "online" : currentRoom.lastSeen}
            </span>
          </div>
        </div>
        <div className="right">
          <IconButton
            sx={{ color: "white" }}
            aria-label="back"
            onClick={() => setSelectedRoom("")}
          >
            <ArrowBackIcon />
          </IconButton>
        </div>
      </div>
      <div className="conversation-room-body">
        <div className="messages-container">
          {roomMessages?.length > 0 ? (
            <p>No messages</p>
          ) : (
            roomMessages?.map((message) => <Message message={message} />)
          )}
        </div>
      </div>
      <div className="conversation-room-footer p-4">
        {/* <input type="text" /> */}
        <TextField
          fullWidth
          label="Enter Message"
          id="message-input"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <SendIcon color="primary" onClick={sendMessage} />
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
