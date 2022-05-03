export default function Login({ setLogged }) {
    return (
        <div id="login">
            <h1>¡Hola de nuevo!</h1>

            <form action="/" method="post">
                <div className="field-wrap">
                    <input type="email" placeholder="Correo electrónico" required />
                </div>
                <div className="field-wrap" >
                    <input type="password" placeholder="Contraseña" required />
                </div>
            </form >
            <button className="form__button button-block" onClick={() => setLogged(true)} > Log In</button >
        </div >
    )
}