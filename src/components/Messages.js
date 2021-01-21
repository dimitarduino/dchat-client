import React, { useState, useContext, useRef, useEffect } from 'react'
import Avatar from 'react-avatar'
import moment from 'moment'

import AuthContext from '../context/auth/AuthContext'
import ChatContext from '../context/chat/chatContext'
import { zemiKorisnikPoraka } from '../help/functions'


export default function Messages({ user }) {
    const messagesEndRef = React.useRef(null);
    const { aktivniPoraki, grupa } = useContext(ChatContext);
    const { users, citajKorisnici } = useContext(AuthContext);

    const SkrolajNajdolu = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };


    return (
        <div className="chat-messages-wrap container-small">
            {
                aktivniPoraki.map((poraka, indexPoraka) => {
                    let procitanoOd = [];
                    let procitanoOdTxt = "";
                    poraka.procitanoOd.forEach(function (korisnikId) {
                        let korisnikTemp = zemiKorisnikPoraka(korisnikId, users);

                        if (korisnikTemp) {
                            if (procitanoOd.includes(korisnikTemp) === false && korisnikTemp._id != user._id) {
                                procitanoOd.push(korisnikTemp);
                            }
                        } else {
                            citajKorisnici();
                        }

                    })

                    procitanoOdTxt = procitanoOd.map(tk => ` ${tk.ime}`);

                    let classMessage = "";

                    let userInfo = users.filter(userTemp => userTemp._id == poraka.isprakjac);

                    userInfo = userInfo[0];

                    if (userInfo) {
                    if (poraka.isprakjac == user._id) classMessage = 'me';
                    if (poraka.grupa == grupa._id) {
                        return (
                            <div key={poraka._id} className={`chat-one ${classMessage}`}>
                                <div className="chat-avatar">
                                    <Avatar size="22" name={`${userInfo.ime} ${userInfo.prezime}`} className="radius-half" size={32} />
                                </div>
                                <div className="chat-messages">
                                    <div className="chat-message">
                                        <p>{poraka.sodrzina}</p>
                                    </div>
                                    <div className="chat-time">
                                        <p>{
                                            (indexPoraka == aktivniPoraki.length - 1 && procitanoOd.length != 0)? (
                                                <span>
                                                    &#10003;{procitanoOdTxt}
                                                </span>
                                            ) 
                                             : `${moment(poraka.createdAt).format("HH:mm, DD/MM/YYYY")}` 
                                            }
                                        </p>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
                })
            }

            <SkrolajNajdolu />
        </div>
    )
}
