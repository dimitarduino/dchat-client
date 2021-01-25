import axios from '../axios'

export const setToken = token => {
    if (token) {
        axios.defaults.headers.common['auth-token'] = token;

    } else {
        delete axios.defaults.headers.common["auth-token"];
    }
}


export const zemiKorisnik = (userId, korisnici) => {
    if (userId) {
        return korisnici.filter(user => user._id == userId)[0];

    } else {
        return [];
    }
} 

export const zemiSiteGrupi = (userId, grupi) => {
    let tempGrupi = grupi.map(grupa => {
        if (grupa.korisnici.includes(userId)) return grupa;
    });

    var sortiraniGrupi = tempGrupi.sort((a,b) => (a.poslednaPoraka < b.poslednaPoraka) ? 1 : ((b.poslednaPoraka < a.poslednaPoraka) ? -1 : 0));
    
    return sortiraniGrupi;
}

export const zemiSitePoraki = (grupa, poraki) => {
    if (poraki) {
        return poraki.filter(poraka => (poraka.grupa === grupa._id && grupa.korisnici.includes(poraka.isprakjac)));
    } else {
        return [];
    }
}

export const zemiKorisnikPoraka = (isprakjac, korisnici) => {
    if (isprakjac && korisnici) {
        return korisnici.filter(korisnik => korisnik._id == isprakjac)[0];
    } else {
        return [];
    }
} 