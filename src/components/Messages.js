import React, {useState} from 'react'
import Avatar from 'react-avatar'


export default function Messages() {
    return (
        <div className="chat-messages-wrap container-small">
            <div className='chat-one'>
                <div className="chat-avatar">
                    <Avatar size="22" name="Dimitar Kuzmanovski" className="radius-half" size={32} />
                </div>
                <div className="chat-messages">
                    <div className="chat-message">
                        <p>hiiii</p>
                    </div>
                    <div className="chat-time">
                        <p>пред 2 минути.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
