import io from "socket.io-client";
import { useState } from "react";
import Chats from "./Chats";
import { useSelector, useDispatch } from "react-redux";
import { setMsgList } from "./features/socketSlice.jsx";

const socket = io.connect("http://localhost:3005");

function App() {
  const [showChat, setShowChat] = useState(false);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const dispatch = useDispatch();

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room), chat();
    }
  };

  console.log(useSelector((state) => state.socket.msgList));

  return (
    <main>
      {!showChat ? (
        <>
          <h3>JOIN A ROOM</h3>

          <input type="text" placeholder="username..." onChange={(e) => setUsername(e.target.value)} />
          <br />
          <input type="text" placeholder="Room ID..." onChange={(e) => setRoom(e.target.value)} />
          <br />
          <button onClick={joinRoom}>ENTER</button>
        </>
      ) : (
        <Chats socket={socket} username={username} room={room} chat={chat} />
      )}
    </main>
  );
}

export default App;
