import React, { useReducer } from 'react'
import axios from '../../axios'

import AuthContext from './AuthContext'
import authReducer from './AuthReducer'
import { SET_USER, SET_USERS, LOGOUT_USER, AUTH_ERROR, SUCCESS_REGISTER, FAIL_REGISTER, SUCCESS_LOGIN, FAIL_LOGIN, SET_ERROR, CLEAR_ERROR } from '../types'
import { setToken } from '../../help/functions'

const AuthState = props => {
    const initState = {
        user: null,
        userAuth: null,
        errors: null,
        users: []
    }

    const [state, dispatch] = useReducer(authReducer, initState);

    const citajKorisnici = async (users) => {
        try {
            const res = await axios.get('/register/users', {
                params: {
                    users
                }
            });

            dispatch({
                type: SET_USERS,
                payload: res.data.users
            })
        } catch (err) {
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
            let errorMsg = '';
    
            if (err.response.data.errors.constructor === Array) {
                errorMsg = err.response.data.errors[0].msg;
            } else {
                errorMsg = err.response.data.errors.msg;
            }
            if (err.response) {
                dispatch({
                    type: FAIL_LOGIN,
                    payload: errorMsg
                })
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            user: state.user,
            userAuth: state.userAuth,
            errors: state.errors,
            users: state.users,
            namestiNajavenKorisnik,
            citajKorisnici,
            logirajSe,
            registrirajSe,
            odlogirajSe,
            setError
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;