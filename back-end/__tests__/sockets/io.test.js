const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const socketIO = require("../../io/app.socket");

let io, serverSocket, clientSocket;

beforeAll((done) => {
  const httpServer = createServer();
  io = new Server(httpServer);

  httpServer.listen(() => {
    const port = httpServer.address().port;
    clientSocket = new Client(`http://localhost:${port}`);
    io.on("connection", (socket) => {
      serverSocket = socket;
    });
    clientSocket.on("connect", done);
  });
});

afterAll(() => {
  io.close();
  clientSocket.close();
});

describe("instances a new chat room which users can connect to", () => {
  test("correctly handles a user join event", (done) => {
    clientSocket.on("connection", (arg) => {
      expect(arg).toBe("Client connected");
      done();
    });
    serverSocket.emit("connection", "Client connected");
  });
});
