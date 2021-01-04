import io from 'socket.io-client';

let socket;
export const inicijalizirajSocket = (grupa) => {
  socket = io(process.env.NODE_ENV == "production" ? "https://dchat-backend.herokuapp.com/" : 'http://localhost:8080/');
}
export const diskonektirajSocket = () => {
  if(socket) socket.disconnect();
}
export const pretplataChat = (cb) => {
  console.log('pretplata');
  if (!socket) return(true);
  socket.on('nacrtajPoraka', (sodrzina, grupa, isprakjac) => {
   console.log('nova poraka');
    return cb({
      grupa, sodrzina, isprakjac
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

export const ispratiPorakaSocket = (grupa, poraka, isprakjac, cb = null, korisnici=[], novaGrupa = false) => {
  console.log(grupa);
  if (socket) {
    socket.emit('novaPoraka', { poraka, grupa, isprakjac, korisnici, novaGrupa });
    cb({
      sodrzina: poraka,
      grupa, isprakjac
    });
  }
}