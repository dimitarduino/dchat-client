import React, { useContext, useEffect, useState } from 'react'
import Account from '../components/Account'
import AuthContext from '../context/auth/AuthContext'
import Main from './Main'
import Loading from '../components/Loading'

export default function PrivateRoute() {
    const { user, namestiNajavenKorisnik } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function namestiKorisnik(token) {
            try {
                const loggedIn = await namestiNajavenKorisnik(token);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        }

        let token = "";
        if (typeof localStorage.token != "undefined") {
            token = localStorage.token;
        }

        if (user) {
            //vekje logiran
        } else {
            if (token.trim() != "") {
                namestiKorisnik(token);
            } else {
                setLoading(false);
            }
        }
    }, []);

    return (
        <div>
        {
            loading ? <Loading /> : user ? (
                    <Main />
                ) : (
                <div className="account bg-primary">
                    <Account />
                </div>
                )
            }
        </div>
    )
}