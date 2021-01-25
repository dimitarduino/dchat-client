import React, { useReducer } from 'react'
import axios from '../../axios'

import AuthContext from './AuthContext'
import authReducer from './AuthReducer'
import { SET_USER, SET_USERS, LOGOUT_USER, AUTH_ERROR, SUCCESS_REGISTER, FAIL_REGISTER, SUCCESS_LOGIN, FAIL_LOGIN, SET_ERROR, CLEAR_ERROR, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR, SET_CHANGING, SET_NEWCHAT_MSG } from '../types'
import { setToken } from '../../help/functions'

const AuthState = props => {
    const initState = {
        user: null,
        userAuth: null,
        errors: null,
        users: [],
        sepromenuvaLozinka: false,
        lozinkaPoraka: "",
        novaGrupaMsg: "",
        poslednoDodadenMail: ""
    }

    const [state, dispatch] = useReducer(authReducer, initState);

    const citajKorisnici = async (users) => {
        if (users) {
            try {
                const res = await axios.post('/register/users', {
                    users
                });
    
                dispatch({
                    type: SET_USERS,
                    payload: res.data.users
                })
            } catch (err) {
            }
        }
    }

    const setError = err => {
        dispatch({
            type: SET_ERROR,
            payload: err
        })
    }

    const namestiNajavenKorisnik = async token => {
        try {
            setToken(token);
            const res = await axios.get(`/auth`);
            // ako postoi token vo localStorage, no e istecen -> izbrisi i reload.
            if (!res.data) {
                delete localStorage.token;
                window.location.reload();
            }

            dispatch({
                type: SET_USER,
                payload: res.data
            })
        } catch (err) {
            if (err.response && err.response.status == 401) {
                // nenajaven
                delete localStorage.token;
            }

            dispatch({
                type: AUTH_ERROR,
                payload: err.response ? err.response.data : ''
            })
        }
    }


    //najava - registracija

    const registrirajSe = async user => {

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post(`/register`, user, config);

            dispatch({
                type: SUCCESS_REGISTER,
                payload: res.data
            })

            namestiNajavenKorisnik(res.data.token);
        } catch (err) {
            let errorMsg = '';
            if (err.response.data.errors.constructor === Array) {
                errorMsg = err.response.data.errors[0].msg;
            } else {
                errorMsg = err.response.data.errors.msg;
            }
            if (err.response) {
                dispatch({
                    type: FAIL_REGISTER,
                    payload: errorMsg
                })
            }
        }
    }

    const odlogirajSe = () => {
        localStorage.removeItem("token");

        dispatch({
            type: LOGOUT_USER,
            payload: localStorage.token
        })
    }

    const logirajSe = async user => {
        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post(`/auth`, user, config);
            dispatch({
                type: SUCCESS_LOGIN,
                payload: res.data
            })

            namestiNajavenKorisnik(res.data.token);
        } catch (err) {
            if (err) {
                // console.log(err.response);
                let errorMsg = '';
                if (err.response) {
                    if (err.response.data.errors.constructor === Array) {
                        errorMsg = err.response.data.errors[0].msg;
                    } else {
                        errorMsg = err.response.data.errors.msg;
                    }
                }
                if (err.response) {
                    dispatch({
                        type: FAIL_LOGIN,
                        payload: errorMsg
                    })
                }
            }
        }
    }

    const promeniLozinka = async lozinki => {
        try {
            const res = await axios.post(`/auth/${state.user._id}`, lozinki);

            dispatch({
                type: CHANGE_PASSWORD_SUCCESS
            })

            window.location.reload(false);

        } catch (err) {
            dispatch({
                type: CHANGE_PASSWORD_ERROR,
                payload: err.response.data.err || err.response.data.msg
            })
        }
    }

    const setChanging = (temp) => {
        dispatch({
            type: SET_CHANGING,
            payload: temp
        })
    }
    const najdiKorisnikPoMail = async email => {
        try {
            const res = await axios.get(`/auth/${email}`);

            dispatch({
                type: SET_NEWCHAT_MSG,
                payload: {
                    msg: res.data.msg,
                    email: res.data.user
                }
            })
        } catch (err) {
            dispatch({
                type: SET_NEWCHAT_MSG,
                payload: {
                    msg: err.response.data.msg,
                    email: ""
                }
            })
        }
    }


    return (
        <AuthContext.Provider value={{
            user: state.user,
            userAuth: state.userAuth,
            errors: state.errors,
            users: state.users,
            lozinkaPoraka: state.lozinkaPoraka,
            sepromenuvaLozinka: state.sepromenuvaLozinka,
            novaGrupaMsg: state.novaGrupaMsg,
            poslednoDodadenMail: state.poslednoDodadenMail,
            namestiNajavenKorisnik,
            citajKorisnici,
            logirajSe,
            registrirajSe,
            odlogirajSe,
            setError,
            promeniLozinka,
            setChanging,
            najdiKorisnikPoMail
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;