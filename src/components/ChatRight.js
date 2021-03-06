import React, { useState, useEffect, useContext } from 'react'
import Avatar from 'react-avatar'
import { RiSendPlane2Line } from 'react-icons/ri'
import { AiOutlineSave } from 'react-icons/ai'

import AuthContext from '../context/auth/AuthContext'
import ChatContext from '../context/chat/chatContext'

import Messages from './Messages';
import Members from './Members';


//sockets
import { ispratiPorakaSocket, procitanoSocket } from '../help/sockets'

export default function ChatRight() {
    const [poraka, namestiPoraka] = useState("");
    const [promenlivo, namestiPromenlivo] = useState(false);
    const [tab, namestiTab] = useState(1);
    const [imeGrupa, namestiImeGrupa] = useState('Ime na grupa');

    //context
    const { zemiPoraki, novaGrupa, aktivniPoraki, poraki, kreirajPoraka, grupa, izmeniGrupa, namestiNovaGrupa, namestiProcitano, namestiProcitanaGrupa } = useContext(ChatContext);
    const { user } = useContext(AuthContext);

    //useeffects
    useEffect(() => {
        if (grupa) {
            namestiImeGrupa(grupa.ime);
        }
        console.log('promeneto grupa');
        console.log(grupa);
    }, [grupa]);

    const promeniImeGrupa = async () => {
        if (imeGrupa.trim() != "") {
            await izmeniGrupa(grupa._id, imeGrupa);

            namestiPromenlivo(false);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (poraka.trim() != "") {
            let daliENovaGrupa = false;
            if (aktivniPoraki.length == 0 || novaGrupa == true) {
                daliENovaGrupa = true;
            }

            console.log(grupa.korisnici);
            ispratiPorakaSocket(grupa._id, poraka, user._id, kreirajPoraka, grupa.korisnici, daliENovaGrupa);

            namestiNovaGrupa(false);
            namestiPoraka('');
        }
    }

    const namestiPromenlivoGrupa = (vnesenoIme) => {
        namestiImeGrupa(vnesenoIme);

        if (vnesenoIme.trim() != "") {
            namestiPromenlivo(true);
        } else {
            namestiPromenlivo(false);
        }
    }

    const namestiProcitaniPoraki = () => {
        let poslednaPoraka = aktivniPoraki[aktivniPoraki.length - 1];

        if (!!poslednaPoraka && !!poslednaPoraka._id) {
            if (poslednaPoraka.procitanoOd.includes(user._id)) {
                console.log('vekje ja procital');
            } else {
                procitanoSocket(grupa._id, user._id, function() {
                    namestiProcitano(user._id, poslednaPoraka._id);
                })
            }
        } else {
            if (!!poslednaPoraka) {
                if (grupa) {
                    procitanoSocket(grupa._id, user._id, function() {
                        namestiProcitanaGrupa(grupa._id, user._id);
                    })
                }
            }
            console.log('nema nisto');
        }
    }

    if (grupa) {
        return (
            <div className="chat-right">
                <div className="chat-right__top">
                    <div className="chat-right__top-left">
                        <div className="chat-name-icon container-small">
                            <div className="chat-icon">
                                <Avatar name={grupa.ime} className="radius-half" size={50} />
                            </div>
                            <div className="chat-name">
                                <div className="chat-name__edit d-flex">
                                    <input onChange={(e) => namestiPromenlivoGrupa(e.target.value)} value={imeGrupa} />
                                    {
                                        promenlivo && (
                                            <AiOutlineSave onClick={() => promeniImeGrupa()} size={20} />
                                        )
                                    }
                                </div>
                                <span>{grupa.korisnici.length} членови</span>
                            </div>
                        </div>
    
                    </div>
                    <div className="chat-tabs container-small">
                        <div onClick={() => namestiTab(1)} className={`chat-tab ${tab == 1 ? 'active' : ''}`}>
                            <p>Пораки</p>
                        </div>
                        <div onClick={() => namestiTab(2)} className={`chat-tab ${tab == 2 ? 'active' : ''}`}>
                            <p>Членови</p>
                        </div>
                    </div>
                </div>
    
                {
                    tab == 1 ? (
                        <Messages user={user} />
                    ) : (
                        <Members />
                        )
                }
    
                {
                    tab == 1 && (
                        <div onMouseOver={namestiProcitaniPoraki} className="chat-new">
                            <form onSubmit={onSubmit} className="newMesasge__form">
                                <input onChange={namestiProcitaniPoraki} onFocus={namestiProcitaniPoraki} value={poraka} onChange={(e) => namestiPoraka(e.target.value)} placeholder="Напиши порака..." type="text" />
                                <button>
                                    <RiSendPlane2Line size={23} />
                                </button>
                            </form>
                            {/* <form className="img-pick" action="">
                                <input type="file" name="" id="" />
                            </form> */}
                        </div>
    
                    )
                }
            </div>
        )
    } else {
        return <div>
            <p></p>
        </div>
    }
}
