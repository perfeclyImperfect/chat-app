import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./RoomInfo.css";
import { RiContactsFill } from "react-icons/ri";

function Roominfo({ usersInRoom, username }) {
  let usersArr = usersInRoom;
  usersArr = usersInRoom.filter((names) => names !== username);
  return (
    <div className="cardContainer">
      <Card>
        <Card.Header>
          {" "}
          <RiContactsFill /> <span><b>Participents: ({usersInRoom.length})</b></span>{" "}
        </Card.Header>
        <ListGroup variant="flush" className="overflow-auto">
          <ListGroup.Item variant="flush"> {username} (you)</ListGroup.Item>
          {usersArr.map((names, key) => {
            return <ListGroup.Item key={key}>{names}</ListGroup.Item>;
          })}
          {/* <ListGroup.Item>yossi</ListGroup.Item> */}
          {/* <ListGroup.Item>yossi</ListGroup.Item> */}
          {/* <ListGroup.Item>yossi</ListGroup.Item> */}
          {/* <ListGroup.Item>yossi</ListGroup.Item> */}
          {/* <ListGroup.Item>yossi</ListGroup.Item> */}
          {/* <ListGroup.Item>yossi</ListGroup.Item> */}
          {/* <ListGroup.Item>yossi</ListGroup.Item> */}
          {/* <ListGroup.Item>yossi</ListGroup.Item> */}
          {/* <ListGroup.Item>yossi</ListGroup.Item> */}
          {/* <ListGroup.Item>yossi</ListGroup.Item> */}
          {/* <ListGroup.Item>yossi</ListGroup.Item> */}
        </ListGroup>
      </Card>
    </div>
  );
}

export default Roominfo;
