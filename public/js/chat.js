const socket = io();

socket.on('connect', () => {
  const room = '<%= room %>';
  socket.emit('joinRoom', room);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = document.querySelector('#message-input').value;
  socket.emit('sendMessage', { room: '<%= room %>', message });
  document.querySelector('#message-input').value = '';
});

socket.on('receiveMessage', (message) => {
  const messageContainer = document.querySelector('#messages');
  const messageElement = document.createElement('li');
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
});
