const NAMESPACES = require("./namespaces");
const redis = require("../redis/RedisStore");

const socketConnect = io => {
  NAMESPACES.forEach(namespace => {
    const nspSocket = io.of(namespace);

    nspSocket.on("connection", socket => {
      const username = socket.handshake.query.username;
      const roomId = socket.handshake.query.roomId;

      joinEvent(socket, nspSocket, username);
      enterEvent(socket, nspSocket, roomId, username);
      chatEvent(socket, nspSocket);
      mySocketEvent(socket);
      webRtcOfferEvent(socket, nspSocket);
      webRtcAnswerEvent(socket, nspSocket);
      changeStreamStatus(socket, nspSocket, roomId, username);
      redis.updateRoom(namespace.substring(1), roomId, `${namespace.substring(1)}:${roomId}`, { name : 'numberOfPerson', data: 'enter' });

      socketCloseEvent(socket, namespace, roomId);
    });
  });
};

const socketCloseEvent = (socket, namespace, roomId) => {
  socket.on('disconnect' || "close", () => {
    socket.leave(roomId);
    redis.updateRoom(namespace.substring(1), roomId, `${namespace.substring(1)}:${roomId}`, { name : 'numberOfPerson', data: 'leave' });
  });
}

const webRtcAnswerEvent = (socket, nspSocket) => {
  socket.on("answer", ({ data, mySocketId, targetSocketId }) => {
    nspSocket.to(targetSocketId).emit("backAnswer", {
      answer: data,
      targetSocketId: mySocketId,
      mySocketId: targetSocketId
    });
  });
};

const webRtcOfferEvent = (socket, nspSocket) => {
  socket.on("offer", ({ data, mySocketId, targetSocketId }) => {
    nspSocket.to(targetSocketId).emit("backOffer", {
      offer: data,
      targetSocketId: mySocketId,
      mySocketId: targetSocketId
    });
  });
};

const mySocketEvent = socket => {
  socket.on("mySocket", () => {
    socket.emit("socketAnswer", socket.id);
  });
};

const joinEvent = (socket, nspSocket, username) => {
  socket.on("join", roomId => {
    socket.join(roomId);
    nspSocket.in(roomId).emit("join", {
      from: "server:entrance",
      msg: username
    });
    nspSocket.in(roomId).emit("enter");
  });
};

const enterEvent = (socket, nspSocket, roomId, username) => {
  socket.on("enter", hasStream => {
    const user = { username, socketId: socket.id, hasStream };

    nspSocket.in(roomId).clients((err, clients) => {
      nspSocket.in(roomId).emit("sendUserInfo", {
        user: user,
        userNumbers: clients.length
      });
    });
  });
};

const changeStreamStatus = (socket, nspSocket, roomId, username) => {
  socket.on("setStream", () => {
    const user = { username, socketId: socket.id, hasStream: true };
    nspSocket.in(roomId).emit("setStreamAnswer", user);
  });
};

const chatEvent = (socket, nspSocket) => {
  socket.on("chat", data => {
    const { roomId, from, msg } = data;
    nspSocket.in(roomId).emit("chat", { from, msg });
  });
};

module.exports = socketConnect;
