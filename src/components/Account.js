import React, { useState } from 'react'

export default function Account() {
     //Login promenlivi:
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
 
     //Register promenlivi:
     const [fname, setFname] = useState("");
     const [lname, setLname] = useState("");
     const [phone, setPhone] = useState("");
     const [emailRegister, setEmailRegister] = useState("");
     const [passwordRegister, setPasswordRegister] = useState("");

    // koj screen da se prikazi:
    const [loginForm, setLoginForm] = useState(true);

    // najavi se
    const submitLogin = async (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
    }

    //registriraj se
    const submitRegister = async (e) => {
        e.preventDefault();

        const user = {
            email: emailRegister,
            password: passwordRegister,
            fname,
            lname,
            phone
        }
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
                            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Лозинка" type="password" />
                            <button type="submit">Најава</button>

                            <a className="pointer hover-text-primary" onClick={() => { setLoginForm(false); }}>Регистрирај се</a>
                        </form>) : (
                            <form onSubmit={submitRegister}>
                                <input value={fname} onChange={(e) => setFname(e.target.value)} placeholder="Вашето име" type="text" />
                                <input value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Вашето презиме" type="text" />
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефонски број" type="text" />
                                <input value={emailRegister} onChange={(e) => setEmailRegister(e.target.value)} placeholder="Е-mail адреса" type="text" />
                                <input value={passwordRegister} onChange={(e) => setPasswordRegister(e.target.value)} placeholder="Лозинка" type="password" />
                                <button type="submit">Регистрирај се</button>
                                <a className="pointer hover-text-primary" onClick={() => { setLoginForm(true); }}>Најава</a>
                            </form>
                        )
                }
            </div>
        </div>
    )
}
