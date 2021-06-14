import classes from './style.module.css'

const Button = ({disabled, onClick, text, url}) => {
    return (
        <button disabled={disabled} className={`${classes.btn} ${classes.loginIn}`} onClick={onClick}>
            {text}{url}
        </button>
    )
}

export default Button