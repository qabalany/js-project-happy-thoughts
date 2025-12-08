import styled from 'styled-components'

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
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #ffadad;
  }
`

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  margin-top: 16px;
  padding: 14px 24px;
  background-color: #ffadad;
  color: #222;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #ff8585;
  }
`

export const ThoughtForm = () => {
  return (
    <FormCard>
      <FormLabel htmlFor="thought-input">
        What's making you happy right now?
      </FormLabel>
      <FormTextarea
        id="thought-input"
        placeholder="Type your happy thought..."
        rows={4}
      />
      <SubmitButton type="submit">
        ❤️ Send Happy Thought ❤️
      </SubmitButton>
    </FormCard>
  )
}
