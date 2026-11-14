import type { Game } from '../types/game'
import { statusLabels } from '../types/status'
import { Link } from 'react-router'

type GameCardProps = {
  game: Game
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link
      to={`/games/${game.id}`}
      className="group block overflow-hidden rounded-xl border border-text-primary/10 bg-surface hover:border-accent">
      {game.coverUrl ? (
        <img
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={game.coverUrl}
          alt={`${game.title} cover`}
          loading="lazy"
        />
      ) : (
        <div className="flex h-64 items-center justify-center bg-surface-hover text-text-muted">
          No cover
        </div>
      )}

      <div className="p-4">
        <h2 className="line-clamp-2 min-h-14 text-lg font-semibold transition-colors group-hover:text-accent">
          {game.title}
        </h2>
        <p className="text-sm text-text-secondary">{game.platform}</p>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="w-fit rounded-full border border-accent/30 bg-accent/10 px-2 py-1 text-sm text-accent">
            {statusLabels[game.status]}
          </span>
          {game.rating ? (
            <span className="text-accent">★ {game.rating}/5</span>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default GameCard
