import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import "./Chat.css";

import Input from "../Input/Input";
import InfoBar from "../InfoBar/InfoBar";
import Messages from "../Messages/Messages";
import RoomInfo from "../RoomInfo/RoomInfo";

import toast from "react-hot-toast";

const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT);

const Chat = ({ location }) => {
  location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {
      setTimeout(() => {
        toast.success("Welcome to room " + room);
      }, 300);
    });

    socket.on("usersInRoom", (usersInRoom) => {
      usersInRoom = usersInRoom.usersInRoom.map((user) => user.name);
      setUsersInRoom(usersInRoom);
    });

    socket.on("error", (data) => {
      console.count("count");
      console.log(data.message);
      navigate("/");
      toast.error("Username Exsit");
    });
    // eslint-disable-next-line
  },  [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", { name, room, message }, () => setMessage(""));
    }
  };

  console.log(message, messages);

  // Func for sending messages
  return (
    <div className="outerContainer animate__animated animate__bounceInDown">
      <div className="roomInfoDiv">
        <RoomInfo usersInRoom={usersInRoom} username={name} />
      </div>
      <div className="containers">
        <InfoBar room={room} usersInRoom={usersInRoom} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
