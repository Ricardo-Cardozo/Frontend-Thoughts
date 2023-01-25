import styles from './ErrorMessage.module.css'
const Error = ({ children }) => {
  return (
    <div className={styles.error_msg} >
      <h3>{children}</h3>
    </div>
  )
}

export default Error