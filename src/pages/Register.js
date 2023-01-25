import { useState } from "react"
import ErrorMessage from "../components/ErrorMessage"
import Input from "../components/Input"
import SuccessMessage from "../components/SuccessMessage"
import Textarea from "../components/Textarea"
import styles from './Register.module.css'
import Submit from "../components/Submit"
//import { useNavigate } from "react-router-dom"
import InputImage from "../components/InputImage"
//import ContentEditable from "../components/ContentEditable"
import EditorPrism from "../components/EditorPrism"
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

const Register = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [file, setFile] = useState([])
  const [code, setCode] = useState('')

  //const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('image', file)
      formData.append('code', code)
      const response = await fetch('https://api-thoughts.onrender.com/thoughts/register', {
        method: 'POST',
        // headers: {
        //   'Content-Type' : 'multipart/form-data'
        // },
        body: formData
        // body: JSON.stringify({
        //   title,
        //   description,
        //   file
        // })
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.message)
      } else {
        setError('')
        setSuccess(responseData.message)
        setTimeout(() => {
          setSuccess('')
        }, 1000);
        setTitle('')
        setDescription('')
      }
    } catch (err) {
      setSuccess('')
      setError(err.message)
    }
  }

  const onInputChange = (e) => {
    setFile(e.target.files[0])
    console.log(file.name)
  }

  
  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text='Title'
          type='text'
          name='title'
          id='title'
          placeholder='Enter with a title for the thought!'
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
        <Textarea
          text='Description'
          type='text'
          name='description'
          id='description'
          placeholder='Enter with a description for the thought!'
          onChange={e => setDescription(e.target.value)}
          value={description}
        />
        {/* <ContentEditable
          name='code'
          id='code'
          value={code}
          onChange={e => setCode(e.target.value)}
        /> */}
        <EditorPrism
          value={code}
          onChange={code => setCode(code)}
          highlights={code => highlight(code, languages.js)}
          placeholder={`Example: function EnterValue(event) {}`}
        />

        <InputImage 
          onChange={onInputChange} 
          type="file" 
          value="Choose file" 
          name='image'
          accept='.jpg, .png, .jpeg' 
          fileName={file.name}
        />
        
        
        <Submit type="submit" value="Register" />
      </form>
     
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </div>
  )
}

export default Register