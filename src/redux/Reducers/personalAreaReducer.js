import avatar from '../../assets/img/avatar.jpg'
import {GET_USERS} from '../Constans/constants'

const initialState = {
    avatar: avatar,
    users: []
}

export default function personalAreaReducer(state = initialState, action) {

    let stateCopy = {...state}

    switch(action.type) {

        case GET_USERS: {
            stateCopy.users = action.getUsers
            return stateCopy
        }
        default:
            return state
    }
}






