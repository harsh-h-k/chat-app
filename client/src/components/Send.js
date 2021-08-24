import React from 'react'

import './css/send.css'

function Send({ message , sendMessage , setMessage }) {
    return (
        <div className="send">
            <form className="send__form">
            <input className="send__form__input" type="input" value={message} onChange={event => setMessage(event.target.value)} onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} 
                placeholder="Type your message here..."
            />
                <button className="send__form__btn" onClick={sendMessage}>Send</button>
            </form>
        </div>
    )
}

export default Send
