import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMsgList } from "./features/socketSlice.jsx";

export default function Chats({ socket, username, room }) {
  const [msgList, setMsgList] = useState([]);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const sendMessage = async () => {
    if (message !== "") {
      const messageContent = {
        room,
        author: username,
        message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageContent);
      setMsgList((i) => [...i, messageContent]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgList((i) => [...i, data]);
    });
  }, [socket]);

  console.log(msgList);

  return (
    <div>
      <div className="chatHeader">
        <p>LIVE CHAT</p>
      </div>
      <div className="chatBody">
        {msgList.map((i, index) => {
          return (
            <div key={index}>
              <div className="messageContent">
                <p>{i.message}</p>
              </div>
              <div className="messageMeta">
                <p>from: {i.author}</p>
                <p>at: {i.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chatFooter">
        <input
          type="text"
          placeholder="chat..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
