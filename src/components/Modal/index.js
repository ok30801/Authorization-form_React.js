import {useRef, useState} from 'react'
import Button from '../Buttons'
import localData from '../../utils/localData'
import Swal from 'sweetalert2'
import cn from 'classnames'
import classes from './style.module.css'
import {useDispatch} from "react-redux";
import {hideModalAC} from "../../redux/Actions/actions";

const Modal = (props) => {

    const codeInput = useRef()
    const dispatch = useDispatch()
    const [attentionClass, setAttentionClass] = useState('')

    const hideModal = () => dispatch(hideModalAC(false))

    let codeCountry = ''
    let codeOperator = ''
    let numberPhoneOne = ''
    let numberPhoneTwo = ''
    let numberPhoneTree = ''

    if (props.phone === 'phone' && localData === null) {
        return false
    } else if (props.phone !== 'phone') {
        codeCountry = props.phone.slice(0, 2)
        codeOperator = props.phone.slice(3, 6)
        numberPhoneOne = props.phone.slice(7, 10)
        numberPhoneTwo = props.phone.slice(11, 13)
        numberPhoneTree = props.phone.slice(14)
    } else {
        codeCountry = localData.phone.slice(0, 2)
        codeOperator = localData.phone.slice(3, 6)
        numberPhoneOne = localData.phone.slice(7, 10)
        numberPhoneTwo = localData.phone.slice(11, 13)
        numberPhoneTree = localData.phone.slice(14)
    }

    const sendCode = () => {
        if (codeInput.current.value === '') {
            setAttentionClass(classes.attention)
            codeInput.current.focus()
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Код получен!',
                text: 'Ждите дальнейших иснтрукций',
                showConfirmButton: true,
            })
        }
    }
    const removeAttentionClass = () => setAttentionClass('')

    return (
        <div className={cn(classes.Modal, {[classes.show]: props.show})}>
            <div className={classes.Modal__wrap}>
                <div className={classes.Modal__close} onClick={hideModal}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </div>
                <div className={classes.Modal__title}>Введите код из SMS</div>
                <input ref={codeInput}
                       type='text'
                       maxLength='6'
                       className={attentionClass}
                       onChange={() => removeAttentionClass()}
                />
                <div className={classes.Modal__phone}>
                    Мы выслали код на
                    номер {codeCountry} ({codeOperator}) {numberPhoneOne}-{numberPhoneTwo}-{numberPhoneTree}
                </div>
                <div className={classes.btn}>
                    <Button text='Send code' onClick={sendCode}/>
                </div>
            </div>
        </div>
    )
}
export default Modal