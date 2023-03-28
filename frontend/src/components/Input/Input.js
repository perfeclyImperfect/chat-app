import React from "react";
import "./Input.css";
import { BiSend } from "react-icons/bi";

const Input = ({ setMessage, sendMessage, message }) => (
  <div className="mobile-bottom">
    <form className="form">
      <textarea
        rows="4"
        
        className="textInput"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyDown={(event) => (event.code === "Enter" ? sendMessage(event) : null)}
      />
      <div className="sendButton">
        <span onClick={(e) => sendMessage(e)}>
          <BiSend />
        </span>
      </div>
    </form>
  </div>
);
export default Input;
