import { useContext, useEffect, useState } from "react";
import { appContext, socket } from "../../App";
import { Header } from "../../components/Header";
import { ConversationRoom } from "../../components/ConversationRoom";
import { ChatRoomsList } from "../../components/ChatRoomsList";
function ChatPage() {
  const { selectedRoom, setSelectedRoom, socket, users, setUsers } =
    useContext(appContext);
  useEffect(() => {
    socket.emit("new_user");
  }, []);

  useEffect(() => {
    socket.on("all_users", (data) => {
      console.log(" listen all_users", data);
      setUsers(data);
    });
  }, []);
  return (
    <>
      <div className="page chat-page-container">
        <div className="mobile-chat-page">
          {selectedRoom ? (
            <ConversationRoom />
          ) : (
            <>
              <Header />
              <ChatRoomsList />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export { ChatPage };
