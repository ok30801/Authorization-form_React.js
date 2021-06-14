import img from '../../assets/img/404.png'
import style from './style.module.css'

const NotFound = () => (
        <div className={style.wrap}>
            <img src={img} alt='404'/>
            <div className={style.message}>This page was not found</div>
        </div>

    )

export default NotFound;