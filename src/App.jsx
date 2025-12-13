import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'

// API URL
const API_URL = "https://happy-thoughts-api-6cxk.onrender.com/thoughts"

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

  // Function to add a new thought (POST to API)
  const handleFormSubmit = (event) => {
    event.preventDefault()
    
    if (!newMessage.trim()) return
    
    // POST the new thought to API
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: newMessage })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to post thought")
        }
        return response.json()
      })
      .then(newThought => {
        // Add the new thought from API to the beginning of the list
        setThoughts(prevThoughts => [newThought, ...prevThoughts])
        setNewMessage("")
      })
      .catch(error => {
        console.error("Error posting thought:", error)
      })
  }

  // Function to like a thought (POST to API)
  const handleLikeThought = (thoughtId) => {
    fetch(`${API_URL}/${thoughtId}/like`, {
      method: "POST"
    })
      .then(response => response.json())
      .then(updatedThought => {
        // Update the thought in state with new hearts count
        setThoughts(prevThoughts =>
          prevThoughts.map(thought =>
            thought._id === thoughtId
              ? { ...thought, hearts: updatedThought.hearts }
              : thought
          )
        )
      })
      .catch(error => {
        console.error("Error liking thought:", error)
      })
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
          <ThoughtList thoughts={thoughts} onLike={handleLikeThought} />
        )}
      </Container>
    </MainWrapper>
  )
}
