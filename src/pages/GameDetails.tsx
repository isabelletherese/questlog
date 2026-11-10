import { useParams } from 'react-router'
import { useGame } from '../hooks/useGames'
import { statusLabels } from '../types/status'

const GameDetails = () => {
  const { id } = useParams()
  const { isLoading, error, game } = useGame(id)

  return (
    <div className="mx-auto max-w-5xl p-6">
      {isLoading && <p className="text-gray-400">Loading game details...</p>}
      {error && (
        <p className="text-error">Could not load game details: {error}</p>
      )}

      {game && (
        <article className="grid gap-8 rounded-xl border border-gray-800 bg-gray-900 p-6 md:grid-cols-[320px_1fr] md:p-10">
          {game.coverUrl && (
            <img
              className="w-full rounded-lg object-cover shadow-lg"
              src={game.coverUrl}
              alt={`${game.title} cover`}
            />
          )}

          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm text-accent">
              {statusLabels[game.status]}
            </span>
            {game.rating !== undefined && (
              <p className="text-xl">Rating: {game.rating}/5</p>
            )}
            {game.notes && (
              <p className="mt-4 text-gray-300 italic">{game.notes}</p>
            )}
          </div>
        </article>
      )}
    </div>
  )
}

export default GameDetails
