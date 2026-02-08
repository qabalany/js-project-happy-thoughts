import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'
import { AuthForm } from './components/AuthForm'

// Backend API URL
const API_URL = 'https://js-project-api-7ve2.onrender.com'

// Character limit constants (shared with ThoughtForm)
const MIN_LENGTH = 5
const MAX_LENGTH = 140

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

const UserBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e8f5e9;
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #c8e6c9;
`

const UserInfo = styled.span`
  font-size: 0.95rem;
  color: #2e7d32;
  font-weight: 500;
`

const LogoutButton = styled.button`
  padding: 6px 14px;
  background-color: #fff;
  color: #d32f2f;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid #d32f2f;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ffebee;
  }
`

const ControlsBar = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 16px;
`

const Select = styled.select`
  padding: 8px 10px;
  font-size: 0.8rem;
  border: 2px solid #ccc;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-family: inherit;
  min-width: 0;
  flex-shrink: 1;
`

const FilterButton = styled.button`
  padding: 8px 12px;
  font-size: 0.8rem;
  white-space: nowrap;
  border: 2px solid ${props => props.$active ? '#ffadad' : '#ccc'};
  background-color: ${props => props.$active ? '#ffadad' : '#fff'};
  color: #222;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ffadad;
  }
`

const PaginationBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
`

const PageButton = styled.button`
  padding: 8px 16px;
  font-size: 0.9rem;
  border: 2px solid #ccc;
  background-color: ${props => props.disabled ? '#f5f5f5' : '#fff'};
  color: ${props => props.disabled ? '#999' : '#222'};
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: #ffadad;
  }
