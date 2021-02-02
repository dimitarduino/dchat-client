import React, { useContext, useEffect, useState } from 'react'
import TopMenu from '../components/TopMenu'
import ChatSide from '../components/ChatSide';
import ChatRight from '../components/ChatRight';
import ChatContext from '../context/chat/chatContext'
import AuthContext from '../context/auth/AuthContext'
import { zemiSiteGrupi } from '../help/functions'

import { inicijalizirajSocket, pretplataChat, vleziVoGrupi } from '../help/sockets'

export default function Main() {
    const [chats, setChats] = useState([]);
    const [siteGrupi, namestiSiteGrupi] = useState([]);
    const { grupi, grupa, vmetniPoraka, zemiGrupi, poraki, zemiPoraki, osveziGrupi, procitanaPorakaKorisnik, namestiAktivniPoraki, namestiGrupa } = useContext(ChatContext);
    const { user, users, citajKorisnici, setChanging } = useContext(AuthContext);

    useEffect(() => {
        inicijalizirajSocket();
        pretplataChat(vmetniPoraka, procitanaPorakaKorisnik, async function() {
        await zemiGrupi(user._id);
        namestiAktivniPoraki([])
        namestiGrupa(null);
        });

        return () => {

        }
    }, []);

    useEffect(() => {
        async function zemiGrupiAsync() {
            const grupi = await zemiGrupi(user._id);
        }

        zemiGrupiAsync();

    }, []);

    useEffect(() => {
        console.log('se smena refresh grupi');
        const zemiGrupiAsync = async () => {
            await zemiGrupi(user._id);
        }
        if (osveziGrupi) {
            console.log('se smena refresh grupi -true');

            zemiGrupiAsync();
        }
    }, [osveziGrupi])

    useEffect(() => {
        if (grupi && grupi.length != 0) {
            let grupiTemp = grupi.map((grupa, index) => grupa._id);
            zemiPoraki(grupiTemp.toString());

            // Najdi gi site users od site grupi
            let korisniciTemp = [];
            grupi.forEach(grupa => {
                grupa.korisnici.forEach(korisnik => {
                    let duplicate = korisniciTemp.some(korisnicko => korisnicko.trim() == korisnik.trim());
                    if (!duplicate) {
                        korisniciTemp.push(korisnik.trim());
                    }
                })
            });

            console.log(korisniciTemp);

            citajKorisnici();
            namestiSiteGrupi(zemiSiteGrupi(user._id, grupi));

            vleziVoGrupi(grupi, user._id);
        } else {
            vleziVoGrupi([], user._id);    
        }
    }, [grupi]);


    return (
        <div className="chat-wrap">
            <TopMenu />
            <div className="bottom-main">
                <ChatSide grupi={siteGrupi} poraki={poraki} users={users} />
                <ChatRight />
            </div>
        </div>
    )
}