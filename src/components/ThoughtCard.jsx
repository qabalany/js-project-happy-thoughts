import styled from 'styled-components'

const Card = styled.article`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 4px 4px 0px #000;
  border: 2px solid #000;
`

const AuthorName = styled.span`
  font-size: 0.8rem;
  color: #1976d2;
  font-weight: 500;
  display: block;
  margin-bottom: 6px;
`

const Message = styled.p`
  font-size: 1.1rem;
  color: #222;
  line-height: 1.5;
  margin: 0 0 16px 0;
  word-wrap: break-word;
`

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #ffadad;
  border-radius: 4px;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: #ff8585;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const HeartButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.$isLiked ? '#ffadad' : '#eee'};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: #ffadad;
    transform: scale(1.1);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
  
  &:focus {
    outline: 3px solid #ff8585;
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

const LikeCount = styled.span`
  font-size: 0.9rem;
  color: #666;
`

const TimeStamp = styled.span`
  font-size: 0.85rem;
  color: #999;
`

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`

const ActionButton = styled.button`
  padding: 6px 12px;
  font-size: 0.85rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: 3px solid #ff8585;
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`

const EditButton = styled(ActionButton)`
  background-color: #e3f2fd;
  color: #1976d2;

  &:hover {
    background-color: #bbdefb;
  }
`

const DeleteButton = styled(ActionButton)`
  background-color: #ffebee;
  color: #d32f2f;

  &:hover {
    background-color: #ffcdd2;
  }
`

const SaveButton = styled(ActionButton)`
  background-color: #e8f5e9;
  color: #388e3c;

  &:hover {
    background-color: #c8e6c9;
  }
`

const CancelButton = styled(ActionButton)`
  background-color: #f5f5f5;
  color: #666;

  &:hover {
    background-color: #e0e0e0;
  }
`

// Helper function to format time
const formatTimeAgo = (dateString) => {
  const now = new Date()
  const date = new Date(dateString)
  const seconds = Math.floor((now - date) / 1000)
  
  if (seconds < 60) return `${seconds} seconds ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minutes ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hours ago`
  const days = Math.floor(hours / 24)
  return `${days} days ago`
}

export const ThoughtCard = ({ 
  id, 
  message, 
  hearts, 
  createdAt, 
  author,
  onLike, 
  isLiked,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
  isEditing,
  editMessage,
  onEditMessageChange,
  currentUser
}) => {
  // Check if the current logged-in user is the author of this thought
  const isOwner = currentUser && author && 
    (author._id === currentUser._id || author === currentUser._id)

  return (
    <Card>
      {isEditing ? (
        <>
          <EditTextarea
            value={editMessage}
            onChange={(e) => onEditMessageChange(e.target.value)}
            placeholder="Edit your thought..."
            aria-label="Edit thought message"
          />
          <ActionButtons>
            <SaveButton onClick={() => onSaveEdit(id)}>
              ✓ Save
            </SaveButton>
            <CancelButton onClick={onCancelEdit}>
              ✕ Cancel
            </CancelButton>
          </ActionButtons>
        </>
      ) : (
        <>
          {author && author.username && (
            <AuthorName>@{author.username}</AuthorName>
          )}
          <Message>{message}</Message>
          <Footer>
            <LikeSection>
              <HeartButton 
                onClick={() => onLike(id)} 
                $isLiked={isLiked}
                disabled={isLiked}
                aria-label={isLiked ? `You liked this thought, total ${hearts} likes` : `Like this thought, currently ${hearts} likes`}
              >
                ❤️
              </HeartButton>
              <LikeCount>x {hearts}</LikeCount>
            </LikeSection>
            <TimeStamp>{formatTimeAgo(createdAt)}</TimeStamp>
          </Footer>
          {isOwner && (
            <ActionButtons>
              <EditButton onClick={() => onStartEdit(id, message)}>
                 Edit
              </EditButton>
              <DeleteButton onClick={() => onDelete(id)}>
                 Delete
              </DeleteButton>
            </ActionButtons>
          )}
        </>
      )}
    </Card>
  )
}
