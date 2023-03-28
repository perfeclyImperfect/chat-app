import React from "react";
import "./Message.css";
import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    <div>
      {isSentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
          <div className="messageBox backgroundBlue userBox">
            {/* <span className="sentText pr-10"> {trimmedName}</span> */}
            <span className="messageText colorWhite "> {ReactEmoji.emojify(text)}</span>
          </div>
        </div>
      ) : (
        <div className="messageContainer justifyStart">
          <div className="messageBox otherUsersBox backgroundLight">
            {user !== "admin" && (
              <>
                <span className="sentText pl-10" style={{ color: "#f44336" }}>
                  {user}
                </span>
              </>
            )}
            {user === "admin" && (
              <>
                <span className="sentText pl-10 colorDark"> ~ {user} ~</span>
              </>
            )}
            <span className="messageText colorDark"> {ReactEmoji.emojify(text)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
