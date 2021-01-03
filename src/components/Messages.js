import React, {useState, useContext, useRef, useEffect} from 'react'
import Avatar from 'react-avatar'
import moment from 'moment'

import AuthContext from '../context/auth/AuthContext' 
import ChatContext from '../context/chat/chatContext' 


export default function Messages({user}) {
    const messagesEndRef = React.useRef(null);
    const { aktivniPoraki, grupa } = useContext(ChatContext);
    const { users } = useContext(AuthContext);

    const SkrolajNajdolu = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };


    return (
        <div className="chat-messages-wrap container-small">
            {
                 aktivniPoraki.map(poraka => {
                    let classMessage = "";

                    let userInfo = users.filter(userTemp => userTemp._id == poraka.isprakjac);

                    userInfo = userInfo[0];

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
                                        <p>{moment(poraka.createdAt).format("HH:mm, DD/MM/YYYY")}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }

            <SkrolajNajdolu />
        </div>
    )
}
