const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');


let io;
const connections = [];

exports.setupWebsocket = (server) =>{
   io = socketio(server);
  
  
  io.on('connection', socket => {
    const {latitude, longitude, techs} = socket.handshake.query;
    
    connections.push({
      id: socket.id,
      coodinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs)

    });
   
  });
}


exports.findConnections = (coodinates, techs) =>{
  return connections.filter(connection =>{
    return calculateDistance(coodinates, connection.coodinates)< 10
      && connection.techs.some(item => techs.includes(item))
  })
}
exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  })
}