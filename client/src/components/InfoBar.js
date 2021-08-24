import React from 'react'

import './css/infobar.css'

function InfoBar({ room }) {
    return (
        <div className="info">
            <div className="info__left" >
            <i class="fas fa-circle" style={{color:"#7CFC00"}} ></i>
            <h3>Room : {room}</h3>
            </div>
            <div className="info__right" >
                <a href="/" >
                <i class="far fa-times-circle" ></i>
                </a>
            </div>
        </div>
    )
}

export default InfoBar
