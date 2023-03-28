import React, { useState } from "react";
import "./InfoBar.css";
import onlineIcon from "../../icons/onlineIcon.png";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { RiContactsLine, RiContactsFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";

const InfoBar = ({ room, usersInRoom }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="icon" />
        <h3>Room : {room}</h3>
      </div>
      {isOpen && (
        <Card className="usersNameList animate__animated animate__backInRight animate__faster">
          <ListGroup className="usersNameBox" variant="flush">
            {usersInRoom.map((name, key) => {
              return (
                <ListGroup.Item variant="flush" className="usersNameBox" key={key}>
                  {name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      )}
      <div className="rightInnerContainer">
        <span onClick={handleClick} className="usersBoxBtn">
          {isOpen ? <RiContactsFill /> : <RiContactsLine />}
        </span>
        <a href="/">
          <TbLogout style={{ color: "red"  , fontSize:'30px'}} />
        </a>
      </div>
    </div>
  );
};

export default InfoBar;
