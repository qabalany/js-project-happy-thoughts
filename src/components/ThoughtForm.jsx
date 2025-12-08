export const ThoughtForm = () => {
  return (
    <form className="thought-form">
      <label htmlFor="thought-input">What's making you happy right now?</label>
      <textarea
        id="thought-input"
        placeholder="Type your happy thought..."
        rows={4}
      />
      <button type="submit">
        ❤️ Send Happy Thought ❤️
      </button>
    </form>
  )
}
