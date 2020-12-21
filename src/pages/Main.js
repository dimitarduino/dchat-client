import React from 'react'
import TopMenu from '../components/TopMenu'
import ChatSide from '../components/ChatSide';
import ChatRight from '../components/ChatRight';

export default function Main() {
    return (
        <div className="chat-wrap">
            <TopMenu />
            <div className="bottom-main">
                <ChatSide />
                <ChatRight />
            </div>
        </div>
    )
}