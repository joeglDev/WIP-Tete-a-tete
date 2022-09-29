const app = require("./app");
const http = require("./io/app.socket");
const socketPort = process.env.PORT || 10001;


const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening on ${PORT}...`);
  });

  http.listen(socketPort, () => {
    console.log(`Server listening on ${socketPort}`);
  });



  