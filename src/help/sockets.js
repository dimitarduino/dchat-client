import io from 'socket.io-client';

let socket;
export const inicijalizirajSocket = (grupa) => {
  socket = io(process.env.NODE_ENV == "production" ? "https://dchat-backend.herokuapp.com/" : 'http://localhost:8000/');
}
export const diskonektirajSocket = () => {
  if(socket) socket.disconnect();
}
export const pretplataChat = (cbNovaPoraka, cbProcitanaPoraka) => {
  if (!socket) return(true);
  socket.on('nacrtajPoraka', (sodrzina, grupa, isprakjac) => {
    return cbNovaPoraka({
      grupa, sodrzina, isprakjac
    });
  });

  socket.on("seenPoraka", (grupa, korisnik) => {
    cbProcitanaPoraka(grupa, korisnik);
  });

  // socket.on('izbrisanKorisnikServer', (grupa) => {
  //   socket.emit('izbrisanKorisnikClient', grupa);

  //   cbIzbrisanKorisnik(true, grupa);
  // });
}

export const procitanoSocket = (grupa, korisnik, cb = null) => {
  socket.emit("seen", grupa, korisnik);
  if (cb) {
    cb();
  }
}

export const izbrisanKorisnik = (korisnik, grupa) => {
  socket.emit("izbrisanKorisnik", korisnik, grupa);
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
    socket.emit('novaPoraka', { poraka, grupa, isprakjac, korisniciPoraka: korisnici, novaGrupa });
    cb({
      sodrzina: poraka,
      grupa, isprakjac
    });
  }
}