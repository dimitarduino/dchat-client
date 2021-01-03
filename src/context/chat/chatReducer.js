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
    SET_NEW_GROUP,
    SUCCESS_DELETE_MESSAGE
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case SET_GROUP:
            return {
                ...state,
                grupa: action.payload
            }
        case SET_GROUPS:
            const sortiraniGrupi = action.payload.sort((a,b) => (a.poslednaPoraka < b.poslednaPoraka) ? 1 : ((b.poslednaPoraka < a.poslednaPoraka) ? -1 : 0));
            return {
                ...state,
                grupi: sortiraniGrupi,
                osveziGrupi: false
            }
        case UPDATE_GROUP:
            var grupiPredUpdate = state.grupi;

            for (let i = 0; i < grupiPredUpdate.length; i++) {
                if (grupiPredUpdate[i]._id == action.payload) {
                    grupiPredUpdate[i].poslednaPoraka = new Date().getTime();
                }
            }

            const sortiraniGrupiUpdate = grupiPredUpdate.sort((a,b) => (a.poslednaPoraka < b.poslednaPoraka) ? 1 : ((b.poslednaPoraka < a.poslednaPoraka) ? -1 : 0));

            return {
                ...state,
                grupi: sortiraniGrupiUpdate
            }
        case SUCCESS_CHANGE_GROUP:
            console.log(action.payload);
            let promenetiGrupi = state.grupi.map(grupa => {
                if (grupa._id == action.payload._id) {
                    grupa = action.payload;
                }

                return grupa;
            })

            console.log(promenetiGrupi);
            return {
                ...state,
                grupi: promenetiGrupi,
                grupa: action.payload
            }
        case ADD_NEW_GROUP:
            return {
                ...state,
                grupi: [...state.grupi, action.payload],
                grupa: action.payload
            }
        case SUCCESS_ADD_MESSAGE: 
        var grupiPredUpdate1 = state.grupi;

        var grupaInfo = grupiPredUpdate1.filter(r => r._id == action.payload.grupa);

        var osveziGrupi = false;
        if (grupaInfo.length == 0) {
            osveziGrupi=true;
        }

            for (let i = 0; i < grupiPredUpdate1.length; i++) {
                if (grupiPredUpdate1[i]._id == action.payload.grupa) {
                    grupiPredUpdate1[i].poslednaPoraka = new Date().getTime();
                }
            }

            const sortiraniGrupiPredUpdate = grupiPredUpdate1.sort((a,b) => (a.poslednaPoraka < b.poslednaPoraka) ? 1 : ((b.poslednaPoraka < a.poslednaPoraka) ? -1 : 0));

        return {
            ...state,
            poraki: [...state.poraki, action.payload],
            aktivniPoraki: [...state.aktivniPoraki, action.payload],
            error: null,
            grupi: sortiraniGrupiPredUpdate,
            osveziGrupi
        }
     
        case SET_NEW_GROUP:
            return {
                ...state,
                novaGrupa: action.payload
            }
        break;
        case SET_MESSAGES:
           
            return {
                ...state,
                poraki: action.payload,
                error: null
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        case SET_ACTIVE_MESSAGES:
            return {
                ...state,
                aktivniPoraki: action.payload
            }
        default:
            return state;
    }
}