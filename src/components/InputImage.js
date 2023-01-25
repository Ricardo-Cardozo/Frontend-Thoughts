import React, { useRef } from 'react'
import styles from './InputImage.module.css'


const InputImage = ({value, onChange, type, accept, name, onClick, fileName}) => {
  const refPick = useRef()

  const pickImage = () => {
    refPick.current.click()
  }
  return (
    <React.Fragment>
    {fileName 
       ?
      <div className={styles.image_file}>
      <input  
          ref={refPick}
          type={type} 
          name={name} 
          accept={accept} 
          id="image" 
          onChange={onChange}
          style={{display: 'none'}}
        />
      <h6 onClick={pickImage} className={styles.image_file_btn} >{value}</h6>
      <p className={styles.image_file_p}>{fileName}</p>
    </div>
    : <div className={styles.image_file}>
    <input  
        ref={refPick}
        type={type} 
        name={name} 
        accept={accept} 
        id="image" 
        onChange={onChange}
        style={{display: 'none'}}
      />
    <h6 onClick={pickImage} className={styles.image_file_btn} >{value}</h6>
    <p className={styles.image_file_p}>No file selected</p>
    <p className={styles.image_file_p}>{fileName}</p>
    
  </div>
    }
    </React.Fragment>
  )
}

export default InputImage