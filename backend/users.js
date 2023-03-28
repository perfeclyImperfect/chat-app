const users = [];

function addUser({ id, name, room }) {
  if (name && room) {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
  }

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (existingUser) {
    console.log("Username is taken");
    return { error: "Username is taken" };
  }

  const user = { id, name, room };
  users.push(user);

  return { user, users };
}

function removeUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getUser(id) {
  users.find((user) => user.id === id);
}

function getUsersInRoom(room) {
  const usersInRoom = users.filter((user) => user.room === room);
  return usersInRoom;
}

export default { addUser, removeUser, getUser, getUsersInRoom };
