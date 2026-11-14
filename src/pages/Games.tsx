import { useGames } from '../hooks/useGames'
import StatusFilter from '../components/StatusFilter'
import GameCard from '../components/GameCard'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Status } from '../types/status'
import { useState } from 'react'

const Games = () => {
  const [filter, setFilter] = useLocalStorage<Status | null>('gameFilter', null)
  const { isLoading, error, games } = useGames(filter)
  const [search, setSearch] = useState('')
  const { isLoading: isLoadingAll, games: allGames } = useGames(null)

  const visibleGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(search.toLowerCase()) ||
      game.platform.toLowerCase().includes(search.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-semibold text-text-primary">
          My Games
        </h1>
      </div>
      <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between ">
        <StatusFilter filter={filter} setSelectedFilter={setFilter} />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search games or console..."
          className="w-full rounded-lg border border-text-primary/10 bg-surface px-4 py-2 text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none xl:w-72 xl:shrink-0"
        />
      </div>
      {!isLoading && !isLoadingAll && (
        <p className="text-sm text-text-secondary mb-3">
          Showing {visibleGames.length} of {allGames.length} games
        </p>
      )}
      {isLoading && (
        <p className="mt-6 text-text-secondary">Loading games...</p>
      )}

      {error && (
        <p className="mt-6 text-error">Could not load games: {error}</p>
      )}

      {!isLoading && !isLoadingAll && !error && allGames.length === 0 && (
        <p className="mt-6 text-text-secondary">
          You have no games yet. Add your first game from the menu.
        </p>
      )}

      {!isLoading &&
        !isLoadingAll &&
        !error &&
        allGames.length > 0 &&
        visibleGames.length === 0 && (
          <p className="mt-6 text-text-secondary">No games found.</p>
        )}

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleGames.map((game) => (
          <li key={game.id}>
            <GameCard game={game} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Games
