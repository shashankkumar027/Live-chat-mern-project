import React, { useEffect, useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";
import { user } from "../Join/Join";
import SocketIo from "socket.io-client";
import sendIcon from "../../images/send.png";
import closeIcon from "../../images/closeIcon.png"
import Message from "../Message/Message";
const ENDPOINT = "http://localhost:4040/";
let socket ;
const Chat = () => {
    const [id, setId] = useState("");
    const [messages, setMessages] = useState([]);
  
const send = ()=>{
    const message = document.getElementById('chatInput').value;
    socket.emit(`message`,{message, id});
    document.getElementById('chatInput').value="";
}



    
  useEffect(() => {
    
    socket= SocketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Connected");
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on(`welcome`, (data) => {
        setMessages([...messages, data]);
    });

    socket.on("userJoined", (data) => {
        setMessages([...messages, data]);
    });

socket.on(`leave`, (data)=>{
    setMessages([...messages, data]);
})

    return () => {
      socket.emit('disconnection');
        socket.off();
      }

  }, []);

useEffect(() => {
  socket.on(`sendMessage`, (data)=>{
setMessages([...messages, data]);
  })

  return () => {
    socket.off();
  }
}, [messages])




  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
            <h2><a href="https://www.linkedin.com/in/shashankkumar27/" target={'blank'}>Live chat</a></h2>
           <a href="/"> <img src={closeIcon} alt="close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
            {
                messages.map((item, i)=> <Message user={item.id === id ? 'you': item.user} key={i} message={item.message} 
                 classs={item.id === id ? "right" : "left"} />)
            }
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyPress={(event) => event.key === 'Enter' ? send() : null}  type="text" id="chatInput"  />
          <button className="sendBtn" onClick={send}>
            <img src={sendIcon} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
