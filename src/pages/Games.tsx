import { useState } from 'react'
import { useGames } from '../hooks/useGames'
import StatusFilter from '../components/StatusFilter'
import type { Status } from '../types/status'
import GameCard from '../components/GameCard'

const Games = () => {
  const [filter, setFilter] = useState<Status | null>(null)
  const { isLoading, error, games } = useGames(filter)

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-semibold text-text-primary">
          My Games
        </h1>
      </div>
      <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:flex-start xl:justify-between ">
        <StatusFilter filter={filter} setSelectedFilter={setFilter} />
      </div>

      {isLoading && (
        <p className="mt-6 text-text-secondary">Loading games...</p>
      )}

      {error && (
        <p className="mt-6 text-error">Could not load games: {error}</p>
      )}

      {!isLoading && !error && games.length === 0 && (
        <p className="mt-6 text-text-secondary">No games here yet.</p>
      )}

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {games.map((game) => (
          <li key={game.id}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Games
