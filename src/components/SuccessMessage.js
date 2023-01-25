import styles from './SuccessMessage.module.css'

const SuccessMessage = ({children}) => {

  return (
    <div className={styles.success_msg}>
      <h3>{children}</h3>
    </div>
  )
}

export default SuccessMessage