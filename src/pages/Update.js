import Input from "../components/Input"
import Textarea from "../components/Textarea"
import ErrorMessage from "../components/ErrorMessage"
import SuccessMessage from "../components/SuccessMessage"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from './Update.module.css'
import Submit from "../components/Submit"
import InputImage from "../components/InputImage"
//import ContentEditable from "../components/ContentEditable"
import EditorPrism from "../components/EditorPrism"
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';


const Update = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [thoughts, setThoughts] = useState([])
  const {id} = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState([])
  const [code, setCode] = useState(``)
  
  useEffect(() => {
    async function edit() {
      const response = await fetch(`https://api-thoughts.onrender.com/thoughts/${id}`)
      const responseData = await response.json()
      setThoughts(responseData)
      setCode(responseData?.thought?.code || '')
    }
    edit()
  }, [id])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('image', file)
      formData.append('code', code)
        const response = await fetch(`https://api-thoughts.onrender.com/thoughts/edit/${id}`, {
        method: 'PATCH',
        body: formData,
        // headers: {
        //     'Content-Type' : 'multipart/form-data'
        // },
        // body: JSON.stringify({
        //   title,
        //   description
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

  console.log(title)
  
  return (
    <div className={styles.container}>
      <h1>Edit</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text='Title'
          type='text'
          name='title'
          id='title'
          placeholder={thoughts.thought?.title}
          onChange={e => setTitle(e.target.value)}
          value={thoughts.thought?.title}
        />
        <Textarea
          text='Description'
          type='text'
          name='description'
          id='description'
          placeholder={thoughts.thought?.description || ''}
          onChange={e => setDescription(e.target.value)}
          defaultValue={thoughts.thought?.description}
        />
        {/* <ContentEditable
          name='code'
          id='code'
          value={thoughts.thought?.code}
          onChange={e => setCode(e.target.value)}
        /> */}
        <EditorPrism
          placeholder={"Example: function EditInput() {}"}
          value={code}
          onChange={setCode}
          highlights={code => highlight(code, languages.js)}
        />
        <InputImage 
          onChange={onInputChange} 
          type="file" 
          value="Choose file" 
          name='image'
          accept='.jpg, .png, .jpeg' 
          fileName={thoughts.thought?.image}
        />
        <Submit type="submit" value="Edit" />
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </div>
  )
}

export default Update