const app = require(`${__dirname}/../app.js`);
//const cors = require(`${__dirname}/../app.js`);
const cors = require("cors");

const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
  cors: {
      origin:  '*'//"http://localhost:3000" 
  }
});

console.log(socketIO)

