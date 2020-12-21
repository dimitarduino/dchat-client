import React, { useState } from 'react'
import Avatar from 'react-avatar'
import { RiMessage2Line } from 'react-icons/ri'

export default function ChatSide() {
    //popup za nova grupa
    const [novaGrupaPopup, namestiNovaGrupaPopup] = useState(false);
    const [grupaNaslov, namestiGrupaNaslov] = useState('');
    const [email, namestiEmail] = useState('');


    const submitForm = (e) => {
        e.preventDefault();
        console.log('submitnav clen');
    }

    const createGroup = () => {

    }

    return (
        <div className="messages-list">
            <div className="messages-list-top container-small">
                <p>2 групи</p>
                <div  onClick={() => namestiNovaGrupaPopup(true)} className="new-chat">
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
                                    <div className="item">
                                        <p>dimitarduino@gmail.com</p>
                                        <span>&#10005;</span>
                                    </div>

                                </div>

                                <form onSubmit={submitForm} className="form">
                                    <input value={email} onChange={(e) => namestiEmail(e.target.value)} placeholder="E-mail адреса на членот..." type="email" />
                                    <button>+</button>
                                </form>

                                <button onClick={createGroup} className="createGroup">Направи група</button>

                            </div>
                        </div>
                    </div>
                )
            }

            <div className="chat-list-inner">

                <div className='chat-group container-small'>
                    <div className="group-img">
                        <Avatar size={45} className="radius-half" name="Ime na grupa" />
                    </div>
                    <div className="group-right">
                        <div className="group-right__top">
                            <div className="group-name">
                                <p>Ime na grupa</p>
                            </div>
                            <div className="group-time">
                                <span>пред 2 мин.</span>
                            </div>
                        </div>
                        <div className="group-right__bottom">
                            <p><b>Dimitar:</b> hiiii</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
