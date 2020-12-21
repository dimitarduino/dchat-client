import React from 'react'
import Avatar from 'react-avatar'

export default function Members() {
    return (
        <div className="members">
            <div className="member">
                <Avatar className="avatar" size="30" name="Dimitar Kuzmanovski" />
                <span className="member-name">Dimitar Kuzmanovski</span>
            </div>
            <div className="member">
                <Avatar className="avatar" size="30" name="Nekoj drug" />
                <span className="member-name">Nekoj drug</span>
            </div>
        </div>
    )
}
