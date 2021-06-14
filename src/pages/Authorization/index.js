import React, {useState, useEffect, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Button from '../../components/Buttons'
import validatePhone from '../../utils/validatePhone'
import validatePassword from '../../utils/validatePassword'
import normalizePhoneNumber from '../../utils/normalizePhoneNumber'
import {getUsers, handlerChangePhoneAC, handlerChangePasswordAC} from '../../redux/Actions/actions'
import {useDispatch, useSelector} from "react-redux";
import Swal from 'sweetalert2'
import localData from '../../utils/localData'
import classes from './style.module.css'


const Authorization = () => {

    const dispatch = useDispatch()
    const inputPhone = useSelector(state => state.auth.inputPhone)
    const inputPassword = useSelector(state => state.auth.inputPassword)
    const usersAll = useSelector(state => state.auth.usersAll)

    const history = useHistory()
    const passwordInput = useRef()
    const phoneInput = useRef()

    const [attentionClassPhone, setAttentionClassPhone] = useState('')
    const [attentionClassPassword, setAttentionClassPassword] = useState('')
    const [checkRememberPhoneToggle, setCheckRememberPhoneToggle] = useState(true)

    // Загрузка базы данных телефонных номеров
    useEffect(() => {

        dispatch(getUsers())

        if (localData) {
            if (localData.phone) {
                dispatch(handlerChangePhoneAC(localData.phone))
            } else {
                dispatch(handlerChangePhoneAC('phone'))
            }
        }
    }, [])

    //Авторизация
    const signIn = async (e) => {

        e.preventDefault()

        if (inputPhone === 'phone') {
            setAttentionClassPhone(classes.attention)
            phoneInput.current.focus()
        } else if (validatePhone(inputPhone)) {
            phoneInput.current.focus()
            setAttentionClassPhone(classes.borderRed)
            Swal.fire({
                icon: 'warning',
                text: validatePhone(inputPhone),
                showConfirmButton: true,
            })
        } else if (!inputPassword) {
            setAttentionClassPassword(classes.attention)
            passwordInput.current.focus()
        } else if (validatePassword(inputPassword)) {
            passwordInput.current.focus()
            setAttentionClassPassword(classes.borderRed)
            Swal.fire({
                icon: 'warning',
                text: validatePassword(inputPassword),
                showConfirmButton: true,
            })
        } else {
            if (checkRememberPhoneToggle) {
                localStorage.setItem('userData', JSON.stringify({phone: inputPhone}))
            }
            const getAuthUserData = usersAll.filter(phone => phone.phone === inputPhone)

            if (!getAuthUserData[0]) {
                await Swal.fire({
                    icon: 'warning',
                    title: `Пользователь не найден.<br> Пройдите регистрацию!`,
                    showConfirmButton: true,
                })
                history.replace('/registration')
            } else if (getAuthUserData[0] && getAuthUserData[0].password !== inputPassword) {
                await Swal.fire({
                    icon: 'warning',
                    title: `Пароль не верен!<br> Пройдите восстановление `,
                    showConfirmButton: true,
                })
                history.replace('/recovery-password')
            } else {
                history.replace('/person-area')
            }
        }
    }

    const removeAttentionClassPhone = () => setAttentionClassPhone('')
    const removeAttentionClassPassword = () => setAttentionClassPassword('')

    // Запись value поля Phone в Store
    const handlerChangePhone = (value) => dispatch(handlerChangePhoneAC(value))
    const handlerChangePassword = (value) => dispatch(handlerChangePasswordAC(value))
    const handleCheckedRememberPhone = () => setCheckRememberPhoneToggle(!checkRememberPhoneToggle)

    return (

        <div className={classes.Auth}>
            <form className={classes.form}>

                <input ref={phoneInput}
                       type="tel"
                       name="phone"
                       placeholder={inputPhone}
                       maxLength="16"
                       autoComplete="phone"
                       className={attentionClassPhone}
                       onChange={(e) => {
                           e.target.value = normalizePhoneNumber(e.target.value)
                           handlerChangePhone(e.target.value)
                           removeAttentionClassPhone()
                       }}
                />

                <input ref={passwordInput}
                       type="password"
                       name="password"
                       placeholder='password'
                       autoComplete="current-password"
                       className={attentionClassPassword}
                       onChange={(e) => {
                           handlerChangePassword(e.target.value)
                           removeAttentionClassPassword()
                       }}
                />

                <div className={classes.boxChecked} onClick={handleCheckedRememberPhone}>
                        <span className={classes.check}>
                            {
                                checkRememberPhoneToggle
                                    ? <i className="fas fa-check"></i>
                                    : ''
                            }
                        </span>
                    <span className={classes.labelCheckbox}>Remember phone</span>
                    <div className={classes.forgotLink}>
                        <Link to={"recovery-password"}>Forgot?</Link>
                    </div>
                </div>

                <Button text='Sign in' onClick={signIn}/>
                <Link to={'registration'}>
                    <button className={classes.signUp}>Sign up</button>
                </Link>
            </form>
        </div>
    )
}
export default Authorization
