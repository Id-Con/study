const socket = io();

const welcome = document.querySelector("#welcome");
const room = document.querySelector("#room");
const roomChooseForm = welcome.querySelector("form");

room.hidden = true;

let roomName;

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
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
};

const showRoom = () => {
  room.hidden = false;
  welcome.hidden = true;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
};

const handleRoomSubmit = (e) => {
  e.preventDefault();
  const input = roomChooseForm.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
};

roomChooseForm.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  addMessage("누군가가 들어 왔습니다.");
});

socket.on("bye", () => {
  addMessage("누군가가 나갔습니다.");
});

socket.on("new_message", addMessage);
