import styles from './Input.module.css'
const Input = ({text, type, name, id, placeholder, value, onChange}) => {
  return (
    <div className={styles.input_container}>
      <label className={styles.label}>
        <span>{text}</span> 
        <input 
          className={styles.input} 
          type={type} 
          name={name} 
          id={id} 
          placeholder={placeholder} 
          //value={value} 
          onChange={onChange}
          defaultValue={value}
        />
      </label>
    </div>
  )
}

export default Input