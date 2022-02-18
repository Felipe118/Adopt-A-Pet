import { useContext } from 'react'
import {Link} from 'react-router-dom'


import Logo from '../../assets/img/logo.png'

//context
import { Context } from '../../context/UserContext'


//css
import styles from './Navbar.module.css'


function Navbar() {
    const {authenticated,logout} = useContext(Context)
    return (
        <nav className={styles.navbar}>
        <div className={styles.navbar_logo}>
            <img src={Logo} alt='Adopt a Pet'/>
        </div>
        <ul className={styles.navbar}>
            <li className={styles.navbar}>
                <Link to='/'>Adotar</Link>
            </li>
            {
                authenticated ? (
                <>
                    <li onClick={logout} className={styles.navbar}>Sair</li>
                </>
                ) : (<>
                 <li className={styles.navbar}>
                    <Link to='/login'>Entrar</Link>
                </li>
                <li className={styles.navbar}>
                    <Link to='/register'>Cadastrar</Link>
                </li>
                </>) 


            }
           
        </ul>
        </nav>
    )
}
export default Navbar