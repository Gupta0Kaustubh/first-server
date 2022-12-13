// server creation

const http = require("http");
const { on } = require("nodemon");

const port = 8081;

const toDoList = ["Need to learn", "Need to code"];

// http method :-
    // GET     => Getting certain details from server. (default method, and it can directly work on any browser)
    // PUT     => Overwrite/ fully-update 
    // DELETE  => Deleting data from server
    // PATCH  => Update very fiew fields / certain fields
    // POST    => Sending data to the server

http
  .createServer((req, res) => {
    // res.writeHead(200, { "Content-Type": "text/html" });      // 200 -> Succcess
    // res.write("<h4>Hello, This is from Kaustubh's new server</h4>");
    // res.end();

    // const { method, url } = req;
    // console.log(method, url);
    // res.end();

    const { method, url } = req;
    if (url === "/todos") {
      // http://localhost:8081/todos
      if (method === "GET") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(toDoList.toString());
      } else if (method === "POST") { 
        let body = "";
        req.on('error', (err) => {
          console.log(err);
        }).on('data', (chunk) => {
          body += chunk;    // body = body + chunk;
          // console.log(chunk);
        }).on('end', () => {
          body = JSON.parse(body);
          // console.log("Body data : ", body);
          let newToDo = toDoList;
          newToDo.push(body.item);
          console.log(newToDo);
          res.writeHead(201);
        });
        }  else if (method === "DELETE") {
        let body = '';
        req.on('error', (err) => {
          console.log(err);
        })
          .on('data', (chunk) => {
            body += chunk;
          })
          .on('end', () => {
            body = JSON.parse(body);
            let deleteItem = body.item;
            for (let i = 0; i < toDoList.length; i++) {
              if (toDoList[i] === deleteItem) {
                toDoList.splice(i, 1);
                break;
              }
            }
            res.writeHead(204);
          })
           }  else {
                 res.writeHead(501);
              }
    }
    else {
      res.writeHead(404);
    }
    res.end();
    
  })
  .listen(port, () => {
    console.log(`My NodeJs server started on port ${port}`);
  });


// http://localhost:8081
// http://localhost:8081/
// http://localhost:8081/home
// http://localhost:8081/aboutus
// http://localhost:8081/contactus


// To start the server -> node server.js      (in Terminal)
// To start the server -> npm start           (in Terminal)
// To start the server -> npm run dev         (in Terminal)

// npm i nodemon

// CTRL+C --> for ending the server           (in Terminal)
// JSON   --> JavaScript Object Notation  (used so that the data is passed in form of "chunks")

// POSTMAN api
// INSOMNIA api


// SSR (Server Side Rendered) --> 
/*
  url : http://localhost:8081/todos (req)
  Server Side Data (res)
  html, css, JS
  refresh everytime (drawback)
  slow
  not user-friendly
  all the front-end related computation happens on server side
*/

// CSR (Client Side Rendered) --> 
/*
  url : http://localhost:8081 (req)
  Server Side Data (res)
  html, css, JS(tons of js operations would be carried here)
  all the front-end related computation happens on client side
  won't refresh
  faster
  low cost of server(bcoz we are not raising a new request for every reload)
*/