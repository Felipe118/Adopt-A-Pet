import {Link} from 'react-router-dom'

import Logo from '../../assets/img/logo.png'


//css
import styles from './Navbar.module.css'


function Navbar() {
    return (
        <nav className={styles.navbar}>
        <div className={styles.navbar_logo}>
            <img src={Logo} alt='Adopt a Pet'/>
        </div>
        <ul className={styles.navbar}>
            <li className={styles.navbar}>
                <Link to='/'>Adotar</Link>
            </li>
            <li className={styles.navbar}>
                <Link to='/login'>Entrar</Link>
            </li>
            <li className={styles.navbar}>
                <Link to='/register'>Cadastrar</Link>
            </li>
        </ul>
        </nav>
    )
}
export default Navbar