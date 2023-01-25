import styles from './Input.module.css'
const Textarea = ({ text, name, id, placeholder, value, onChange, defaultValue, highlights}) => {
  return (
    <div className={styles.input_container}>
      <label className={styles.label}>
        <span>{text}</span>
        <textarea 
          className={styles.textarea}
          name={name} 
          id={id} 
          placeholder={placeholder} 
          onChange={onChange} 
          value={value}
          defaultValue={defaultValue}
          highlight={highlights}
        >        
        </textarea>
      </label>
    </div>
  )
}

export default Textarea