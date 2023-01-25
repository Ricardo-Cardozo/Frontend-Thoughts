import styles from './Modal.module.css'

const Modal = ({id, onClose, onSubmit, value, message}) => {
  const handleClick = e => {
    if (e.target.id === id) {
      onClose()
    }
  }
  return (
    <div id={id} className={styles.modal} onClick={handleClick}>

      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <span className={styles.close} onClick={onClose}>&times;</span>
          <h2>Delete thought</h2>
        </div>
        <div className={styles.modal_body}>
          <p>{message}</p>
        </div>
        <div className={styles.modal_footer}>
          <button className={styles.deleteModal} onClick={onSubmit}>{value}</button>
        </div>
      </div>
    </div>
  )
}

export default Modal