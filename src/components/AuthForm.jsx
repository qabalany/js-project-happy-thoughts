import { useState } from 'react'
import styled from 'styled-components'

const AuthCard = styled.div`
  background-color: #f0f0f0;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 4px 4px 0px #000;
  border: 2px solid #000;
`

const AuthTitle = styled.h2`
  font-size: 1.3rem;
  color: #222;
  margin-bottom: 16px;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
`

const Input = styled.input`
  padding: 10px 12px;
  font-size: 1rem;
  border: 2px solid ${props => props.$hasError ? '#e74c3c' : '#ccc'};
  border-radius: 4px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#e74c3c' : '#ffadad'};
  }
`

const FieldError = styled.span`
  font-size: 0.8rem;
  color: #e74c3c;
`

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 12px 24px;
  background-color: ${props => props.disabled ? '#ccc' : '#ffadad'};
  color: ${props => props.disabled ? '#888' : '#222'};
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 40px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #ff8585;
  }
`

const ToggleText = styled.p`
  text-align: center;
  margin-top: 12px;
  font-size: 0.9rem;
  color: #666;
`

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
  padding: 0;
  margin-left: 4px;

  &:hover {
    color: #1565c0;
  }
`

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
`

export const AuthForm = ({ onLogin, onSignup, isLoading }) => {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setFieldErrors({})

    if (isLoginMode) {
      const result = await onLogin(email, password)
      if (result?.error) {
        setError(result.error)
      }
      if (result?.errors) {
        setFieldErrors(result.errors)
      }
    } else {
      if (!username.trim()) {
        setFieldErrors({ username: 'Username is required' })
        return
      }
      const result = await onSignup(username, email, password)
      if (result?.error) {
        setError(result.error)
      }
      if (result?.errors) {
        setFieldErrors(result.errors)
      }
    }
  }

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    setError('')
    setFieldErrors({})
  }

  return (
    <AuthCard>
      <AuthTitle>{isLoginMode ? '🔑 Log In' : '📝 Sign Up'}</AuthTitle>
      <Form onSubmit={handleSubmit}>
        {!isLoginMode && (
          <InputGroup>
            <Label htmlFor="auth-username">Username</Label>
            <Input
              id="auth-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              $hasError={!!fieldErrors.username}
              autoComplete="username"
            />
            {fieldErrors.username && <FieldError>{fieldErrors.username}</FieldError>}
          </InputGroup>
        )}

        <InputGroup>
          <Label htmlFor="auth-email">Email</Label>
          <Input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            $hasError={!!fieldErrors.email}
            autoComplete="email"
          />
          {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="auth-password">Password</Label>
          <Input
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            $hasError={!!fieldErrors.password}
            autoComplete={isLoginMode ? "current-password" : "new-password"}
          />
          {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading 
            ? 'Please wait...' 
            : isLoginMode 
              ? '🔑 Log In' 
              : '📝 Create Account'
          }
        </SubmitButton>
      </Form>

      <ToggleText>
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}
        <ToggleButton type="button" onClick={toggleMode}>
          {isLoginMode ? 'Sign Up' : 'Log In'}
        </ToggleButton>
      </ToggleText>
    </AuthCard>
  )
}
