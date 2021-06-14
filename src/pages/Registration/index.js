import React, {useState, useRef, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Button from '../../components/Buttons'
import validatePassword from '../../utils/validatePassword'
import validatePhone from '../../utils/validatePhone'
import normalizePhoneNumber from '../../utils/normalizePhoneNumber'
import Loader from '../../components/Loader'
import {
    getUsers,
    postUsers,
    handlerChangeUserNameAC,
    handlerChangePhoneAC,
    handlerChangePasswordAC, loadingAC, loadAvatarAC, clearStateAC
} from '../../redux/Actions/actions'
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import localData from '../../utils/localData'
import classes from './style.module.css'

const Registration = () => {

    const dispatch = useDispatch()
    const usersPhones = useSelector(state => state.registration.usersPhones)
    const inputUser = useSelector(state => state.registration.inputUser)
    const inputPhone = useSelector(state => state.registration.inputPhone)
    const inputPassword = useSelector(state => state.registration.inputPassword)
    const loader = useSelector(state => state.registration.loader)
    const avatar = useSelector(state => state.registration.avatar)

    const history = useHistory()
    const userName = useRef()
    const phone = useRef()
    const password = useRef()

    const [attentionClassUser, setAttentionClassUser] = useState('')
    const [attentionClassPhone, setAttentionClassPhone] = useState('')
    const [attentionClassPassword, setAttentionClassPassword] = useState('')

    // Загрузка базы данных телефонных номеров
    useEffect(() => {

        dispatch(getUsers())

        if (localData) {
            if (localData.name) {
                dispatch(handlerChangeUserNameAC(localData.name))
            } else {
                dispatch(handlerChangeUserNameAC('name'))
            }

            if (localData.phone) {
                dispatch(handlerChangePhoneAC(localData.phone))
            } else {
                dispatch(handlerChangePhoneAC('phone'))
            }

            if (localData.avatar) {
                dispatch(loadAvatarAC(localData.avatar))
            }
        }
    }, [])

    const registration = async (e) => {

        e.preventDefault()

        if (inputUser === 'name' || inputUser === '') {
            userName.current.focus()
            setAttentionClassUser(classes.attention)
        } else if (inputPhone === 'phone') {
            phone.current.focus()
            setAttentionClassPhone(classes.attention)
        } else if (validatePhone(inputPhone)) {
            phone.current.focus()
            setAttentionClassPhone(classes.borderRed)
            Swal.fire({
                icon: 'warning',
                text: validatePhone(inputPhone),
                showConfirmButton: true,
            })
        } else if (password.current.value === '') {
            password.current.focus()
            setAttentionClassPassword(classes.attention)
        } else if (validatePassword(password.current.value)) {
            password.current.focus()
            setAttentionClassPassword(classes.borderRed)
            Swal.fire({
                icon: 'warning',
                text: validatePassword(inputPassword),
                showConfirmButton: true,
            })
        } else {

            if (usersPhones.find(phone => phone === inputPhone)) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Пользователь с такими данными уже зарегистрирован',
                    showConfirmButton: true,
                })
                history.replace('/')
            } else {
                dispatch(postUsers())
                dispatch(clearStateAC())
                await Swal.fire({
                    icon: 'success',
                    text: 'Поздравляю! Вы зарегистрировались',
                    showConfirmButton: true,
                })
                history.replace('/person-area')
            }
        }
    }

    const removeAttentionClassName = () => setAttentionClassUser('')
    const removeAttentionClassPhone = () => setAttentionClassPhone('')
    const removeAttentionClassPassword = () => setAttentionClassPassword('')

    let userData = JSON.parse(localStorage.getItem('userData') || null)

    // Запись value поля Name в Store
    const handlerChangeUserName = (value) => {
        dispatch(handlerChangeUserNameAC(value))
        localStorage.setItem('userData', JSON.stringify({...userData, name: userName.current.value}))
    }

    // Запись value поля Phone в Store
    const handlerChangePhone = (value) => {
        dispatch(handlerChangePhoneAC(value))
        localStorage.setItem('userData', JSON.stringify({...userData, phone: phone.current.value}))
    }

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'q7rt9s6l')
        dispatch(loadingAC(true))
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dfqwdsocn/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        dispatch(loadingAC(false))

        dispatch(loadAvatarAC(file.url))
        localStorage.setItem('userData', JSON.stringify({...userData, avatar: file.url}))
    }

    // Запись value поля Password в Store
    const handlerChangePassword = (value) => {
        dispatch(handlerChangePasswordAC(value))
    }

    return (
        <div className={classes.Registration}>
            <form className={classes.form}>
                <input ref={userName}
                       type="text"
                       id="name"
                       className={attentionClassUser}
                       name="user"
                       placeholder={inputUser}
                       onChange={(e) => {
                           handlerChangeUserName(e.target.value)
                           removeAttentionClassName()
                       }}
                />
                <input ref={phone}
                       type="tel"
                       name="phone"
                       placeholder={inputPhone}
                       maxLength="16"
                       className={attentionClassPhone}
                       onChange={(e) => {
                           e.target.value = normalizePhoneNumber(e.target.value)
                           handlerChangePhone(e.target.value)
                           removeAttentionClassPhone()
                       }}
                />
                <input ref={password}
                       type="password"
                       name="password"
                       placeholder="password"
                       autoComplete="current-password"
                       className={attentionClassPassword}
                       onChange={(e) => {
                           handlerChangePassword(e.target.value)
                           removeAttentionClassPassword()
                       }}
                />
                <div className={classes.uploadImage}>
                    <div className={classes.avatar}>
                        <img src={avatar} alt="avatar"/>
                    </div>
                    {
                        !loader
                            ? <input className={classes.inputUpload} type="file" onChange={uploadImage}/>
                            : <Loader/>
                    }
                </div>
                <Button text='Registration' onClick={registration}/>
            </form>
        </div>
    )
}

export default Registration