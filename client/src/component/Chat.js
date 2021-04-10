import React from 'react'
import { io } from "socket.io-client";

var socket;
export default function Chat() {
    const [value, setValue] = React.useState("")
    const [messages, setMessages] = React.useState([])

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');

        socket = io("localhost:8000", {
            query: {
                username
            }
        });

        socket.on("connect", () => {
            console.log(socket.id);
        });

        socket.on('chat message', function (msg) {
            // console.log('new message', msg)
            setMessages(messages => messages.concat(msg));
        });

    }, [])

    const sendMessage = () => {
        socket && socket.emit('chat message', value)
        setValue("")
    }

    return (
        <div>
            {messages.map((message, index) => <p key={index}>{message}</p>)}
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Enter message"}
            />
            <button
                onClick={sendMessage}
            >
                Send
            </button>
        </div>
    )
}
