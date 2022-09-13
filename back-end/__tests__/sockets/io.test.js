const { createServer } = require("http");
const Client = require("socket.io-client");
const app = require("../../app");
const socketIO = require("../../io/app.socket");
let io, serverSocket, clientSocket;

beforeAll((done) => {
  app.listen(() => {
    //const port = httpServer.address().port;
    //console.log(port)
    clientSocket = new Client(`http://localhost:9090`);
    //socketIO.on("connection", (socket) => {
    //  serverSocket = socket;
    //});

    console.log("socketIO", socketIO);
    console.log("clientsocket", clientSocket)

    clientSocket.on("connect", done);
  });
});

afterAll(() => {
  socketIO.close();
  clientSocket.close();
});


describe("instances a new chat room which users can connect to", () => {
  test("correctly handles a user join event", () => {
    console.log("In test")
    clientSocket.on("connected", (arg) => {
      expect(arg).toBe("Client connected");
      done();
    });
    
  });
});
