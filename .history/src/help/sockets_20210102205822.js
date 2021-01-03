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
  socket.on('createMessage', (content, grupa, isprakjac) => {
   console.log('nova poraka');
    return cb({
      grupa, content, isprakjac
    });
  });
}

export const vleziVoGrupi = (grupi, userId) => {
  if (grupi) {
    if (socket) {
      let tempGrupi = grupi.map(grupa=>grupa._id);
      
      socket.emit('join', tempGrupi, userId);
    }
  }
}

export const ispratiPorakaSocket = (grupa, poraka, isprakjac, cb = null, users=[], novRoom = false) => {
  console.log(grupa);
  if (socket) {
    socket.emit('newMessage', { poraka, grupa, isprakjac, users, novRoom });
    cb({
      sodrzina: poraka,
      grupa, isprakjac
    });
  }
}