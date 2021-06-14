import avatar from '../../assets/img/avatar.jpg'
import axios from "axios";
import {
    CHANGE_NAME, CHANGE_PHONE, CHANGE_PASSWORD, LOADING, LOAD_AVATAR, GET_USERS, POST_USERS, CLEAR_STATE
} from '../Constans/constants'

const initialState = {
    inputUser: 'name',
    inputPhone: 'phone',
    inputPassword: '',
    avatar: avatar,
    loader: false,
    usersPhones: ''
}

export default function registrationReducer(state = initialState, action) {

    let stateCopy = {...state}

    switch (action.type) {

        case CHANGE_NAME: {
            if (typeof action.changeName === 'string') {
                stateCopy.inputUser = action.changeName
            } else {
                stateCopy.inputUser = action.changeName.name
            }
            return stateCopy
        }
        case CHANGE_PHONE: {
            if (typeof action.changePhone === 'string') {
                stateCopy.inputPhone = action.changePhone
            } else {
                stateCopy.inputPhone = action.changePhone.phone
            }
            return stateCopy
        }
        case CHANGE_PASSWORD: {
            stateCopy.inputPassword = action.changePassword
            return stateCopy
        }
        case LOAD_AVATAR: {
            if (typeof action.avatar === 'string') {
                stateCopy.avatar = action.avatar
            } else {
                stateCopy.avatar = action.avatar.avatar
            }
            return stateCopy
        }
        case LOADING: {
            stateCopy.loader = action.loading
            return stateCopy
        }
        case GET_USERS: {
            stateCopy.usersPhones = action.getUsers.map(item => item.phone)
            return stateCopy
        }
        case CLEAR_STATE: {
            stateCopy.inputUser = 'name'
            stateCopy.inputPhone = 'phone'
            stateCopy.avatar = avatar
            return stateCopy
        }
        case POST_USERS: {
            const registrationData = {
                name: stateCopy.inputUser,
                phone: stateCopy.inputPhone,
                password: stateCopy.inputPassword,
                avatar: stateCopy.avatar
            }
            axios.post('http://localhost:3005/users', registrationData)
            return stateCopy
        }
        default:
            return state
    }
}






