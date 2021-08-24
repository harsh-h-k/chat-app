import React , { useState } from 'react'
import { Link } from 'react-router-dom'

import './css/join.css'

function Join() {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    

    return (
        <div className="chat">
            <div className="chat__box">
                <h1>Join Now!</h1>
                <h2>Connect with your friends and family easily</h2>
                <div className="chat__input">
                    <input className="chat__input__box" type="text" value="name" onChange={(event) => setName(event.target.value)} value={name} placeholder="Name" />
                    <input className="chat__input__box" type="text" value="room" onChange={(event) => setRoom(event.target.value)} value={room} placeholder="Room" />
                </div>
                <Link onClick={event => (!name || !room ? event.preventDefault() : null )} to={`/chat?name=${name}&room=${room}`}>
                    <button className="chat__button" type="submit" >Join</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