`

const PageInfo = styled.span`
  font-size: 0.9rem;
  color: #666;
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
  
  // State for liked thoughts (from localStorage)
  const [likedThoughts, setLikedThoughts] = useState(() => {
    const saved = localStorage.getItem('likedThoughts')
    return saved ? JSON.parse(saved) : []
  })

  // State for editing a thought
  const [editingId, setEditingId] = useState(null)
  const [editMessage, setEditMessage] = useState("")

  // Sort, filter & pagination state
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [minHearts, setMinHearts] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showLiked, setShowLiked] = useState(false)

  // Auth state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token') || null
  })
  const [authLoading, setAuthLoading] = useState(false)

  // Helper: get auth headers
  const getAuthHeaders = () => {
    const headers = { 'Content-Type': 'application/json' }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }

  // Fetch thoughts from API (with sort, filter, pagination)
  const fetchThoughts = async (page = currentPage) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        sort: sortBy,
        order: sortOrder,
        page: page.toString(),
        limit: "20"
      })
      if (minHearts) params.set("minHearts", minHearts)

      const response = await fetch(`${API_URL}/thoughts?${params}`)
      const data = await response.json()
      
      if (response.ok) {
        setThoughts(data.thoughts)
        setTotalPages(data.pagination.totalPages)
        setCurrentPage(data.pagination.page)
      } else {
        console.error("Error fetching thoughts:", data.error)
      }
    } catch (error) {
      console.error("Error fetching thoughts:", error)
    }
    setLoading(false)
  }

  // Fetch on mount and when sort/filter changes
  useEffect(() => {
    fetchThoughts(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, sortOrder, minHearts])

  // =============================================
  // AUTH HANDLERS
  // =============================================

  const handleSignup = async (username, email, password) => {
    setAuthLoading(true)
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })
      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        return {} // success
      } else {
        return { error: data.error, errors: data.errors }
      }
    } catch {
      return { error: 'Network error. Please try again.' }
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogin = async (email, password) => {
    setAuthLoading(true)
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        return {} // success
      } else {
        return { error: data.error }
      }
    } catch {
      return { error: 'Network error. Please try again.' }
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  // =============================================
  // THOUGHT HANDLERS
  // =============================================

  // Function to add a new thought (POST to API)
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    
    if (!newMessage.trim()) return
    if (newMessage.length < MIN_LENGTH || newMessage.length > MAX_LENGTH) return
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${API_URL}/thoughts`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ message: newMessage })
      })
      const data = await response.json()
      
      if (response.ok) {
        setThoughts(prevThoughts => [data, ...prevThoughts])
        setNewMessage("")
      } else {
        console.error("Error posting thought:", data.error)
      }
    } catch (error) {
      console.error("Error posting thought:", error)
    }
    
    setIsSubmitting(false)
  }

  // Function to like a thought (POST to API)
  const handleLikeThought = async (thoughtId) => {
    // Check if already liked (prevent duplicate likes)
    if (likedThoughts.includes(thoughtId)) {
      return // Already liked, don't allow liking again
    }
    
    try {
      const response = await fetch(`${API_URL}/thoughts/${thoughtId}/like`, {
        method: 'POST'
      })
      const data = await response.json()
      
      if (response.ok) {
        // Update state with new hearts count from API
        setThoughts(prevThoughts =>
          prevThoughts.map(t =>
            t._id === thoughtId
              ? { ...t, hearts: data.hearts }
              : t
          )
        )
        
        // Save to localStorage
        const updatedLikes = [...likedThoughts, thoughtId]
        setLikedThoughts(updatedLikes)
        localStorage.setItem('likedThoughts', JSON.stringify(updatedLikes))
      } else {
        console.error("Error liking thought:", data.error)
      }
    } catch (error) {
      console.error("Error liking thought:", error)
    }
  }

  // Function to start editing a thought
  const handleStartEdit = (thoughtId, currentMessage) => {
    setEditingId(thoughtId)
    setEditMessage(currentMessage)
  }

  // Function to cancel editing
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditMessage("")
  }

  // Function to save edited thought (PUT to API - requires auth)
  const handleSaveEdit = async (thoughtId) => {
    if (!editMessage.trim()) return
    if (editMessage.length < MIN_LENGTH || editMessage.length > MAX_LENGTH) return

    try {
      const response = await fetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ message: editMessage })
      })
      const data = await response.json()

      if (response.ok) {
        setThoughts(prevThoughts =>
          prevThoughts.map(t =>
            t._id === thoughtId
              ? { ...t, message: data.message }
              : t
          )
        )
        setEditingId(null)
        setEditMessage("")
      } else {
        console.error("Error updating thought:", data.error)
      }
    } catch (error) {
      console.error("Error updating thought:", error)
    }
  }

  // Function to delete a thought (DELETE from API - requires auth)
  const handleDeleteThought = async (thoughtId) => {
    if (!window.confirm("Are you sure you want to delete this thought?")) return

    try {
      const response = await fetch(`${API_URL}/thoughts/${thoughtId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      })

      if (response.ok) {
        setThoughts(prevThoughts =>
          prevThoughts.filter(t => t._id !== thoughtId)
        )
      } else {
        const data = await response.json()
        console.error("Error deleting thought:", data.error)
      }
    } catch (error) {
      console.error("Error deleting thought:", error)
    }
  }

  return (
    <MainWrapper>
      <Container>
        <Title>Happy Thoughts</Title>

        {/* Auth section */}
        {user ? (
          <UserBar>
            <UserInfo> Logged in as <strong>{user.username}</strong></UserInfo>
            <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
          </UserBar>
        ) : (
          <AuthForm
            onLogin={handleLogin}
            onSignup={handleSignup}
            isLoading={authLoading}
          />
        )}

        <ThoughtForm 
          onSubmit={handleFormSubmit}
          message={newMessage}
          onMessageChange={setNewMessage}
          isSubmitting={isSubmitting}
        />

        {/* Sort, filter & view controls */}
        <ControlsBar>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Sort by Date</option>
            <option value="hearts">Sort by Hearts</option>
          </Select>
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="desc">Newest / Most</option>
            <option value="asc">Oldest / Least</option>
          </Select>
          <Select value={minHearts} onChange={(e) => setMinHearts(e.target.value)}>
            <option value="">All hearts</option>
            <option value="1">1+ hearts</option>
            <option value="5">5+ hearts</option>
            <option value="10">10+ hearts</option>
          </Select>
          {likedThoughts.length > 0 && (
            <FilterButton
              $active={showLiked}
              onClick={() => setShowLiked(!showLiked)}
            >
              {showLiked ? 'Show All' : `My Likes (${likedThoughts.length})`}
            </FilterButton>
          )}
        </ControlsBar>

        {loading ? (
          <LoadingText>Loading thoughts...</LoadingText>
        ) : (
          <>
            <ThoughtList 
              thoughts={showLiked 
                ? thoughts.filter(t => likedThoughts.includes(t._id)) 
                : thoughts
              } 
              onLike={handleLikeThought} 
              likedThoughts={likedThoughts}
              onStartEdit={handleStartEdit}
              onCancelEdit={handleCancelEdit}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDeleteThought}
              editingId={editingId}
              editMessage={editMessage}
              onEditMessageChange={setEditMessage}
              currentUser={user}
            />
            {!showLiked && totalPages > 1 && (
              <PaginationBar>
                <PageButton 
                  disabled={currentPage <= 1}
                  onClick={() => fetchThoughts(currentPage - 1)}
                >
                  ← Prev
                </PageButton>
                <PageInfo>Page {currentPage} of {totalPages}</PageInfo>
                <PageButton 
                  disabled={currentPage >= totalPages}
                  onClick={() => fetchThoughts(currentPage + 1)}
                >
                  Next →
                </PageButton>
              </PaginationBar>
            )}
          </>
        )}
      </Container>
    </MainWrapper>
  )
}
