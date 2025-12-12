import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'

// API URL
const API_URL = "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts"

const MainWrapper = styled.main`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 16px;
`

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #222;
  margin-bottom: 24px;
`

const LoadingText = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
`

export const App = () => {
  // State for thoughts (list of thoughts)
  const [thoughts, setThoughts] = useState([])
  
  // State for the message (text in the form)
  const [newMessage, setNewMessage] = useState("")
  
  // State for loading
  const [loading, setLoading] = useState(true)

  // Fetch thoughts from API when component mounts
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setThoughts(data)
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching thoughts:", error)
        setLoading(false)
      })
  }, []) // Empty array = run once on mount

  // Function to add a new thought
  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    if (!newMessage.trim()) return
    
    // Create new thought locally (temporary)
    const newThought = {
      _id: Date.now().toString(),
      message: newMessage,
      hearts: 0,
      createdAt: new Date().toISOString()
    }
    
    setThoughts([newThought, ...thoughts])
    setNewMessage("")
  }

  return (
    <MainWrapper>
      <Container>
        <Title>Happy Thoughts</Title>
        <ThoughtForm 
          onSubmit={handleFormSubmit}
          message={newMessage}
          onMessageChange={setNewMessage}
        />
        {loading ? (
          <LoadingText>Loading thoughts...</LoadingText>
        ) : (
          <ThoughtList thoughts={thoughts} />
        )}
      </Container>
    </MainWrapper>
  )
}
