import React, { useState, useEffect, useContext } from 'react'
import Avatar from 'react-avatar'
import { AiFillSetting } from 'react-icons/ai'

import ChatContext from '../context/chat/chatContext'
import AuthContext from '../context/auth/AuthContext'
import { zemiKorisnik } from '../help/functions';

export default function Members() {
    const { grupa, izmeniGrupa, namestiNovaGrupa } = useContext(ChatContext);
    const { users, najdiKorisnikPoMail, novaGrupaMsg, poslednoDodadenMail } = useContext(AuthContext);
    const [tempKorisnici, namestiTempKorisnici] = useState([]);
    const [semenuva, namestiSemenuva] = useState(false);
    const [grupaNaslov, namestiGrupaNaslov] = useState('');
    const [change, setChange] = useState(false);
    const [email, setEmail] = useState("");

    const submitForm = async e => {
        e.preventDefault();

        await najdiKorisnikPoMail(email);
        setChange(!change);
    }

    useEffect(() => {
        if (poslednoDodadenMail) {
            if (poslednoDodadenMail.email.trim() != "") {
                let posledenEmailPostoi = tempKorisnici.some(tempkorisnik => tempkorisnik.email == poslednoDodadenMail.email);
    
                if (posledenEmailPostoi == false) {
                    let noviKorisnici = tempKorisnici;
                    noviKorisnici.push(poslednoDodadenMail);
    
                    namestiTempKorisnici(noviKorisnici);
                    setEmail('');
                }
            }

        }
    }, [poslednoDodadenMail, change]);

    useEffect(() => {
        if (grupa) {
            let tmails = [];

            for (let i = 0; i < grupa.korisnici.length; i++) {
                for (let j = 0; j < users.length; j++) {
                    console.log(users[j]._id);
                    console.log(grupa.korisnici[i]);
                    if (grupa.korisnici[i] == users[j]._id) {
                        console.log('isto e');
                        tmails.push({
                            id: users[j]._id,
                            email: users[j].email
                        });
                    }
                }
            }

            namestiTempKorisnici(tmails);
            namestiGrupaNaslov(grupa.ime);
        }
        
    }, [grupa]);

    const otstraniOdTemp = async (korisnikZaB) => {
        let noviKorisnici = tempKorisnici.filter(korisnik => korisnik.email != korisnikZaB.email);

        namestiTempKorisnici(noviKorisnici);
    }

    const izmeniGrupaAsync = async () => {
        let korisnici = tempKorisnici.map(tk => {
            let rmId = tk.id;

            if (!!tk._id) rmId = tk._id;

            return rmId;
        });

        await izmeniGrupa(grupa._id, grupaNaslov, korisnici);

        namestiSemenuva(false);
        namestiNovaGrupa(true);
    }


    return (
        <div className="members">
           {
                grupa.korisnici.map(userId => {
                    let user = zemiKorisnik(userId, users);

                    return (
                        <div key={user._id} className="member">
                            <div className="member-left">
                                <Avatar className="avatar" size="30" name={`${user.ime}`} />
                                <span className="member-name">{user.ime} {user.prezime}</span>
                            </div>
                            {/* <div onClick={() => namestiSemenuva(true)} className="member-right">
                                <AiFillSetting color="#444" size="20" />
                            </div> */}
                        </div>
                    )
                })
            }


{
                semenuva && (
                    <div className="newMessage-popup">
                        <div className="newMessage-popup__inner">
                            <div className="header">
                                <input value={grupaNaslov} onChange={(e) => namestiGrupaNaslov(e.target.value)} className="header-input" placeholder="Име на група" />
                                <span onClick={() => namestiSemenuva(false)}>&#10005;</span>
                            </div>

                            <div className="content">
                                {
                                     (tempKorisnici && tempKorisnici.length != 0) ? (
                                <div className="list">
                                    {
                                        tempKorisnici.map(tempkorisnik => (
                                        <div className="item">
                                            <p>{tempkorisnik.email}</p>
                                            <span onClick={() => otstraniOdTemp(tempkorisnik)}>&#10005;</span>
                                        </div>

                                        ))
                                    }
                                </div>

                                     ) : (
                                         <p className="noUsers">Нема корисници</p>
                                     )
                                }

                                <form onSubmit={submitForm} className="form">
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Еmail адреса на членот..." type="email"/>
                                    <button>+</button>
                                </form>

                                {
                                    (tempKorisnici && tempKorisnici.length != 0) && (
                                        <button onClick={izmeniGrupaAsync} className="createGroup">Зачувај промени</button>
                                    )
                                }
                                {
                                    novaGrupaMsg && (
                                         <div className="msg">
                                            <p>{novaGrupaMsg}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
