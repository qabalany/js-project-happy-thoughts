import { ThoughtCard } from './ThoughtCard'

export const ThoughtList = ({ thoughts }) => {
  return (
    <section className="thought-list">
      {thoughts.map(thought => (
        <ThoughtCard
          key={thought._id}
          message={thought.message}
          hearts={thought.hearts}
          createdAt={thought.createdAt}
        />
      ))}
    </section>
  )
}
