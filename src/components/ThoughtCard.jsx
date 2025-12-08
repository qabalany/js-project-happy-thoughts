import styled from 'styled-components'

const Card = styled.article`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 4px 4px 0px #000;
  border: 2px solid #000;
`

const Message = styled.p`
  font-size: 1.1rem;
  color: #222;
  line-height: 1.5;
  margin: 0 0 16px 0;
  word-wrap: break-word;
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
  background-color: #eee;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #ffadad;
    transform: scale(1.1);
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

export const ThoughtCard = ({ message, hearts, createdAt }) => {
  return (
    <Card>
      <Message>{message}</Message>
      <Footer>
        <LikeSection>
          <HeartButton>❤️</HeartButton>
          <LikeCount>x {hearts}</LikeCount>
        </LikeSection>
        <TimeStamp>{createdAt}</TimeStamp>
      </Footer>
    </Card>
  )
}
