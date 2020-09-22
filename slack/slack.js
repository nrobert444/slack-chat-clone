const express = require('express')
const app = express()
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'))
const expressServer = app.listen(9000, () => {
  console.log('App listening on port 9000!')
})
const io = socketio(expressServer)
io.on('connection', socket => {
  socket.emit('messageFromServer', { data: 'welcome to the socket io server' })
  socket.on('messageToServer', dataFromClient => {
    console.log(dataFromClient)
  })
  socket.join('level1')
  socket
    .to('1level1')
    .emit('joined', `${socket.id} says I have joined the level 1 room`)
})

io.of('/admin').on('connection', socket => {
  console.log('Someone connected to the admin namespace!')
  io.of('/admin').emit('welcome', 'Welcome to the admin channel')
})
