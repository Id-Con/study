const socket = io();
const welcome = document.querySelector("#welcome");
const roomForm = welcome.querySelector("form");

const handleRoomSubmit = (e) => {
  e.preventDefault();
  const input = roomForm.querySelector("input");
  socket.emit("room_enter", { payload: input.value }, () => {
    console.log("server is done!");
  });
  input.value = "";
};

roomForm.addEventListener("submit", handleRoomSubmit);
