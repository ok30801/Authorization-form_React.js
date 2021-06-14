import axios from "axios"
import {
    CHANGE_NAME, CHANGE_PHONE, CHANGE_PASSWORD, LOADING, LOAD_AVATAR,
    GET_USERS, SHOW_MODAL, HIDE_MODAL, CLEAR_PHONE, POST_USERS, CLEAR_STATE
} from '../Constans/constants'


export const handlerChangeUserNameAC = (value) => {
    return {type: CHANGE_NAME, changeName: value}
}
export const handlerChangePhoneAC = (value) => {
    return {type: CHANGE_PHONE, changePhone: value}
}
export const handlerChangePasswordAC = (value) => {
    return {type: CHANGE_PASSWORD, changePassword: value}
}
export const getUsersAC = (value) => {
    return {type: GET_USERS, getUsers: value}
}
export const postUsersAC = () => {
    return {type: POST_USERS}
}
export const showModalAC = (value) => {
    return {type: SHOW_MODAL, modalShow: value}
}
export const hideModalAC = (value) => {
    return {type: HIDE_MODAL, modalHide: value}
}
export const clearPhoneAC = (value) => {
    return {type: CLEAR_PHONE, valuePhone: value}
}

export const loadAvatarAC = (value) => {
    return {type: LOAD_AVATAR, avatar: value}
}
export const loadingAC = (value) => {
    return {type: LOADING, loading: value}
}
export const clearStateAC = () => {
    return {type: CLEAR_STATE}
}
export const errorAC = (value) => {
    return {type: CLEAR_STATE}
}


export const getUsers = () => {
    return dispatch => {
        axios.get('http://localhost:3005/users')
            .then(response => response.data)
            .then(data => dispatch(getUsersAC(data)))
            .catch(error => dispatch(errorAC(error)))
    }
}

export const postUsers = () => {
    return dispatch => {
        dispatch(postUsersAC())
    }
}