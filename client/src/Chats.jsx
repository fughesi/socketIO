import { useEffect, useState } from "react";

export default function Chats({ socket, username, room }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message !== "") {
      const data = {
        room,
        author: username,
        message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", data);
    }
  };

  console.log(message);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div>
      <div className="chatHeader">
        <p>LIVE CHAT</p>
      </div>
      <div className="chatBody">
        <p>{message}</p>
      </div>
      <div className="chatFooter">
        <input type="text" placeholder="chat..." onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}