import { TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
function ChatRoomsList({ users, selectedRoom, setSelectedRoom }) {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const handleSearch = (e) => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  return (
    <>
      <div className="input-wrapper">
        <TextField
          name="userSearch"
          label="Search By Name"
          type="search"
          variant="filled"
          onChange={handleSearch}
          className="chat-room-filter-input"
        />
      </div>
      <div className="chat-rooms-list">
        {filteredUsers.map((user) => (
          <Room
            user={user}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        ))}
      </div>
    </>
  );
}

function Room({ user, setSelectedRoom }) {
  return (
    <div
      className="room-wrapper"
      onClick={() =>
        setSelectedRoom(
          localStorage.getItem("chatEmail") < user.email
            ? localStorage.getItem("chatEmail") + "_" + user.email
            : user.email + "_" + localStorage.getItem("chatEmail")
        )
      }
    >
      <div className="left">
        <img
          src={
            user.image ||
            "https://icon2.cleanpng.com/20180615/hxf/kisspng-avatar-user-profile-male-logo-profile-icon-5b238cafcb8559.4398361515290564318336.jpg"
          }
          alt={`${user.name}`}
        />
        <div className="name-mobile">
          <span>{user.name}</span>
          <span>{user.mobile}</span>
        </div>
      </div>
      <div className="right">
        <p>{moment(user.lastSeen).fromNow()}</p>
      </div>
    </div>
  );
}

export { ChatRoomsList };
