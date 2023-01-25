import Card from '../components/Card'
import ErrorMessage from '../components/ErrorMessage'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Input from '../components/Input'
import styles from './Home.module.css'
import { useLocation } from 'react-router-dom'
import SuccessMessage from '../components/SuccessMessage'

const Home = () => {
  const [thoughts, setThoughts] = useState([])
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filterThoughts, setFIlterThoughts] = useState([])

  const location = useLocation()
  let message = ''
  if (location.state) {
    message = location.state.message
  }

  //console.log(thoughts)


  const getUsers = useCallback(async () => { 
      try {
        const response = await fetch('https://api-thoughts.onrender.com/thoughts/')
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message || 'Not found thoughts, make a register!')
        }
        setThoughts(responseData)
      } catch (err) {
        setError(err.message ||"Not found thoughts, make a register!")
      }
    
  }, [thoughts]) // eslint-disable-line

  useEffect(() => {
    getUsers()
  }, []) // eslint-disable-line


  

  useMemo(() => {
    setFIlterThoughts(
      Array.isArray(thoughts.thoughts) && thoughts.thoughts.filter(thought => {
        return thought.title.toLowerCase().includes(search.toLocaleLowerCase())
      })
    )
    
  }, [search, thoughts])

  // useEffect(() => {
  //   console.log(use)
  // }, [use])

  return (
    <div className={styles.container}>
      <h1>Your Thoughts</h1>
      {message && <SuccessMessage>{message}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage> }
      {!error 
        ? 
            <Input 
              type="text" 
              name="search" 
              id="search" 
              placeholder='Search any thought' 
              onChange={e => setSearch(e.target.value)}
            /> 
        : ''
      }
      {!error 
        ? Array.isArray(filterThoughts) 
        && filterThoughts.length > 0 
          && filterThoughts.map((thought, i) => (
           
            
            <Card
              key={i}
              title={thought.title}
              description={thought.description}
              code={thought.code}
              src={`https://api-thoughts.onrender.com/images/${thought.image}`}
              alt={thought.image}
            />
            
          ))   
        : ''
      }
      {!error 
        ? Array.isArray(filterThoughts) 
        && filterThoughts.length === 0 
          && <h1 className={styles.notFound}>Thought not found!</h1>
        : ''
      }
    </div>
  )
}

export default Home