const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.on("listening_from_frontend", (roomId) => {
    socket.join(roomId);
    io.emit("emiting_from_server",roomId)
  });
  socket.on("disconnect", () => {
    console.log("Socket disconnected!!");
  });
});
const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket server is running...`);
});