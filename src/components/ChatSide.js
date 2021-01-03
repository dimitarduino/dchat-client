import React, { useState, useContext, useEffect } from 'react'
import Avatar from 'react-avatar'
import moment from 'moment'

import ChatContext from '../context/chat/chatContext'
import AuthContext from '../context/auth/AuthContext'
import { RiMessage2Line } from 'react-icons/ri'
import { zemiSitePoraki, zemiKorisnikPoraka } from '../help/functions'

export default function ChatSide({ poraki, users }) {
    //popup za nova grupa
    const [novaGrupaPopup, namestiNovaGrupaPopup] = useState(false);
    const [grupaNaslov, namestiGrupaNaslov] = useState('');
    const [email, namestiEmail] = useState('');

    //context
    const { user, najdiKorisnikPoMail, novaGrupaMsg, poslednoDodadenMail } = useContext(AuthContext);
    const { namestiAktivniPoraki, namestiGrupa, grupa, dodajNovaGrupa, grupi } = useContext(ChatContext);
    const aktivnaGrupa = grupa;
    const [change, setChange] = useState(false);
    const [tempKorisnici, namestiTempKorisnici] = useState([]);

    const submitForm = async e => {
        e.preventDefault();

        najdiKorisnikPoMail(email);
        setChange(!change);
    }

    useEffect(() => {
        if (poslednoDodadenMail) {
            if (poslednoDodadenMail.email.trim() != "") {
                let posledenMailPostoi = tempKorisnici.some(tempKorisnik => tempKorisnik.email == poslednoDodadenMail.email);

                if (posledenMailPostoi == false) {
                    let updatedKorisnici = tempKorisnici;
                    updatedKorisnici.push(poslednoDodadenMail);

                    namestiTempKorisnici(updatedKorisnici);
                    namestiEmail('');
                }
            }

        }
    }, [poslednoDodadenMail, change]);

    const createGroup = async () => {
        let tempKorisniciIds = tempKorisnici.map(mail => mail._id);

        if (tempKorisniciIds.includes(user._id) == false) {
            tempKorisniciIds.push(user._id);
        }
        console.log(grupaNaslov);
        const dodadenaGrupa = await dodajNovaGrupa(tempKorisniciIds.toString(), grupaNaslov);

        console.log(dodadenaGrupa);

        if (dodadenaGrupa) {
            namestiNovaGrupaPopup(false);
        }
    }

    const otstraniOdTemp = async (korisnik) => {
        let noviKorisnici = tempKorisnici.filter(tempKorisnik => tempKorisnik.email != korisnik.email);

        namestiTempKorisnici(noviKorisnici);
    }



    return (
        <div className="messages-list">
            <div className="messages-list-top container-small">
                <p>{grupi.length} пораки</p>
                <div onClick={() => namestiNovaGrupaPopup(true)} className="new-chat">
                    <RiMessage2Line size="24" />
                    <div className="plus-icon"><span>+</span></div>
                </div>
            </div>

            {
                novaGrupaPopup && (
                    <div className="newMessage-popup">
                        <div className="newMessage-popup__inner">
                            <div className="header">
                                <input value={grupaNaslov} onChange={(e) => namestiGrupaNaslov(e.target.value)} className="header-input" placeholder="Име на група" />
                                <span onClick={() => namestiNovaGrupaPopup(false)}>&#10005;</span>
                            </div>

                            <div className="content">
                                <div className="list">
                                    {
                                        tempKorisnici.map(temoKorisnik => (
                                            <div className="item">
                                                <p>{temoKorisnik.email}</p>
                                                <span onClick={() => otstraniOdTemp(temoKorisnik)}>&#10005;</span>
                                            </div>

                                        ))
                                    }
                                </div>

                                <form onSubmit={submitForm} className="form">
                                    <input value={email} onChange={(e) => namestiEmail(e.target.value)} placeholder="E-mail адреса на членот..." type="email" />
                                    <button>+</button>
                                </form>

                                {
                                    (tempKorisnici && tempKorisnici.length != 0) && (
                                        <button onClick={createGroup} className="createGroup">Направи група</button>
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

            <div className="chat-list-inner">
                {
                    grupi.map(grupa => {
                        if (grupa) {
                            let porakiGrupa = zemiSitePoraki(grupa._id, poraki);

                            console.log(grupa._id);
                            let porakiGrupaTemp = porakiGrupa;

                            let poslednaPoraka = {
                                content: "Нема пораки",
                                createdAt: "",
                                updatedAt: "",
                                isprakjac: ""
                            }
                            if (porakiGrupa.length != 0) poslednaPoraka = porakiGrupa[porakiGrupa.length - 1];

                            //user
                            let korisnikPoraka = zemiKorisnikPoraka(poslednaPoraka.isprakjac, users);

                            console.log(poslednaPoraka.isprakjac);
                            console.log(users);
                            console.log(korisnikPoraka);


                            let isprakjacIme = '';

                            if (korisnikPoraka) {
                                isprakjacIme = korisnikPoraka.ime;
                            }

                            return (
                                <div key={grupa._id} onClick={() => { namestiAktivniPoraki(porakiGrupaTemp); namestiGrupa(grupa) }} className={`chat-group container-small ${aktivnaGrupa && aktivnaGrupa._id == grupa._id ? 'active' : ''}`}>
                                    <div className="group-img">
                                        <Avatar size={45} className="radius-half" name={grupa.ime} />
                                    </div>
                                    <div className="group-right">
                                        <div className="group-right__top">
                                            <div className="group-name">
                                                <p>{grupa.ime}</p>
                                            </div>
                                            <div className="group-time">
                                                <span>{poslednaPoraka.updatedAt ? moment(poslednaPoraka.updatedAt).fromNow() : ""}</span>
                                            </div>
                                        </div>
                                        <div className="group-right__bottom">
                                            <p><b>{isprakjacIme ? `${isprakjacIme}: ` : ''}</b> {poslednaPoraka.sodrzina}</p>
                                        </div>
                                    </div>
                                </div>
                            )

                        }
                    })
                }

            </div>
        </div>
    )
}
