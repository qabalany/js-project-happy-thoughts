import { useState } from 'react'
import styled from 'styled-components'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'

// Dummy data for testing - will be replaced with API later
const dummyThoughts = [
  {
    _id: "1",
    message: "I just learned React and it's awesome!",
    hearts: 5,
    createdAt: "2 minutes ago"
  },
  {
    _id: "2", 
    message: "Coffee makes everything better ☕",
    hearts: 12,
    createdAt: "10 minutes ago"
  },
  {
    _id: "3",
    message: "Finally finished my project!",
    hearts: 8,
    createdAt: "1 hour ago"
  }
]

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

export const App = () => {
  // State for thoughts (list of thoughts)
  const [thoughts, setThoughts] = useState(dummyThoughts)
  
  // State for the message (text in the form)
  const [newMessage, setNewMessage] = useState("")

  // Function to add a new thought
  const handleFormSubmit = (event) => {
    event.preventDefault() // منع reload الصفحة
    
    // Don't add if the text is empty
    if (!newMessage.trim()) return
    
    // Create new thought
    const newThought = {
      _id: Date.now().toString(), // Temporary ID
      message: newMessage,
      hearts: 0,
      createdAt: "Just now"
    }
    
    // Add the new thought to the beginning of the array
    setThoughts([newThought, ...thoughts])
    
    // Clear the form
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
        <ThoughtList thoughts={thoughts} />
      </Container>
    </MainWrapper>
  )
}
