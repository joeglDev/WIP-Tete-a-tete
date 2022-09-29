const app = require("./app");
const http = require("./io/app.socket");
const { Port } = require("../shared/Port");


const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
  });

  http.listen(Port.socketPort, () => {
    console.log(`Server listening on ${Port.socketPort}`);
  });



  