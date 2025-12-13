import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'
import { supabase } from './supabase'

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
  
  // State for submitting (loading state for form)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch thoughts from Supabase when component mounts
  useEffect(() => {
    const fetchThoughts = async () => {
      const { data, error } = await supabase
        .from('thoughts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error("Error fetching thoughts:", error)
      } else {
        setThoughts(data)
      }
      setLoading(false)
    }
    
    fetchThoughts()
  }, [])

  // Function to add a new thought (POST to Supabase)
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    
    if (!newMessage.trim()) return
    if (newMessage.length < 5 || newMessage.length > 140) return
    
    setIsSubmitting(true)
    
    const { data, error } = await supabase
      .from('thoughts')
      .insert([{ message: newMessage, hearts: 0 }])
      .select()
    
    if (error) {
      console.error("Error posting thought:", error)
    } else {
      setThoughts(prevThoughts => [data[0], ...prevThoughts])
      setNewMessage("")
    }
    
    setIsSubmitting(false)
  }

  // Function to like a thought (UPDATE in Supabase)
  const handleLikeThought = async (thoughtId) => {
    // Find current hearts count
    const thought = thoughts.find(t => t.id === thoughtId)
    const newHearts = (thought?.hearts || 0) + 1
    
    const { error } = await supabase
      .from('thoughts')
      .update({ hearts: newHearts })
      .eq('id', thoughtId)
    
    if (error) {
      console.error("Error liking thought:", error)
    } else {
      setThoughts(prevThoughts =>
        prevThoughts.map(t =>
          t.id === thoughtId
            ? { ...t, hearts: newHearts }
            : t
        )
      )
    }
  }

  return (
    <MainWrapper>
      <Container>
        <Title>Happy Thoughts</Title>
        <ThoughtForm 
          onSubmit={handleFormSubmit}
          message={newMessage}
          onMessageChange={setNewMessage}
          isSubmitting={isSubmitting}
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
