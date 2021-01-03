import io from 'socket.io-client';

let socket;
export const inicijalizirajSocket = (grupa) => {
  socket = io('http://localhost:8000');
}
export const diskonektirajSocket = () => {
  if(socket) socket.disconnect();
}
export const pretplataChat = (cb) => {
  if (!socket) return(true);
  socket.on('createMessage', (content, grupa, sender) => {
   console.log('nova poraka');
    return cb({
      grupa, content, sender
    });
  });
}

export const joinRooms = (rooms, userId) => {
  if (rooms) {
    if (socket) {
      let tempRooms = rooms.map(grupa=>grupa._id);
      
      socket.emit('join', tempRooms, userId);
    }
  }
}

export const sendMessage = (grupa, message, sender, cb = null, users=[], novRoom = false) => {
  console.log(grupa);
  if (socket) {
    socket.emit('newMessage', { message, grupa, sender, users, novRoom });
    cb({
      content: message,
      grupa, sender
    });
  }
}