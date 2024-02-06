"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
// let isFirstRun = true;
const PerChat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [inbox, setInbox] = useState(["msg1", "msg2"]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    // if (isFirstRun) {
      const newSocket = io("http://localhost:3001");
      newSocket.on("message", (message) => {
        setInbox((prev) => [...prev, message]);
      });
      setSocket(newSocket);
    //   isFirstRun = false;
    // }
  }, []);

  const sendMessage = () => {
    socket.emit("message", message, roomName);
    setMessage("");
  };

  const joinRoom = () => {
    socket.emit("join-room", roomName);
  };

  return (
    <div className=" grid gap-4">
        <h1 className=" text-xl ">ID: {socket?.id}</h1>
      <div className="grid gap-6 my-8">
        {inbox.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      <div className=" flex gap-4 items-center">
        <input
          className="inputTag"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button className=" actionButtonTag" onClick={sendMessage}>
          Send
        </button>
      </div>
      <div className=" flex gap-4 items-center">
        <input
          className="inputTag"
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Type a Room Name"
        />
        <button className=" actionButtonTag" onClick={joinRoom}>
          Join
        </button>
      </div>
    </div>
  );
};

export default PerChat;
