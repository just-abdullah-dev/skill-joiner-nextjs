import { Server } from 'socket.io';

export default async function handler(req, res) {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.io...');
    const io = new Server(res.socket.server);

    // Handle chat room joining
    io.on('connection', (socket) => {
      socket.on('join-personal-chat', async (data) => {
        const { userId, otherUserId } = data;
        const roomName = generateChatRoomId(userId, otherUserId);
        socket.join(roomName);

        // ... (Retrieve chat history from MongoDB if needed)
      });

      // Handle message sending
      socket.on('send-personal-message', async (message) => {
        const room = socket.rooms[0]; // Assuming single chat room
        io.to(room).emit('personal-message', message);

        // ... (Store message in MongoDB if needed)
      });
    });

    // await connectDB();
  }
  res.send({message:"socket api runs"});
}

function generateChatRoomId(userId, otherUserId) {
  // Implement a logic to generate a unique room ID based on user IDs
  return `${userId}_${otherUserId}`; // Simple example
}
