const socket = io();

const welcome = document.querySelector("#welcome");
const readyRoom = welcome.querySelector("#readyRoom");

const room = document.querySelector("#room");
room.hidden = true;

let roomTitle;

const handleMessageSubmit = (e) => {
  e.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  socket.emit("new_message", input.value, roomTitle, () => {
    addMessage(`${value}`, "my-message");
  });
  input.value = "";
};

const handleRoomSubmit = (e) => {
  e.preventDefault();
  const roomName = readyRoom.querySelector("#roomName");
  const nickName = readyRoom.querySelector("#nickName");
  socket.emit("enter_room", roomName.value, nickName.value, showRoom);
  roomTitle = roomName.value;
};

const showRoom = () => {
  room.hidden = false;
  welcome.hidden = true;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomTitle}`;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
};

readyRoom.addEventListener("submit", handleRoomSubmit);

// 메세지 관련
const addMessage = (message, who) => {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  if (who === "my-message") {
    li.classList.add("my-message");
  } else if (who === "other-message") {
    li.classList.add("other-message");
  } else {
    li.classList.add("gone");
  }
  li.innerText = message;
  ul.append(li);
};

socket.on("welcome", (user, usercount) => {
  addMessage(`${user}님이 들어왔습니다.`);
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomTitle} (${usercount})`;
});

socket.on("bye", (user, usercount) => {
  addMessage(`${user}님이 나갔습니다.`);
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomTitle} (${usercount})`;
});

socket.on("new_message", (message) => addMessage(message, "other-message"));

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = "";
  if (rooms.length === 0) {
    roomList.innerHTML = "";
    // return;
  }
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.classList.add("roomlist");
    li.innerText = room;
    roomList.append(li);
  });
});
