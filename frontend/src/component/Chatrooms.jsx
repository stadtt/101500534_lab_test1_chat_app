import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";
import MessageAPI from "../api/MessageApi/MessageApi";


const SOCKET_URL = "http://localhost:3001";
const rooms = ["devops", "backend", "frontend"];

const Chatroom = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [currentRoom, setCurrentRoom] = useState("devops");
  const [messages, setMessages] = useState({ devops: [], backend: [], frontend: [] });
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);

  // Load persisted messages when room changes
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const savedMessages = await MessageAPI.getMessages(currentRoom);
        setMessages((prev) => ({
          ...prev,
          [currentRoom]: savedMessages.map(msg => `${msg.from_user}: ${msg.message}`)
        }));
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };
    
    loadMessages();
  }, [currentRoom]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, { transports: ["websocket"] });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server", newSocket.id);
      newSocket.emit("joinRoom", currentRoom);
    });

    newSocket.on("message", (msg) => {
      if (msg.room && msg.message) {
        setMessages((prev) => ({
          ...prev,
          [msg.room]: [...prev[msg.room], msg.message],
        }));
      }
    });

    return () => newSocket.disconnect();
  }, []);

  const switchRoom = (room) => {
    setCurrentRoom(room);
    if (socket) {
      socket.emit("joinRoom", room);
    }
  };

  const sendMessage = () => {
    if (!input.trim() || !socket) return;

    const messageText = `${username}: ${input}`;
    const payload = { 
      room: currentRoom, 
      message: messageText,
      username: username
    };
    
    socket.emit("chatMessage", payload);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleLogout = () => {
    localStorage.clear();
    if (socket) {
      socket.disconnect();
    }
    navigate("/login");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Chatroom</h2>

    
      <div className="btn-group mb-3 w-100" role="group">
        {rooms.map((room) => (
          <button
            key={room}
            type="button"
            className={`btn ${room === currentRoom ? "btn-primary" : "btn-secondary"}`}
            onClick={() => switchRoom(room)}
          >
            {room.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Chat messages */}
      <div
        className="border rounded p-3 mb-3 bg-light"
        style={{ height: "300px", overflowY: "scroll" }}
      >
        {messages[currentRoom].map((msg, idx) => (
          <div key={idx} className="alert alert-success py-1 my-1">
            {msg}
          </div>
        ))}
      </div>

      {/* Input and send */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={`Message in ${currentRoom}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>

      {/* Logout button */}
      <button className="btn btn-danger w-40" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Chatroom;
