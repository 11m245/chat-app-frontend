import { useEffect } from "react";
import { socket } from "../../App";
function ChatPage() {
  useEffect(() => {
    socket.emit("userConnection", "sivaraj connected");
  }, []);
  return (
    <>
      <h3>chat page</h3>
    </>
  );
}

export { ChatPage };
