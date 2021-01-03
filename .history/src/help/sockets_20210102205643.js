import io from 'socket.io-client';

let socket;
export const initiateSocket = (room) => {
  socket = io('http://localhost:8000');
  
}
export const disconnectSocket = () => {
  if(socket) socket.disconnect();
}
export const subscribeToChat = (cb) => {
  if (!socket) return(true);
  socket.on('createMessage', (content, room, sender) => {
   console.log('nova poraka');
    return cb({
      room, content, sender
    });
  });
}

export const joinRooms = (rooms, userId) => {
  if (rooms) {
    if (socket) {
      let tempRooms = rooms.map(room=>room._id);
      
      socket.emit('join', tempRooms, userId);
    }
  }
}

export const sendMessage = (room, message, sender, cb = null, users=[], novRoom = false) => {
  console.log(room);
  if (socket) {
    socket.emit('newMessage', { message, room, sender, users, novRoom });
    cb({
      content: message,
      room, sender
    });
  }
}