import React, {useRef, useState} from 'react'
import Button from '../../components/Buttons'
import {Link} from 'react-router-dom'
import validatePhone from '../../utils/validatePhone'
import normalizePhoneNumber from '../../utils/normalizePhoneNumber'
import {useDispatch, useSelector} from "react-redux"
import {handlerChangePhoneAC, showModalAC} from '../../redux/Actions/actions'
import Modal from '../../components/Modal/index'
import Swal from 'sweetalert2'
import classes from './style.module.css'


const RecoveryPassword = () => {

    const phone = useRef()
    const dispatch = useDispatch()
    const inputPhone = useSelector(state => state.auth.inputPhone)
    const modal = useSelector(state => state.auth.modal)

    const [attentionClassPhone, setAttentionClassPhone] = useState('')

    // Запись value поля Phone в Store
    const handlerChangePhone = (value) => {
        dispatch(handlerChangePhoneAC(value))
    }

    // Восстановление пароля
    const recoveryPassword = (e) => {
        e.preventDefault()

        if (inputPhone === 'phone') {
            setAttentionClassPhone(classes.attention)
            phone.current.focus()
        } else if (validatePhone(inputPhone)) {
            phone.current.focus()
            setAttentionClassPhone(classes.borderRed)
            Swal.fire({
                icon: 'warning',
                text: validatePhone(inputPhone),
                showConfirmButton: true,
            })
        } else {
            dispatch(showModalAC(true))
        }
    }
    const removeAttentionClassPhone = () => {
        setAttentionClassPhone('')
    }

    return (
        <div className={classes.RecoveryPassword}>

            <form className={classes.form}>
                <input ref={phone}
                       type="tel"
                       id="phone"
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

                <Button text='Recovery password' onClick={recoveryPassword}/>

                <div className={classes.blockLink}>
                    <div className={classes.forgotLink}>
                        <Link to={"/"}>Remembered!</Link>
                    </div>

                    <div className={classes.forgotLink}>
                        <Link to={"registration"}>Registration</Link>
                    </div>
                </div>

            </form>
            <Modal phone={inputPhone} show={modal} />
        </div>
    )
}
export default RecoveryPassword
