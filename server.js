const http = require("http");
const app = require("./server/app");

const PORT = 8081;

const server = http.createServer(app);
const io = require("socket.io")(server, { origins: "*:*" });
const socketConnect = require("./server/socket/socket");

socketConnect(io);
server.listen(PORT);
