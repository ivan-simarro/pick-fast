import { FaUserAlt } from "react-icons/fa";
import "./ProfileLogged.scss";
import { Spinner } from "../../Loading/Spinner";

export default function ProfileLogged({ loading, user, orders }) {

    function logOut() {
        sessionStorage.removeItem("user");
    }

    return (
        <div className="profileLogged">
            {
                loading ?
                    <Spinner style={{ fontSize: "5rem", color: "black", position: "absolute", top: "0", bottom: "0", right: "0", left: "0", margin: "auto", marginTop: "9rem" }} />
                    :
                    <>
                        <div className="profileLogged__left">
                            <FaUserAlt className="profileLogged__left--icon" />
                            <div className="profileLogged__left--user">
                                {user.user}
                            </div>
                            <div className="profileLogged__left--data">
                                <label htmlFor="profileLogged-Nombre">Nombre </label>
                                <input type="text" id="profileLogged-Nombre" value={user.name} readOnly />
                            </div>
                            <div className="profileLogged__left--data">
                                <label htmlFor="profileLogged-Apellido">Apellido </label>
                                <input type="text" id="profileLogged-Apellido" value={user.lastName} readOnly />
                            </div>
                            <div className="profileLogged__left--data">
                                <label htmlFor="profileLogged-Pedidos">Pedidos realizados </label>
                                <input type="text" id="profileLogged-Pedidos" value={orders.length} readOnly />
                            </div>
                            <div className="profileLogged__left--btn">
                                <button onClick={logOut}>Log Out</button>
                            </div>
                        </div>
                        <div className="profileLogged__right">

                        </div>
                    </>
            }
        </div>
    )
}