const socket = io();

const welcome = document.querySelector("#welcome");
const readyRoom = welcome.querySelector("#readyRoom");
// const roomName = readyRoom.querySelector("#roomName");
// const nickName = readyRoom.querySelector("#nickName");

const room = document.querySelector("#room");
room.hidden = true;

let roomTitle;

const addMessage = (message) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.append(li);
};

const handleMessageSubmit = (e) => {
  e.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  socket.emit("new_message", input.value, roomTitle, () => {
    addMessage(`내 메세지: ${value}`);
  });
  input.value = "";
};

const showRoom = () => {
  room.hidden = false;
  welcome.hidden = true;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomTitle}`;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
};

const handleRoomSubmit = (e) => {
  e.preventDefault();
  const roomName = readyRoom.querySelector("#roomName");
  const nickName = readyRoom.querySelector("#nickName");
  socket.emit("enter_room", roomName.value, nickName.value, showRoom);
  roomTitle = roomName.value;
};

readyRoom.addEventListener("submit", handleRoomSubmit);

// 메세지 관련
socket.on("welcome", (user) => {
  addMessage(`${user}님이 들어왔습니다.`);
});

socket.on("bye", (user) => {
  addMessage(`${user}님이 나갔습니다.`);
});

socket.on("new_message", addMessage);
