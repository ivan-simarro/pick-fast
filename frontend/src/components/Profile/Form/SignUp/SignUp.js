export default function SignUp({ setLogged }) {
    return (
        <div className="signup" >
            <h1>Registrarse</h1>
            <form action="/" method="post">
                <div className="top-row">
                    <div className="field-wrap">
                        <input type="text" maxLength={15} placeholder="Nombre" required />
                    </div>
                    <div className="field-wrap" >
                        <input type="text" maxLength={20} placeholder="Apellido" required />
                    </div >
                </div >
                <div className="field-wrap" >
                    <input type="email" placeholder="Correo electrónico" required />
                </div >
                <div className="field-wrap" >
                    <input type="password" maxLength={20} placeholder="Contraseña" required />
                </div>
            </form >
            <button className="form__button button-block" onClick={() => setLogged(true)}>Empezar</button >
        </div >
    )
}