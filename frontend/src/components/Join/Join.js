import "./Join.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ImUser } from "react-icons/im";
import { TbDoor } from "react-icons/tb";

import toast from "react-hot-toast";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    if (!name || !room) {
      event.preventDefault();
      toast.error("Name and room fields are required. ");
      return;
    }
    if (room < 1 || room > 20) {
      event.preventDefault();
      toast.error("Room Must be between 1 -20");
    } else {
      navigate(`/chat?name=${name}&room=${room}`);
    }
  };

  return (
    <div className="container">
      <div className="joinOuterContainer ">
        <div className="joinInnerContainer">
          <h1 className="heading">Join </h1>

          <p className="instructions">Pick a unique username and room between 1-20</p>
          <div>
            <span className="userIcon">
              <ImUser />
            </span>{" "}
            <input
              placeholder="Name"
              className="joinInput"
              type="text"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <span className="doorIcon">
              <TbDoor />
            </span>{" "}
            <input
              placeholder="Room"
              className="joinInput mt-20"
              type="number"
              min={1}
              max={20}
              onChange={(event) => setRoom(event.target.value)}
            />
          </div>

          <button className="signInBtn mt-20" type="submit" onClick={onSubmit}>
            {" "}
            Sign In{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
