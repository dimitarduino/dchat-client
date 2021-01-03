import React, { useReducer } from 'react'
import axios from '../../axios'
import ChatContext from './chatContext'
import chatReducer from './chatReducer'
import {
    SET_ERROR,
    CLEAR_ERROR,
    SUCCESS_ADD_MESSAGE,
    SET_MESSAGES,
    SET_GROUP,
    SET_GROUPS,
    SET_ACTIVE_MESSAGES,
    ADD_NEW_GROUP,
    UPDATE_GROUP,
    SUCCESS_CHANGE_GROUP,
    SET_NEW_GROUP
} from '../types'
import {setToken} from '../../help/functions'

const ChatState = props => {
    const initState = {
        error: null,
        poraki: [],
        grupa: null,
        grupi: [],
        aktivniPoraki: [],
        osveziGrupi: false,
        novaGrupa: false
    }
    const [state, dispatch] = useReducer(chatReducer, initState);

    const namestiGrupa = (grupaId) => {
        dispatch({
            type: SET_GROUP,
            payload: grupaId
        })
    }

    const namestiNovaGrupa = (novaGrupa) => {
        dispatch({
            type: SET_NEW_GROUP,
            payload: novaGrupa
        })
    }

    const zemiPoraki = async (grupi) => {
        try {
            const res = await axios.get('/messages', {
                params: {
                    grupi
                }
            });

            dispatch({
                type: SET_MESSAGES,
                payload: res.data.messages
            })
        } catch (err) {
            dispatch({
                type: SET_ERROR,
                payload: err
            })
        }
    }

    const kreirajPoraka = async (poraka) => {
        var { grupa, sodrzina, isprakjac } = poraka;

        try {
            const res = await axios.post('/messages', {
                grupa, sodrzina, isprakjac
            });
            console.log('update grupa: ', grupa);
            dispatch({
                type: UPDATE_GROUP,
                payload: grupa
            });
        } catch (err) {
        }
    }

    const vmetniPoraka = async (poraka) => {
        var { grupa, sodrzina, isprakjac } = poraka;
        dispatch({
            type: SUCCESS_ADD_MESSAGE,
            payload: poraka
        })
    }

    const zemiGrupi = async (korisnici) => {
        try {
            const res = await axios.get('/groups', {
                params: {
                    korisnici
                }
            });

            dispatch({
                type: SET_GROUPS,
                payload: res.data.grupi
            })
        } catch (err) {
            dispatch({
                type: SET_ERROR,
                payload: err
            })
        }
    }

    const namestiAktivniPoraki = poraki => {
        dispatch({
            type: SET_ACTIVE_MESSAGES,
            payload: poraki
        })
    }


    const izmeniGrupa = async (grupaId, ime = null, korisnici = null) => {
        console.log(korisnici);
        try {
            const res = await axios.post(`/groups/${grupaId}`, {
                korisnici,
                ime
            })

            dispatch({
                type: SUCCESS_CHANGE_GROUP,
                payload: res.data
            })
        } catch (err) {
            console.log(err);
            // dispatch({
            //     type: SET_ERROR,

            // })
        }
    }

    const dodajNovaGrupa = async (korisnici, ime) => {
        try {
            const res = await axios.post('/groups', {
                korisnici,
                ime
            });

            console.log(res.data);

            dispatch({
                type: ADD_NEW_GROUP,
                payload: res.data.grupa
            })

            return true;
        } catch (err) {
            console.log(err);
            console.log(err.response);
            let errorMsg = err.response.data.errors[0].msg;
            alert(errorMsg);

            return false;
        }
    }


    return (
        <ChatContext.Provider value={{
            zemiPoraki,
            namestiGrupa,
            kreirajPoraka,
            zemiGrupi,
            namestiAktivniPoraki,
            vmetniPoraka,
            dodajNovaGrupa,
            izmeniGrupa,
            namestiNovaGrupa,
            error: state.error,
            poraki: state.poraki,
            grupa: state.grupa,
            grupi: state.grupi,
            osveziGrupi: state.osveziGrupi,
            aktivniPoraki: state.aktivniPoraki,
            novaGrupa: state.novaGrupa
        }}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatState