import { Link } from "react-router-dom"
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.brand} to='/'><h2>Thoughts<span className={styles.span}>|JS</span></h2></Link>
      <ul>
        <li>
          <Link className={styles.link} to='/'>Home</Link>
        </li>
        <li>  
          <Link className={styles.link} to='/dashboard'>Dashboard</Link>
        </li>
        <li>
          <Link className={styles.link} to='/register'>Register</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar