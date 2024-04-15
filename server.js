const express = require('express');
const path = require('node:path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/favicon.ico', (req, res) => {
  res.render('favicon.ico');
});

app.get('/', (req, res) => {
  res.render('index.html');
});

let messages = [];

io.on('connection', (socket) => {
  socket.emit('previousMessage', messages)

  socket.on('sendMessage', (data) => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data);
  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});