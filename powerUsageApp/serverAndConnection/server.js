//headers for API
const http = require("http");

const app = require("./index");
//server running port number
const port = 3305;

const server = http.createServer(app);

server.listen(port);
