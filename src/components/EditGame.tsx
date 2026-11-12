import { X } from 'lucide-react'
import type { Game, GameInput } from '../types/game'
import { useSaveGame } from '../hooks/useGames'
import GameForm from './GameForm'

type EditGameProps = {
  game: Game
  onClose: () => void
  onSaved: (game: Game) => void
}

const EditGame = ({ game, onClose, onSaved }: EditGameProps) => {
  const { isSaving, error, updateGame } = useSaveGame()

  const handleSubmit = async (input: GameInput) => {
    const updated = await updateGame(game.id, input)

    if (updated) {
      onSaved(updated)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-text-primary/10 bg-surface p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Edit game</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-text-secondary hover:text-accent cursor-pointer">
            <X size={24} />
          </button>
        </div>

        <GameForm
          initialInputs={game}
          onSubmit={handleSubmit}
          isSaving={isSaving}
          error={error}
          submitLabel="Save changes"
        />
      </div>
    </div>
  )
}

export default EditGame
