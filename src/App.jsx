import styled from 'styled-components'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'

// Dummy data للتجربة - سيتم استبدالها بـ API لاحقاً
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
  return (
    <MainWrapper>
      <Container>
        <Title>Happy Thoughts</Title>
        <ThoughtForm />
        <ThoughtList thoughts={dummyThoughts} />
      </Container>
    </MainWrapper>
  )
}
