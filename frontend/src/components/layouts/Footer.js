//css
import styles from  './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <p>
                <span className="bold"> 
                    Adopt a Pet
                </span> &copy; 2021
            </p>
        </footer>
    )
}
export default Footer