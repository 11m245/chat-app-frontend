import { useEffect, useState } from "react";
import { socket } from "../../App";
import { Header } from "../../components/Header";
import { ConversationRoom } from "../../components/ConversationRoom";
import { ChatRoomsList } from "../../components/ChatRoomsList";
function ChatPage() {
  const users = [
    {
      image:
        "https://icon2.cleanpng.com/20180615/hxf/kisspng-avatar-user-profile-male-logo-profile-icon-5b238cafcb8559.4398361515290564318336.jpg",
      name: "siva",
      _id: 1,
      lastSeen: 1682441599000,
      mobile: 9500852762,
    },
  ];
  const [selectedRoom, setSelectedRoom] = useState(null);
  useEffect(() => {
    socket.emit("userConnection", "sivaraj connected");
  }, []);
  return (
    <>
      <div className="page chat-page-container">
        <div className="mobile-chat-page">
          {!selectedRoom ? (
            <>
              <Header />
              <ChatRoomsList
                users={users}
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
              />
            </>
          ) : (
            <ConversationRoom
              users={users}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
            />
          )}
        </div>
      </div>
    </>
  );
}

export { ChatPage };
