import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useGame, useSaveGame } from '../hooks/useGames'
import { statusLabels } from '../types/status'
import EditGame from '../components/EditGame'

const GameDetails = () => {
  const { id } = useParams()
  const { isLoading, error, game, setGame } = useGame(id)
  const { isSaving, error: saveError, deleteGame } = useSaveGame()
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

  const buttonStyle = 'rounded-lg border px-4 py-2 cursor-pointer'

  return (
    <div className="mx-auto max-w-5xl">
      {isLoading && <p className="text-text-muted">Loading game details...</p>}
      {error && (
        <p className="text-error">Could not load game details: {error}</p>
      )}

      {game && (
        <article className="flex flex-col gap-8 rounded-2xl border border-text-primary/10 bg-surface/90 p-6 shadow-lg shadow-black/20 md:flex-row md:p-10">
          {game.coverUrl && (
            <img
              className="w-full rounded-xl object-cover shadow-lg shadow-black/30 md:w-80 md:shrink-0"
              src={game.coverUrl}
              alt={`${game.title} cover`}
            />
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <h1 className="text-4xl font-semibold text-text-primary">
              {game.title}
            </h1>
            <p className="text-lg text-text-secondary">{game.platform}</p>

            <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm text-accent">
              {statusLabels[game.status]}
            </span>

            {game.rating ? (
              <p className="text-xl font-medium text-accent">
                ★ {game.rating}/5
              </p>
            ) : null}

            {game.notes && (
              <p className="mt-4 border-l-2 border-accent/40 pl-4 text-text-secondary italic">
                {game.notes}
              </p>
            )}

            <div className="mt-auto flex w-full items-center gap-3 pt-6">
              <button
                onClick={() => setIsEditing(true)}
                className={`${buttonStyle} bg-accent font-semibold text-sidebar hover:brightness-110`}>
                Edit
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Delete "${game.title}"?`)) {
                    deleteGame(game.id)
                  }
                }}
                disabled={isSaving}
                className={`${buttonStyle} border-error/40  text-error hover:bg-error/10 disabled:opacity-50`}>
                Delete
              </button>
              <button
                onClick={() => navigate('/games')}
                className={`${buttonStyle} border-text-primary/20 text-text-primary hover:bg-surface-hover ml-auto`}>
                Back
              </button>
            </div>

            {saveError && (
              <p className="text-error">Could not delete game: {saveError}</p>
            )}
          </div>
        </article>
      )}

      {game && isEditing && (
        <EditGame
          game={game}
          onClose={() => setIsEditing(false)}
          onSaved={(updated) => {
            setGame(updated)
            setIsEditing(false)
          }}
        />
      )}
    </div>
  )
}

export default GameDetails
