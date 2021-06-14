import {CHANGE_PHONE, CHANGE_PASSWORD, SHOW_MODAL, HIDE_MODAL, CLEAR_PHONE, GET_USERS} from '../Constans/constants'

const initialState = {
    inputPhone: 'phone',
    inputPassword: '',
    savePhone: true,
    modal: false,
    usersAll: ''
}

export default function authReducer(state = initialState, action) {

    let stateCopy = {...state}

    switch(action.type) {

        case CHANGE_PHONE: {
            if (typeof action.changePhone === 'string') {
                stateCopy.inputPhone = action.changePhone
            } else {
                stateCopy.inputPhone = action.changePhone.phone
            }
            return stateCopy
        }
        case CHANGE_PASSWORD: {
            if (typeof action.changePassword === 'string') {
                stateCopy.inputPassword = action.changePassword
            } else {
                stateCopy.inputPassword = action.changePassword.password
            }
            return stateCopy
        }
        case SHOW_MODAL: {
            stateCopy.modal = action.modalShow
            return stateCopy
        }
        case HIDE_MODAL: {
            stateCopy.modal = action.modalHide
            return stateCopy
        }
        case CLEAR_PHONE: {
            stateCopy.inputPhone = action.valuePhone
            return stateCopy
        }
        case GET_USERS: {
            stateCopy.usersAll = action.getUsers
            return stateCopy
        }
        default:
            return state
    }
}





