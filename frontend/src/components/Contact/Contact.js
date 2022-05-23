import "./Contact.scss";
import logo from "../../assets/logo.png";
import React, { useState } from "react";
import { animateMessage, initialMessagesState, whatDoYouNeed } from "./contactUtils";
import { IoSendSharp } from "react-icons/io5";
import { useEffect } from "react";

export default function Contact() {
    const [messages, setMessages] = useState(initialMessagesState);
    const [newMessage, setNewMessage] = useState(sessionStorage.getItem("message") || "");

    let conversation = document.querySelector('.conversation-container');

    function handleSelected(newMess) {
        if (messages.length % 2 === 0) {
            return;
        }
        setNewMessage(newMess);
        sessionStorage.setItem("message", newMess);
    }

    function handleMessage() {
        if (newMessage.length === 0 || messages.length % 2 === 0) {
            return;
        }
        setMessages([...messages, newMessage]);
        sessionStorage.removeItem("message");
        setNewMessage("");
    }

    useEffect(() => {
        if (conversation != null) conversation.scrollTop = conversation.scrollHeight;
        if (messages.length % 2 === 0) {
            // setTimeout(function () {
            //     let tick = document.getElementById("sent" + messages.length - 1);
            //     console.log(tick);
            //     tick.classList.remove('tick-animation');
            // }, 1500);
        }
    }, [messages])


    return (
        <div className="page">
            <div className="marvel-device nexus5">
                <div className="top-bar"></div>
                <div className="sleep"></div>
                <div className="volume"></div>
                <div className="camera"></div>
                <div className="screen">
                    <div className="screen-container">
                        <div className="status-bar">
                            <div className="time"></div>
                            <div className="battery">
                                <i className="zmdi zmdi-battery"></i>
                            </div>
                            <div className="network">
                                <i className="zmdi zmdi-network"></i>
                            </div>
                            <div className="wifi">
                                <i className="zmdi zmdi-wifi-alt-2"></i>
                            </div>
                            <div className="star">
                                <i className="zmdi zmdi-star"></i>
                            </div>
                        </div>
                        <div className="chat">
                            <div className="chat-container">
                                <div className="user-bar">
                                    <div className="back">
                                        <i className="zmdi zmdi-arrow-left"></i>
                                    </div>
                                    <div className="avatar">
                                        <img src={logo} alt="" />
                                    </div>
                                    <div className="name">
                                        <span>Pick Fast</span>
                                        <span className="status">En línea</span>
                                    </div>
                                    <div className="actions more">
                                        <i className="zmdi zmdi-more-vert"></i>
                                    </div>
                                    <div className="actions attachment">
                                        <i className="zmdi zmdi-attachment-alt"></i>
                                    </div>
                                    <div className="actions">
                                        <i className="zmdi zmdi-phone"></i>
                                    </div>
                                </div>
                                <div className="conversation">
                                    <div className="conversation-container">
                                        {messages.map((m, i) => {
                                            return i % 2 === 0 ?
                                                i === 0 ?
                                                    <React.Fragment key={i}>
                                                        <div className="message received">
                                                            {m}
                                                            <span className="metadata"><span className="time"></span></span>
                                                        </div>
                                                        {
                                                            whatDoYouNeed.map(wdyn => {
                                                                return <div key={wdyn} onClick={() => handleSelected(wdyn)} className="message received whatDoYouNeed">{wdyn}</div>
                                                            })
                                                        }
                                                    </React.Fragment>
                                                    :
                                                    <div key={i} className="message received">
                                                        {m}
                                                        <span className="metadata"><span className="time"></span></span>
                                                    </div>
                                                :
                                                <div key={i} className="message sent" id={"sent" + i}>
                                                    {m}
                                                    <span className="metadata">
                                                        <span className="time"></span><span className="tick"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7" /></svg></span>
                                                    </span>
                                                </div>
                                        })}
                                    </div>
                                    <div className="conversation-compose">
                                        <div className="emoji">
                                        </div>
                                        <input className="input-msg" name="input" placeholder="Elige un mensaje..." autoComplete="off" readOnly value={newMessage}></input>
                                        <div className="photo">
                                            <i className="zmdi zmdi-camera"></i>
                                        </div>
                                        <button className="send">
                                            <div className="circle" onClick={handleMessage}>
                                                <IoSendSharp style={{ fontSize: "1.5rem", marginLeft: "0.35rem" }} />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}