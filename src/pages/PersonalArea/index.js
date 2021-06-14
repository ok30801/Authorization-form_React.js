import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Button from '../../components/Buttons'
import {getUsers, clearPhoneAC} from '../../redux/Actions/actions'
import {useDispatch, useSelector} from 'react-redux'
import defaultAvatar from '../../assets/img/avatar.jpg'
import classes from './style.module.css'

const PersonalArea = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const userPhone = useSelector(state => state.auth.inputPhone)
    const usersAll = useSelector(state => state.personalArea.users)

    const currentUser = usersAll.filter(item => item.phone === userPhone)
    const userAvatar = currentUser.map(item => item.avatar)
    const userName = currentUser.map(item => item.name)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const out = () => {
        localStorage.clear()
        dispatch(clearPhoneAC('phone'))
        history.replace('/')
    }

    return (

        <div className={classes.PersonalArea}>
            {
                userAvatar
                    ? <img src={userAvatar} alt="avatar"/>
                    : <img src={defaultAvatar} alt="avatar"/>
            }
            <div className={classes.userName}>{userName}</div>
            Личный кабинет
            <div className={classes.btn}>
                <Button text="Out" onClick={out}/>
            </div>
        </div>
    )
}
export default PersonalArea
