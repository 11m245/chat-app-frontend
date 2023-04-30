import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { appContext, socket } from "../App.js";
import moment from "moment";
function ConversationRoom() {
  const {
    currentUser,
    users,
    roomMessages,
    setRoomMessages,
    newMessage,
    setNewMessage,
    selectedRoom,
    setSelectedRoom,
  } = useContext(appContext);
  const [currentRoom, setCurrentRoom] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = () => {
    // console.log("trying to send", currentMessage);
    if (currentMessage) {
      socket.emit("message_room", {
        from: currentUser.email,
        to: selectedRoom,
        content: currentMessage,
        createAt: Date.now(),
      });
      setCurrentMessage("");
    } else {
      return;
    }
  };

  useEffect(() => {
    // console.log("selectedRoom rr useE", selectedRoom);
    const a = selectedRoom
      .split(",")
      .filter((email) => email !== currentUser.email);
    if (a.length === 0) {
      setCurrentRoom(users.find((user) => user.email === currentUser.email));
    } else {
      setCurrentRoom(users.find((user) => user.email === a[0]));
    }
  }, [selectedRoom]);

  useEffect(() => {
    setRoomMessages(null);
    socket.emit("join_room", selectedRoom);
    socket.on("receive_room_messages", (rmMessages) => {
      console.log("got room Messages", rmMessages);
      setRoomMessages(rmMessages);
    });
  }, [selectedRoom]);

  useEffect(() => {
    socket.on("receive_room_messages", (rmMessages) => {
      console.log("got room Messages", rmMessages);
      setRoomMessages(rmMessages);
    });
  }, [socket]);
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
            <span style={{ fontSize: "20px" }}>
              {currentRoom.name} - {currentRoom.mobile}
            </span>
            <span>
              {currentRoom.isOnline ? (
                <p style={{ color: "yellow" }}>online</p>
              ) : (
                <p style={{ color: "#FBD1A2" }}>
                  {moment(currentRoom.lastSeen).fromNow()}
                </p>
              )}
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
          {/* {roomMessages?.length > 0 ? (
            <p>No messages</p>
          ) : (
            roomMessages?.map((message) => <Message message={message} />)
          )} */}
          {roomMessages
            ? roomMessages.map((message) => (
                <Message key={message._id} message={message} />
              ))
            : null}
        </div>
      </div>
      <div className="conversation-room-footer p-4">
        {/* <input type="text" /> */}
        <TextField
          fullWidth
          label="Enter Message"
          id="message-input"
          onChange={(e) => setCurrentMessage(e.target.value)}
          value={currentMessage}
          onKeyPress={(e) =>
            e.key === "Enter" ? sendMessage(currentMessage) : null
          }
        />
        <SendIcon color="primary" onClick={sendMessage} />
      </div>
    </div>
  );
}

function Message({ message }) {
  const { currentUser } = useContext(appContext);
  return (
    <div className="message-wrapper">
      <p className="message-content">{message.content}</p>
      <div className="name-time-wrapper">
        <p className="message-from">
          {message.from === currentUser.email ? null : message.from}
        </p>
        <p className="message-time">{moment(message.createAt).format("LLL")}</p>
      </div>
    </div>
  );
}

export { ConversationRoom };
