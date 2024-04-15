const socket = io('http://localhost:3000');

const chat = document.getElementById('chat');
const messages = document.querySelector('.messages');

function renderMessage(message) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  msgDiv.innerHTML = `<strong>${message.author}</strong>: ${message.message}`;

  messages.appendChild(msgDiv);
}

chat.addEventListener('submit', function(event) {
  event.preventDefault();

  var author = document.querySelector('input[name=username]').value;
  var message = document.querySelector('input[name=message]').value;

  if(author.length && message.length) {
    var messageObject = {
      author: author,
      message: message,
    };

    
    socket.emit('sendMessage', messageObject);
    document.querySelector('input[name="message"]').value = '';
    renderMessage(messageObject);
  }
  });

  socket.on('receivedMessage', function(message) {
    renderMessage(message);
  });

  socket.on('previousMessage', function(message) {
    for (msg of message) {
      renderMessage(msg)
    }
  });
