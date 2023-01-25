import styles from './Submit.module.css'

const Submit = ({ type, value, onClick }) => {
  return (
    <div className={styles.submit_container}>
      <input onClick={onClick} className={styles.submit}type={type} value={value} />
    </div>
  )
}

export default Submit