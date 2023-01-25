import styles from './Card.module.css'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { useEffect } from 'react'
import "./ContentEditable.module.css";

const Card = ({ title, description, src, alt, code }) => {

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className={styles.card_container}>
      <div className={styles.card}>
        <h2 className={styles.cardTitle}><b>{title}</b></h2>
        <p className={styles.cardDesc}>{description}</p>
        <label>
        <p className={styles.example}>Code example:</p>
        <pre >
          <code className={'language-js'}>{code}</code>
        </pre>
        </label>
        <img src={src} alt={alt} />
      </div>
    </div>
  )
}

export default Card