import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
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
  };
  // const [user, setUser] = useState(user[0]);
  return (
    <div className="conversation-room">
      <div className="conversation-room-header">
        <div className="left">
          <img src={user.image} alt={`${user.name}`} />
          <div className="name-mobile">
            <p>
              {user.name} - {user.mobile}
            </p>
            <p>{user.lastSeen}</p>
          </div>
        </div>
        <div className="right">
          <IconButton color="secondary" aria-label="back">
            <ArrowBackIcon onClick={() => setSelectedRoom(null)} />
          </IconButton>
        </div>
      </div>
      <div className="conversation-room-body">
        {roomMessages.map((message) => (
          <Message message={message} />
        ))}
      </div>
      <div className="conversation-room-footer">
        <input type="text" />
        <SendIcon />
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
