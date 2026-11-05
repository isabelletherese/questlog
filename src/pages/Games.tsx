import { useState } from 'react'
import { useGames } from '../hooks/useGames'
import StatusFilter from '../components/StatusFilter'
import type { Status } from '../types/status'

const Games = () => {
  const [filter, setFilter] = useState<Status | null>(null)
  const { isLoading, error, games } = useGames(filter)

  return (
    <div>
      <h1>Welcome to the Games Page</h1>
      {isLoading && <p>Loading games...</p>}
      {error && <p className="error">Could not load games: {error}</p>}

      <StatusFilter filter={filter} setSelectedFilter={setFilter} />

      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.title}
            {game.platform}
            {game.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Games
