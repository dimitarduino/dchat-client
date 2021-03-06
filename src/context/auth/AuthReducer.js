import { SET_USER, SET_USERS, SET_NEWCHAT_MSG, LOGOUT_USER, AUTH_ERROR, SUCCESS_REGISTER, FAIL_REGISTER, SUCCESS_LOGIN, FAIL_LOGIN, SET_ERROR, CLEAR_ERROR, SET_CHANGING,  CHANGE_PASSWORD_ERROR, CHANGE_PASSWORD_SUCCESS, SET_NEW_GROUP_MSG } from '../types'

export default (state, action) => {
    switch (action.type) {
        case SUCCESS_REGISTER:
        case SUCCESS_LOGIN:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                userAuth: true,
                errors: null
            }
        case LOGOUT_USER:
            return {
                userAuth: null,
                user: null,
                sepromenuvaLozinka: false,
                errors: null,
            }
        case SET_NEW_GROUP_MSG:
            return {
                ...state,
                novaGrupaMsg: action.payload
            }
        case FAIL_REGISTER:
        case FAIL_LOGIN:
        case AUTH_ERROR:
            if (action.payload) {
                // localStorage.removeItem("token");
                return {
                    ...state,
                    userAuth: null,
                    errors: action.payload,
                    user: null,
                    lozinkaPoraka: ""
                }
            }
            break;
        case CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                errors: action.payload,
                lozinkaPoraka: ""
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                errors: null,
                user: action.payload,
                userAuth: true,
                lozinkaPoraka: "Лозинката е успешно променета"
            }
        case SET_ERROR:
            return {
                ...state,
                errors: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                errors: null
            }
        case SET_USER:
            return {
                ...state,
                userAuth: true,
                user: action.payload,
                errors: null,
                sepromenuvaLozinka: false
            }
        case SET_USERS:
            return {
                ...state,
                errors: null,
                users: action.payload
            }
        case SET_CHANGING: {
            return {
                ...state,
                sepromenuvaLozinka: action.payload
            }
        }

        case SET_NEWCHAT_MSG: 
        return {
            ...state,
            users: [...state.users, action.payload.email],
            novaGrupaMsg: action.payload.msg,
            poslednoDodadenMail: action.payload.email
        }

        default:
            return state;
    }
}