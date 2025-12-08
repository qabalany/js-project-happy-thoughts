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

export const App = () => {
  return (
    <main className="app-container">
      <h1>Happy Thoughts</h1>
      <ThoughtForm />
      <ThoughtList thoughts={dummyThoughts} />
    </main>
  )
}
