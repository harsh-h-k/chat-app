import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message'

import './css/messages.css'

function Messages({ messages, name }) {
    return (
        <div className="messages__box">
            <ScrollToBottom>
                {messages.map((message, i) => <div key={i}>
                    <Message message={message} name={name} />
                </div>)}
            </ScrollToBottom>
        </div>


    )


}









export default Messages
