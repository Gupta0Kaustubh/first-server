// server creation

const http = require("http");

const port = 8081;

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });      // 200 -> Succcess
    res.write("<h4>Hello, this is from Kaustubh's new server</h4>");
    res.end();
  })
  .listen(port, () => {
    console.log(`My NodeJs server started on port ${port}`);
  });


// http://localhost:8081
// To start the server -> node server.js      (in Terminal)
// To start the server -> npm start           (in Terminal)
// To start the server -> npm run dev     (in Terminal)

// npm i nodemon