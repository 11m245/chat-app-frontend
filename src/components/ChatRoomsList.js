import moment from "moment";
function ChatRoomsList({ users, selectedRoom, setSelectedRoom }) {
  return (
    <div className="chat-rooms-list">
      {users.map((user) => (
        <Room
          user={user}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
        />
      ))}
    </div>
  );
}

function Room({ user, setSelectedRoom }) {
  return (
    <div className="room-wrapper" onClick={() => setSelectedRoom(user._id)}>
      <div className="left">
        <img src={user.image} alt={`${user.name}`} />
        <div className="name-mobile">
          <p>{user.name}</p>
          <p>{user.mobile}</p>
        </div>
      </div>
      <div className="right">
        <p>{moment(user.lastSeen).fromNow()}</p>
      </div>
    </div>
  );
}

export { ChatRoomsList };
