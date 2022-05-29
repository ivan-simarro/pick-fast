import "./Contact.scss";
import logo from "../../assets/logo.png";
import React, { useState } from "react";
import { getOrdersByUser } from "../Profile/profileUtils";
import { firstResponse, finish, nextMessage, whatDoYouNeed } from "./contactUtils";
import { IoSendSharp } from "react-icons/io5";
import { useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { useOutletContext, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Contact() {
    const initialMessagesState = ["Hola " + sessionStorage.getItem("user") + ", ¿en qué podemos ayudarte?"];
    const [messages, setMessages] = useState(initialMessagesState);
    const [newMessage, setNewMessage] = useState(sessionStorage.getItem("message") || "");
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [finished, setFinished] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    // eslint-disable-next-line
    const [productsState, dispatchProducts, handleToCart, handleAddDeleteFromFavourites, searchTerm, setSearchTerm, bill, setBill, isReverse, setIsReverse, selected, setSelected, logged, setLogged] = useOutletContext();
    let navigate = useNavigate();

    useEffect(() => {
        if (!logged) {
            navigate("/profile");
            Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Registrate o inicia sesión antes de contactarnos',
                showConfirmButton: false,
                timer: 2500
            })
        } else {
            setInterval(() => {
                setCurrentTime(new Date());
            }, 30000);
        }
    }, []);

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
        setNewMessage("");
    }

    useEffect(() => {
        let conversation = document.querySelector('.conversation-container');
        if (conversation != null) conversation.scrollTop = conversation.scrollHeight;
    });

    useEffect(() => {
        if (messages.length % 2 === 0) {
            // setTimeout(function () {
            //     let tick = document.getElementById("sent" + messages.length - 1);
            //     console.log(tick);
            //     tick.classList.remove('tick-animation');
            // }, 1500);
            setTimeout(() => {
                if ((orders.length > 0 && orders.filter(or => or.date.replaceAll('-', '/') === sessionStorage.getItem("message").slice(0, 10)).length > 0) || products.length > 0) {
                    const isForOrders = orders.length > 0;
                    finish(setMessages, messages, isForOrders ? 0 : 1, setFinished);
                    return;
                }
                let nextMessageToSend = nextMessage(sessionStorage.getItem("message"));
                switch (nextMessageToSend) {
                    case firstResponse[0]:
                    case firstResponse[3]:
                        getOrdersByUser(sessionStorage.getItem("user")).then(res => { setOrders(res.slice(-5)) });
                        break;
                    case firstResponse[1]:
                    case firstResponse[2]:
                        getOrdersByUser(sessionStorage.getItem("user")).then(res => { setProducts(JSON.parse(res.slice(-1)[0].products)) });
                        break;
                    default:
                        break;
                }
                setMessages([...messages, nextMessageToSend]);
                sessionStorage.removeItem("message");
            }, 2500);
        }
        // eslint-disable-next-line
    }, [messages])

    return (
        <div className="page">
            {
                logged &&
                <div className="marvel-device nexus5">
                    {
                        finished && <div className="refresh" onClick={() => {
                            setMessages(initialMessagesState);
                            setFinished(false);
                            orders.length > 0 ? setOrders([]) : setProducts([]);
                        }}>
                            <p><AiOutlineReload /><br /> Comentar un nuevo problema</p>
                        </div>
                    }
                    <div className="top-bar"></div>
                    <div className="sleep"></div>
                    <div className="volume"></div>
                    <div className="camera"></div>
                    <div className="screen">
                        <div className="screen-container">
                            <div className="status-bar">
                                <div className="time">{currentTime.getHours() + ":" + (currentTime.getMinutes() < 10 ? "0" + currentTime.getMinutes().toString() : currentTime.getMinutes())}</div>
                                <div className="date">{currentTime.getDate() + " de " + new Intl.DateTimeFormat('es-ES', { month: "short" }).format(currentTime)}</div>
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
                                                        messages[i] === firstResponse[0] || messages[i] === firstResponse[3] ?
                                                            <React.Fragment key={i}>
                                                                <div className="message received">
                                                                    {m}
                                                                    <span className="metadata"><span className="time"></span></span>
                                                                </div>
                                                                {
                                                                    orders.map((or, i) => {
                                                                        let mess = or.date.replaceAll('-', '/') + " - " + or.bill;
                                                                        return <div key={or.bill + i} onClick={() => handleSelected(mess)} className="message received whatDoYouNeed">{mess} €</div>
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                            : messages[i] === firstResponse[1] || messages[i] === firstResponse[2] ?
                                                                <React.Fragment key={i}>
                                                                    <div className="message received">
                                                                        {m}
                                                                        <span className="metadata"><span className="time"></span></span>
                                                                    </div>
                                                                    {
                                                                        products.map((p, i) => {
                                                                            let product = productsState.products.filter(pro => pro.id === p.id)[0];
                                                                            console.log(product);
                                                                            return <div key={product.name + i} onClick={() => handleSelected(product.name)} className="message received whatDoYouNeed">{product.name}</div>
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
            }
        </div >
    )
}