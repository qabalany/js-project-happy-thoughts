export const ThoughtCard = ({ message, hearts, createdAt }) => {
  return (
    <article className="thought-card">
      <p className="thought-message">{message}</p>
      <div className="thought-footer">
        <div className="thought-likes">
          <button className="like-button">❤️</button>
          <span>x {hearts}</span>
        </div>
        <span className="thought-time">{createdAt}</span>
      </div>
    </article>
  )
}
