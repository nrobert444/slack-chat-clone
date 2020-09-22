const express = require('express')
const app = express()
const socketio = require('socket.io')

let namespaces = require('./data/namespaces')

app.use(express.static(__dirname + '/public'))
const expressServer = app.listen(9000, () => {
  console.log('App listening on port 9000!')
})
const io = socketio(expressServer)

io.on('connection', socket => {
  let nsData = namespaces.map(ns => {
    return {
      img: ns.img,
      endpoint: ns.endpoint
    }
  })
  socket.emit('nsList', nsData)
})

namespaces.forEach(namespace => {
  io.of(namespace.endpoint).on('connection', socket => {
    console.log(`${socket.id} has joined ${namespace.endpoint}!`)
  })
})
