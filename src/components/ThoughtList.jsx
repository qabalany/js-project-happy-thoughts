import styled from 'styled-components'
import { ThoughtCard } from './ThoughtCard'

const ListSection = styled.section`
  display: flex;
  flex-direction: column;
`

export const ThoughtList = ({ thoughts, onLike }) => {
  return (
    <ListSection>
      {thoughts.map(thought => (
        <ThoughtCard
          key={thought._id}
          id={thought._id}
          message={thought.message}
          hearts={thought.hearts}
          createdAt={thought.createdAt}
          onLike={onLike}
        />
      ))}
    </ListSection>
  )
}
