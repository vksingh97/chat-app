const socket = io();

let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message_area");

do {
  name = prompt("Please enter your name");
} while (!name);

textarea.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage(event.target.value);
  }
});

const sendMessage = (message) => {
  let msg = {
    user: name,
    message: message.trim(),
  };

  //Apend
  appendMessage(msg, "outgoing");
  scrollToBottom();

  //send to server
  socket.emit("message", msg);
  textarea.value = "";
};

const appendMessage = (msg, type) => {
  let mainDiv = document.createElement("div");
  let className = type;

  mainDiv.classList.add(className, "message");

  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>`;

  mainDiv.innerHTML = markup;

  messageArea.appendChild(mainDiv);
};

//Receive message

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

const scrollToBottom = () => {
  messageArea.scrollTop = messageArea.scrollHeight;
};
