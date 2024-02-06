const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user connected: " + socket.id);
  socket.on("message", (message, roomName) => {
    if(roomName.length){
      io.to(roomName).emit("message",message);
    }else{ 
      io.emit("message", message);
    }
  });
  socket.on("join-room", (roomName)=>{
    console.log(socket.id + " joining room " + roomName);
    socket.join(roomName)
  })
  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
});
