import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext';

export default function Account() {
    //context promenlivi
    const { logirajSe, registrirajSe, errors, setError } = useContext(AuthContext);

    //Login promenlivi:
    const [email, setEmail] = useState("");
    const [lozinka, namestiLozinka] = useState("");

    //Register promenlivi:
    const [ime, namestiIme] = useState("");
    const [prezime, namestiPrezime] = useState("");
    const [telefon, namestiTelefon] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");

    // koj screen da se prikazi:
    const [loginForm, setLoginForm] = useState(true);

    // najavi se
    const submitLogin = async (e) => {
        e.preventDefault();
        const user = {
            email,
            lozinka
        }

        const logiran = await logirajSe(user);
    }

    //registriraj se
    const submitRegister = async (e) => {
        e.preventDefault();

        const user = {
            email: emailRegister,
            lozinka: passwordRegister,
            ime,
            prezime,
            telefon
        }

        const registriran = await registrirajSe(user);

    }

    return (
        <div className="account-form">
            <div className="account-form__header">
                <h2>{loginForm ? 'Најави се' : 'Регистрација'}</h2>
            </div>
            <div className="account-form__inner">
                {
                    loginForm ? (
                        <form onSubmit={submitLogin}>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Е-mail адреса" type="text" />
                            <input value={lozinka} onChange={(e) => namestiLozinka(e.target.value)} placeholder="Лозинка" type="password" />
                            <button type="submit">Најава</button>

                            <a className="pointer hover-text-primary" onClick={() => { setLoginForm(false); }}>Регистрирај се</a>

                            {
                                errors && (
                                    <div className="error-msg">
                                        <p>{errors}</p>
                                    </div>
                                )
                            }
                        </form>) : (
                            <form onSubmit={submitRegister}>
                                <input value={ime} onChange={(e) => namestiIme(e.target.value)} placeholder="Вашето име" type="text" />
                                <input value={prezime} onChange={(e) => namestiPrezime(e.target.value)} placeholder="Вашето презиме" type="text" />
                                <input value={telefon} onChange={(e) => namestiTelefon(e.target.value)} placeholder="Телефонски број" type="text" />
                                <input value={emailRegister} onChange={(e) => setEmailRegister(e.target.value)} placeholder="Е-mail адреса" type="text" />
                                <input value={passwordRegister} onChange={(e) => setPasswordRegister(e.target.value)} placeholder="Лозинка" type="password" />
                                <button type="submit">Регистрирај се</button>
                                <a className="pointer hover-text-primary" onClick={() => { setLoginForm(true); }}>Најава</a>

                                {
                                    errors && (
                                        <div className="error-msg">
                                            <p>{errors}</p>
                                        </div>
                                    )
                                }
                            </form>
                        )
                }
            </div>
        </div>
    )
}
