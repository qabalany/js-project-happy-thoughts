import styled from 'styled-components'
import { ThoughtCard } from './ThoughtCard'

const ListSection = styled.section`
  display: flex;
  flex-direction: column;
`

export const ThoughtList = ({ 
  thoughts, 
  onLike, 
  likedThoughts,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
  editingId,
  editMessage,
  onEditMessageChange,
  currentUser
}) => {
  return (
    <ListSection>
      {thoughts.map(thought => (
        <ThoughtCard
          key={thought._id}
          id={thought._id}
          message={thought.message}
          hearts={thought.hearts}
          createdAt={thought.createdAt}
          author={thought.author}
          onLike={onLike}
          isLiked={likedThoughts.includes(thought._id)}
          onStartEdit={onStartEdit}
          onCancelEdit={onCancelEdit}
          onSaveEdit={onSaveEdit}
          onDelete={onDelete}
          isEditing={editingId === thought._id}
          editMessage={editMessage}
          onEditMessageChange={onEditMessageChange}
          currentUser={currentUser}
        />
      ))}
    </ListSection>
  )
}
