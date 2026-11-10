import { useParams } from 'react-router'
import { useGame } from '../hooks/useGames'

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
            <h1 className="text-4xl font-bold">{game.title}</h1>
            <p className="text-lg text-gray-400">{game.platform}</p>
            <p className="w-fit rounded-full bg-gray-800 px-3 py-1 text-sm uppercase tracking-wide">
              {game.status}
            </p>
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
