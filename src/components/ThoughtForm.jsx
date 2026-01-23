import styled from 'styled-components'

// Character limit constants
const MIN_LENGTH = 5
const MAX_LENGTH = 140
const WARNING_THRESHOLD = 120

const FormCard = styled.form`
  background-color: #f0f0f0;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 4px 4px 0px #000;
  border: 2px solid #000;
`

const FormLabel = styled.label`
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  color: #222;
  margin-bottom: 12px;
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 2px solid ${props => props.$hasError ? '#e74c3c' : '#ccc'};
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#e74c3c' : '#ffadad'};
  }
`

const CharacterCount = styled.p`
  text-align: right;
  font-size: 0.85rem;
  margin: 8px 0 0 0;
  color: ${props => {
    if (props.$count < MIN_LENGTH) return '#e74c3c'
    if (props.$count > MAX_LENGTH) return '#e74c3c'
    if (props.$count > WARNING_THRESHOLD) return '#f39c12'
    return '#666'
  }};
`

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 16px;
  padding: 14px 24px;
  background-color: ${props => props.disabled ? '#ccc' : '#ffadad'};
  color: ${props => props.disabled ? '#888' : '#222'};
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 40px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: #ff8585;
  }
  
  &:focus {
    outline: 3px solid #ff8585;
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
`

export const ThoughtForm = ({ onSubmit, message, onMessageChange, isSubmitting }) => {
  const charCount = message.length
  const isValidLength = charCount >= MIN_LENGTH && charCount <= MAX_LENGTH
  const hasError = charCount > 0 && !isValidLength
  
  return (
    <FormCard onSubmit={onSubmit}>
      <FormLabel htmlFor="thought-input">
        What's making you happy right now?
      </FormLabel>
      <FormTextarea
        id="thought-input"
        placeholder="Type your happy thought..."
        rows={4}
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        $hasError={hasError}
      />
      <CharacterCount $count={charCount} aria-live="polite">
        {charCount}/{MAX_LENGTH} 
        {charCount < MIN_LENGTH && charCount > 0 && ` (min ${MIN_LENGTH} characters)`}
        {charCount > MAX_LENGTH && ` (${charCount - MAX_LENGTH} characters over limit)`}
      </CharacterCount>
      <SubmitButton type="submit" disabled={!isValidLength || isSubmitting}>
        {isSubmitting ? 'Sending...' : '❤️ Send Happy Thought ❤️'}
      </SubmitButton>
    </FormCard>
  )
}
